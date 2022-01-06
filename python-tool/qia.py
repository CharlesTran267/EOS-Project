import os, cv2
import pandas as pd, seaborn as sns
from operator import itemgetter
from scipy import stats
from flask import Flask, request, render_template
import json;

from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import confusion_matrix

from skimage import measure
from skimage.morphology import convex_hull_image
from skimage.measure import label, regionprops, regionprops_table
from skimage.feature import greycomatrix, greycoprops
from skimage.draw import rectangle,polygon,ellipse_perimeter
from skimage.color import rgb2gray
from skimage.util import img_as_ubyte
from skimage import img_as_float

from helper import *


# os.chdir('/Users/vinhkhaitruong/Desktop/EOS Project /back-end/uploads')

def shape(alpha_ch):
    
    # find contour and image moments
    alpha_ch = cv2.cvtColor(alpha_ch, cv2.COLOR_BGR2GRAY)
    ret,thr = cv2.threshold(alpha_ch, 120, 255, cv2.THRESH_BINARY)
    
    cnts, hier= cv2.findContours(thr, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    # print('Detected contours:' + {len(cnts)})
    contour = cnts[0]
    M = cv2.moments(contour)

    # skimage function to select a roi
    label_image = label(alpha_ch)
    regions = regionprops(label_image)
    # print(f'Detected regions: {len(regions)}')
    area = [ele.area for ele in regions] 
    largest_region_idx = np.argmax(area)
    props = regions[largest_region_idx]
    
    # particle descriptives
    y_centroid, x_centroid = props.centroid
    min_row, min_col, max_row, max_col = props.bbox    
    w = max_col - min_col # width
    l = max_row - min_row # length
    part_perim = props.perimeter    
    area = props.area

    # calculate hull
    hull = convex_hull_image(alpha_ch)
    hull_perim = measure.perimeter(hull)
    hull_diff = img_as_float(hull.copy())
    hull_diff[alpha_ch] = 2 # color intersection in gray

    # measure properties
    eccentricity_moments = eccentricity_from_moments(M)
    eccentricity_ellipse = eccentricity_from_ellipse(contour)
    eccentricity = props.eccentricity
    aspect_rat = aspect_ratio(contour)
    solidity = props.solidity
    convexity = hull_perim / part_perim
    circularity_dellino = part_perim/(2*math.sqrt(math.pi*area))
    rectangularity = part_perim / (2*l + 2*w)
    compactness = area / (l * w)
    elongation = (props.feret_diameter_max ** 2) / area
    roundness = 4*area / (math.pi * (props.feret_diameter_max ** 2))

    # important factors
    circ_rect = circularity_dellino * rectangularity
    comp_elon = compactness * elongation
    circ_elon = circularity_dellino * elongation
    rect_comp = rectangularity * compactness

    shape_dict = {'convexity':convexity,'rectangularity':rectangularity, 'elongation':elongation, 'roundness':roundness, 'circularity':circularity_dellino, 'eccentricity_moments':eccentricity_moments,'eccentricity_ellipse':eccentricity_ellipse,'solidity':solidity, 'aspect_rat':aspect_rat, 'compactness':compactness, 'circ_rect':circ_rect, 'comp_elon':comp_elon, 'circ_elon':circ_elon, 'rect_comp':rect_comp}

    return shape_dict

def texture(image):

    gray = rgb2gray(image)
    image = img_as_ubyte(gray)
    
    bins = np.array([0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 255]) #16-bit
    inds = np.digitize(image, bins)
    
    max_value = inds.max()+1
    matrix_coocurrence = greycomatrix(inds, [1], [0, np.pi/4, np.pi/2, 3*np.pi/4], levels=max_value, normed=False, symmetric=False)

    # GLCM properties
    contrast = greycoprops(matrix_coocurrence, 'contrast')
    contrast_mean = contrast.mean()
    
    dissimilarity = greycoprops(matrix_coocurrence, 'dissimilarity')    
    dissimilarity_mean = dissimilarity.mean()
    
    homogeneity = greycoprops(matrix_coocurrence, 'homogeneity')
    homogeneity_mean = homogeneity.mean()
    
    energy = greycoprops(matrix_coocurrence, 'energy')
    energy_mean = energy.mean()
    
    correlation = greycoprops(matrix_coocurrence, 'correlation')
    correlation_mean = correlation.mean()
    
    asm = greycoprops(matrix_coocurrence, 'ASM')
    asm_mean = asm.mean()

    texture_dict = {'contrast':contrast_mean,'dissimilarity':dissimilarity_mean,'homogeneity':homogeneity_mean,'energy':energy_mean,'correlation':correlation_mean,'asm':asm_mean}

    return texture_dict

def color(image):

    color_dict = {}

    for i, c in enumerate(['blue','green','red']):
        channel = image[...,i]
        values = channel[channel>0]
        color_dict[c + '_mean'] = values.mean() 
        color_dict[c +'_std'] = values.std()
        color_dict[c +'_mode'] = int(stats.mode(values)[0])
        
    return color_dict


def main(filenames):  
    '''Returns shape, color and texture for a normalized image collection'''
    qia_dict = {}

    for idx, filename in enumerate(filenames):
        # eg filename is ./KE-DB1_3_b_phi2phi3_8x_02_39_blackbackground.jpg

        rgb_image = cv2.imread(filename)
        name = '_'.join(filename.split('_')[:-1]) # 'KE-DB1_3_b_phi2phi3_8x_02_39'

        alpha_ch = cv2.imread(filename, cv2.IMREAD_UNCHANGED)
        alpha_ch = alpha_ch[:,:,-1]
        dict1 = shape(rgb_image)
        dict2 = texture(rgb_image)
        dict3 = color(rgb_image)
        try:        
            dict1 = shape(rgb_image)
            dict2 = texture(rgb_image)
            dict3 = color(rgb_image)

        except:
            pass

        qia_dict[name] = {"" : name,**dict1,**dict2, **dict3}
        df = pd.DataFrame.from_dict(qia_dict, orient='index')
        df.to_csv('test.csv')

        with open("sample.json","w") as outfile:
            json.dump(qia_dict,outfile)

    return qia_dict

# filenames = [file for file in os.listdir() if file.endswith('.png')]
# filenames = []


app = Flask(__name__)



# @app.route('/api/upload', methods= ['GET'])
# def getImage(): 
#      files = request.files
#      file = files.get('file')
#      return {file}



@app.route('/api', methods= ['GET'])
def index():

    
    # if request.method == "POST":
    #     print("POST");
    #     # print("get_json: ", request.get_json());
    #     # # print "get_json: ", request.get_json(force = True);
    #     # print("data: ", request.data);
    #     return 'POST';
    # else:
    os.chdir('C:/Users/User/Desktop/EOS Project/back-end/uploads')
    filenames = [file for file in os.listdir() if file.endswith('.png')]
    # latest_file = max(filenames, key=os.path.getctime)
    threshold = 0.900
    files =  sorted(filenames, key=os.path.getctime,reverse=True)
    filtered = list(filter(lambda x: os.path.getctime(filenames[0]) - os.path.getctime(x) <= threshold, files))
        # for f in filenames[:]:
        #      tCreate = os.path.getctime(f)
        #      if tCreate == t :
        #         files.append(f)
    return main(filtered)


# @app.route("/add", methods=["POST"], strict_slashes=False)
# def n():
#     return {"test":"sucess"}


if __name__ == '__main__':
    app.run(host="localhost", port=5005)
