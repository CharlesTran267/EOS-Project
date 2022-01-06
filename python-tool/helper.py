#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Feb 19 15:00:00 2021

@author: dbenet
"""
import os
import math 
import re, cv2, glob, shutil, math
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats
from sklearn.preprocessing import MinMaxScaler
from operator import itemgetter
from sklearn.metrics import confusion_matrix
from skimage import measure
from skimage.morphology import convex_hull_image
from skimage.measure import label, regionprops, regionprops_table
import pandas as pd
import seaborn as sns
from skimage.feature import greycomatrix, greycoprops
from skimage.draw import rectangle,polygon,ellipse_perimeter
from skimage import img_as_float
from skimage import img_as_ubyte
from skimage import color


#%%
def sorted_alphanumeric(data):
    '''Natural sorting using re'''
    convert = lambda text: int(text) if text.isdigit() else text.lower()
    alphanum_key = lambda key: [ convert(c) for c in re.split('([0-9]+)', key) ] 

    return sorted(data, key=alphanum_key)

def scale_df(df):
    scaler = MinMaxScaler()
    df[df.columns] = scaler.fit_transform(df[df.columns])
    return df


def read_transparent_png(filename):
    image_4channel = cv2.imread(filename, cv2.IMREAD_UNCHANGED)
    alpha_channel = image_4channel[:,:,3]
    rgb_channels = image_4channel[:,:,:3]

    # White Background Image
    white_background_image = np.ones_like(rgb_channels, dtype=np.uint8) * 255

    # Alpha factor
    alpha_factor = alpha_channel[:,:,np.newaxis].astype(np.float32) / 255.0
    alpha_factor = np.concatenate((alpha_factor,alpha_factor,alpha_factor), axis=2)

    # Transparent Image Rendered on White Background
    base = rgb_channels.astype(np.float32) * alpha_factor
    white = white_background_image.astype(np.float32) * (1 - alpha_factor)
    final_image = base + white
    
    return final_image.astype(np.uint8), alpha_channel

path = os.getcwd()

#%% Plots
# 3D plot
from mpl_toolkits.mplot3d import Axes3D

def plot_3d_plt (df, red_col, green_col, blue_col, y_col):
    plt.style.use('dark_background')
    colors = ['orange','lightblue','darkblue','red','grey','purple','darkgreen']
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    
    for idx, class_part in enumerate(df[y_col].unique()):
        
        df2 = df[df[y_col] == class_part]
        ax.scatter(df2[red_col], df2[green_col],df2[blue_col], marker='o', s=20, c = colors[idx], alpha = 0.5, label = class_part)
    
    ax.legend(fontsize = 8)
    ax.set_xlabel('Red channel')
    ax.set_ylabel('Green channel')
    ax.set_zlabel('Blue channel')
    
    ax.legend(loc = (0.1, 0.6), fontsize = 8)
    fig.set_facecolor('black')
    ax.set_facecolor('black') 
    
    plt.tight_layout()
    plt.savefig('./figures/3d_scatter.png', dpi=600)
  
# Model metrics
def plot_cm(y_true, y_pred, figsize=(14, 11), colour_by_perc=False):
    cm = confusion_matrix(y_true, y_pred, labels=np.unique(y_true))
    cm_sum = np.sum(cm, axis=1, keepdims=True)
    cm_perc = cm / cm_sum.astype(float) * 100
    annot = np.empty_like(cm).astype(str)
    nrows, ncols = cm.shape
    for i in range(nrows):
        for j in range(ncols):
            c = cm[i, j]
            p = cm_perc[i, j]
            if i == j:
                s = cm_sum[i]
                annot[i, j] = '%.1f%%\n%d/%d' % (p, c, s)
            elif c == 0:
                annot[i, j] = ''
            else:
                annot[i, j] = '%.1f%%\n%d' % (p, c)
    if colour_by_perc:
        cm = pd.DataFrame(cm_perc, index=np.unique(y_true), columns=np.unique(y_true))
    else:
        cm = pd.DataFrame(cm, index=np.unique(y_true), columns=np.unique(y_true))
    cm.index.name = 'Actual'
    cm.columns.name = 'Predicted'
    fig, ax = plt.subplots(figsize=figsize)
    sns.heatmap(cm, cmap='plasma', annot=annot, fmt='', ax=ax, square=True)
    plt.xticks(rotation=45)
    plt.title('Confusion Matrix')
    plt.tight_layout()
    

#%% Small piece of code to match labeled images (filenames_img) with the png images and send to dst folder,
#   while keeping the label

def match_and_send_files(folder_img = '/input/images/*/*', folder_png = '/preprocessed2/*'):
    filenames_img = glob.glob(path + folder_img)
    filenames_png = glob.glob(path + folder_png)
    
# Example of dir route
#/Users/dbenet/Desktop/PhD/Chapter2_automatic_class/capytol2/deepL/input/images/altered_material/altered_material_a_30_2_NJDm_350.png
    
    for png_file in filenames_png:
        png_ref = png_file.split('/')[-1].split('.')[0].split('_')
        png_ref = list(itemgetter(0,1,2,4)(png_ref))
        for file_img in filenames_img:
            ref_img_dir = file_img.split('/') # keep this for dstdir
            img_ref = ref_img_dir[-1].split('.')[0].split('_')
            img_ref = list(itemgetter(1,2,3,5)(img_ref))
            if img_ref == png_ref:
                dst_dir = (path + '/input/images2/' + ref_img_dir[-2] + '/' + ref_img_dir[-1].split('.')[0] + '.png')
                shutil.copy(png_file,dst_dir)
                continue
            
            else:
                continue

        
#%% Helper functions for contour analysis
 
def aspect_ratio(contour):
    """Returns the aspect ratio of the contour based on the dimensions of the bounding rect"""

    x, y, w, h = cv2.boundingRect(contour)
    res = float(w) / h
    return res

def roundness(contour, moments):
    """Calculates the roundness of a contour"""

    length = cv2.arcLength(contour, True)
    k = (length * length) / (moments['m00'] * 4 * np.pi)
    return k


def eccentricity_from_ellipse(contour):
    """Calculates the eccentricity fitting an ellipse from a contour"""
    if len(contour[0]) >= 5:
        (x, y), (MA, ma), angle = cv2.fitEllipse(contour)

        a = ma / 2
        b = MA / 2

        ecc = np.sqrt(a ** 2 - b ** 2) / a
    else:
        ecc =0
    return ecc


def eccentricity_from_moments(moments):
    """Calculates the eccentricity from the moments of the contour"""

    a1 = (moments['mu20'] + moments['mu02']) / 2
    a2 = np.sqrt(4 * moments['mu11'] ** 2 + (moments['mu20'] - moments['mu02']) ** 2) / 2
    if a1+a2 != 0:
        ecc = math.sqrt(abs(1 - (a1 - a2) / (a1 + a2)))
    else:
        ecc =0 
    return ecc

def solidity(cnt):
    """Calculates the solidity of from the contour and hull"""
    
    area = cv2.contourArea(cnt)
    hull = cv2.convexHull(cnt)
    hull_area = cv2.contourArea(hull)
    
    solid = float(area)/hull_area
    return solid, hull


#From Maitre et al. 2019
def degree_of_luminance(red, green, blue):	
    """ Extracts the luminance from images """
    luminance_factor = 0.299*red + 0.587*green + 0.114*blue
    return luminance_factor


#%%

import csv 

def save_dict_to_csv(dict):
    with open('dict.csv', 'w') as csv_file:  
        writer = csv.writer(csv_file)
        for key, value in dict.items():
           writer.writerow([key, value])


# to read it use 
# =============================================================================
# with open('dict.csv') as csv_file:
#     reader = csv.reader(csv_file)
#     mydict = dict(reader)
# =============================================================================

#%%
def shape_analysis (filenames):
    '''Returns shape analysis from binary images (or alpha ch)'''
    measurements = {}
    for idx, filename in enumerate(filenames):
        complete_name = filename.split('/')[-1]
        name = filename.split('/')[-1].split('.')[0].split('_')[1:]
        im_ref = list(itemgetter(0,1,2,4)(name))
        im_ref = str(im_ref[0]) + '_' + str (im_ref[1]) + '_' + str (im_ref[2]) + '_' + str (im_ref[3])
        name = str(name[0]) + '_' + str (name[1]) + '_' + str (name[2]) + '_' + str (name[3]) + '_' + str (name[4])
        particle_label = filename.split('/')[-1].split('_')[0]
        print(f'Processing particle {idx}/{len(filenames)}')
        im_4ch = cv2.imread(filename, cv2.IMREAD_UNCHANGED)
        h, w, _ = im_4ch.shape
        alpha_channel = im_4ch[...,3]
        #im = im_4ch[...,0:3]
        #im_gray = cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
        #im_gray3d = np.tile(im_gray[:, :, None], [1, 1, 3])
        
        contours, hier = cv2.findContours(alpha_channel, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
       
        # 1) Contour analysis
    
        # select larger contour
        cnt = contours[0]
        
        print("Detected contours: {} ".format(len(contours)))
         
        # cv operates with type int32
        #cnt = particle_contour.astype(np.int32)
        
        # Calculate image moments of the detected contour
        M = cv2.moments(contours[0])
        #print("moments calculated from the detected contour: {}".format(M))
        
        
        # calculate/show contour area using both cv.contourArea() or m00 moment:
        #print("Contour area: '{}'".format(cv2.contourArea(contours[0])))
        #print("Contour area: '{}'".format(M['m00']))
        
        # calculate centroid:
        x_centroid = round(M['m10'] / M['m00'])
        y_centroid = round(M['m01'] / M['m00'])
        #print("center X : '{}'".format(x_centroid))
        #print("center Y : '{}'".format(y_centroid))
        
        # calculate eccentricity using both provided formulas:
        eccentricity_moments = eccentricity_from_moments(M)
        #print("eccentricity: '{}'".format(em))
        eccentricity_ellipse = eccentricity_from_ellipse(contours[0])
        #print("eccentricity: '{}'".format(ee))
        
        # computes aspect ratio
        aspect_rat = aspect_ratio(cnt)
        
        # computes solidity (as per vesicularity)
        #solid, hull = solidity(cnt)
        
        label_image = label(alpha_channel)
        
        regions = regionprops(label_image)
        
        props = regions[0] # <- there is only one region
        
        area = props.area
        
        solidity = props.solidity
        
        circ = lambda r: (4 * math.pi * r.area) / (r.perimeter * r.perimeter)
        
        circularity = circ(props)
        
        part_perim = props.perimeter
        
        
        
        eccentricity = props.eccentricity
        
        y_centroid, x_centroid = props.centroid
        
        hull = convex_hull_image(alpha_channel)
        
        hull_perim = measure.perimeter(hull)
                
        convexity = hull_perim / part_perim
        
        min_row, min_col, max_row, max_col = props.bbox
        
        w = max_col - min_col
        
        l = max_row - min_row
        
        circularity_dellino = part_perim/(2*math.sqrt(math.pi*area))
        
        rectangularity = part_perim / (2*l + 2*w)
        
        compactness = area / (l * w)
        
        elongation = (props.feret_diameter_max ** 2) / area
        
        roundness = 4*area / (math.pi * (props.feret_diameter_max ** 2))
    
    
# =============================================================================
#         hull_diff = img_as_float(hull.copy())
#         
#         # Color intersection in gray
#         hull_diff[alpha_channel] = 2
#         
#         # to plot the hull perimeter
#         hull_im = hull.astype(np.uint8)
#         
#         hull_cnts, _ = cv2.findContours(hull_im, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
#         r_alpha = 255 - alpha_channel
#         r_alpha3d = np.tile(r_alpha[:, :, None], [1, 1, 3])
#     
#         cv2.drawContours(r_alpha3d,[hull_cnts[0]],-1,(230,230,50),3)
#         
#         orientation = props.orientation     
#     
#         x1 = x_centroid + math.cos(orientation) * 0.5 * props.minor_axis_length
#         y1 = y_centroid - math.sin(orientation) * 0.5 * props.minor_axis_length
#         x2 = x_centroid - math.sin(orientation) * 0.5 * props.major_axis_length
#         y2 = y_centroid - math.cos(orientation) * 0.5 * props.major_axis_length
# =============================================================================
        
        measurements[name] = [convexity, rectangularity, elongation, roundness, circularity_dellino, eccentricity_moments,eccentricity_ellipse,solidity, aspect_rat, compactness, particle_label]
        
# =============================================================================
#         # Here starts the figure, maybe I could split it into subplots
#         fig, ax = plt.subplots(1,2)
#         
#         ax[0].imshow(r_alpha3d, alpha = 0.8)
#         rr,cc = ellipse_perimeter(int(x_centroid),int(y_centroid),int(props.minor_axis_length*0.5),int(props.major_axis_length*0.5), orientation = props.orientation)
# 
#         angle = np.arctan2(rr - np.mean(rr), cc - np.mean(cc))
#         sorted_by_angle = np.argsort(angle)
#         rrs = rr[sorted_by_angle]
#         ccs = cc[sorted_by_angle]
#         ax[1].imshow(im[...,::-1])
#         ax[1].plot(rrs,ccs, color='black', alpha=0.5, linestyle = '--')
#         ax[1].axis('off')
#         ax[1].plot((x_centroid, x1), (y_centroid, y1), color='black', alpha=0.5, linestyle = '--')
#         ax[1].plot((x_centroid, x2), (y_centroid, y2), color='black', alpha=0.5, linestyle = '--')
#         ax[1].plot(x_centroid, y_centroid, 'black', markersize=15)
#         minr, minc, maxr, maxc = props.bbox
#         bx = (minc, maxc, maxc, minc, minc)
#         by = (minr, minr, maxr, maxr, minr)
#         ax[1].plot(bx, by, 'black', linestyle = '--', linewidth=0.3)
#         ax[0].axis('off')
#         plt.tight_layout(pad = 0.1,w_pad = 0)
#         plt.savefig(f'/Users/dbenet/Desktop/PhD/Chapter2_automatic_class/capytol2/feature_extraction/shape_analysis/{complete_name}', transparent = False)       
#         plt.show()
# =============================================================================
        
    return measurements
        
        

#%%%
def shape_color_texture (filenames, backgrounds):  
    '''Returns shape, normalized color and texture'''
    measurements = {}
    for idx, filename in enumerate(filenames):
        complete_name = filename.split('/')[-1]
        name = filename.split('/')[-1].split('.')[0].split('_')[1:]
        im_ref = list(itemgetter(0,1,2,4)(name))
        im_ref = str(im_ref[0]) + '_' + str (im_ref[1]) + '_' + str (im_ref[2]) + '_' + str (im_ref[3])
        name = str(name[0]) + '_' + str (name[1]) + '_' + str (name[2]) + '_' + str (name[3]) + '_' + str (name[4])
        
        particle_label = filename.split('/')[-1].split('_')[0]
        
        print('Processing particle number: %s' % idx)
        
        #im,alpha_channel = read_transparent_png(filename)
        '''Returns shape parameters of the particle. Contours in int32'''
        
        im_4ch = cv2.imread(filename, cv2.IMREAD_UNCHANGED)
        h, w, _ = im_4ch.shape
        alpha_channel = im_4ch[...,3]
        im = im_4ch[...,0:3]
        im_gray = cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
        im_gray3d = np.tile(im_gray[:, :, None], [1, 1, 3])
        
        contours, hier = cv2.findContours(alpha_channel, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
       
        # 1) Contour analysis
    
        # select larger contour
        cnt = contours[0]
        
        print("Detected contours: {} ".format(len(contours)))
         
        # cv operates with type int32
        #cnt = particle_contour.astype(np.int32)
        
        # Calculate image moments of the detected contour
        M = cv2.moments(contours[0])
        #print("moments calculated from the detected contour: {}".format(M))
        
        
        # calculate/show contour area using both cv.contourArea() or m00 moment:
        #print("Contour area: '{}'".format(cv2.contourArea(contours[0])))
        #print("Contour area: '{}'".format(M['m00']))
        
        # calculate centroid:
        x_centroid = round(M['m10'] / M['m00'])
        y_centroid = round(M['m01'] / M['m00'])
        #print("center X : '{}'".format(x_centroid))
        #print("center Y : '{}'".format(y_centroid))
        
        # calculate eccentricity using both provided formulas:
        eccentricity_moments = eccentricity_from_moments(M)
        #print("eccentricity: '{}'".format(em))
        eccentricity_ellipse = eccentricity_from_ellipse(contours[0])
        #print("eccentricity: '{}'".format(ee))
        
        # computes aspect ratio
        aspect_rat = aspect_ratio(cnt)
        
        # computes solidity (as per vesicularity)
        #solid, hull = solidity(cnt)
        
        label_image = label(alpha_channel)
        
        regions = regionprops(label_image)
        
        props = regions[0] # <- there is only one region
        
        solidity = props.solidity
        
        circ = lambda r: (4 * math.pi * r.area) / (r.perimeter * r.perimeter)
        
        circularity = circ(props)
        
        eccentricity = props.eccentricity
        
        area = props.area
        
        y_centroid, x_centroid = props.centroid
        
        # prepare df for plot
        props_df = regionprops_table(label_image,
                                  properties=['area',                                       
                                              'eccentricity',
                                              'solidity'])
        props_df = pd.DataFrame(props_df)
        
        props_df['circularity'] = circularity
        
        props_df['x_centroid'] = x_centroid
        
        props_df['y_centroid'] = y_centroid
    
        props_df = props_df.round(2)
        
        hull = convex_hull_image(alpha_channel)
        
        hull_perim = measure.perimeter(hull)
        
        part_perim = props.perimeter
        
        convexity = hull_perim / part_perim
        
        min_row, min_col, max_row, max_col = props.bbox
        
        rectangularity = part_perim / (2*max_row + 2*max_col)
        
        compactness = props.major_axis_length / (max_row * max_col)
        
        elongation = props.feret_diameter_max ** 2 / area
        
        roundness = 4*area / (math.pi * (props.feret_diameter_max ** 2))
    
        hull_diff = img_as_float(hull.copy())
        
        # Color intersection in gray
        hull_diff[alpha_channel] = 2
        
    # =============================================================================
    #     fig, ax = plt.subplots()
    #     ax.imshow(hull_diff, cmap=plt.cm.gray, alpha = 0.5)
    #     ax.set_title('Difference')
    #     plt.show()
    # =============================================================================
        
        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        
        # load background
        for index, background in backgrounds.iterrows():
            
        # match background with image    
            if background.name == im_ref:
                
                red_ROB_mean = background.get('red background')   
                green_ROB_mean = background.get('green background')    
                blue_ROB_mean = background.get('blue background')    

        
                # 2) RGB analysis
                
                # 3.2.1) Red channel
                red_TP = im[:,:,2].astype('uint8') # keeps (x,y) for red channel dtype uint8
                # normalise values with background
                red_norm = red_TP / red_ROB_mean * 255
                
                # rescale from 0 to 255
                red_norm *= 255.0/red_norm.max() 
    
                # to stack and display below
                red_norm = red_norm.astype('uint8') 
                                
                # flatten mask image to 1D without the background
                red_hist = np.ravel(red_norm[(red_norm != 255) & (red_norm != 254)]) 
                
                # obtain mean without background
                red_TP_mean = red_hist.mean()
                
                # sd
                red_TP_std = red_hist.std()  
            
                # and mode
                red_TP_mode = int(stats.mode(red_hist)[0])
                
                # 2.2) Green channel
                green_TP = im[:,:,1].astype('uint8') # keeps (x,y) for red channel dtype uint8
                # normalise values with background
                green_norm = green_TP / green_ROB_mean * 255
                
                # rescale from 0 to 255
                green_norm *= 255.0/green_norm.max() 
    
                # to stack and display below
                green_norm = green_norm.astype('uint8') 
                                
                # flatten mask image to 1D without the background
                green_hist = np.ravel(green_norm[(green_norm != 255) & (green_norm != 254)]) 
                # obtain mean without background
                green_TP_mean = green_hist.mean()
                
                # sd
                green_TP_std = green_hist.std()  
            
                # and mode
                green_TP_mode = int(stats.mode(green_hist)[0])
                
                # 2.3) Blue channel
                blue_TP = im[:,:,0].astype('uint8') # keeps (x,y) for red channel dtype uint8
                # normalise values with background
                blue_norm = blue_TP / blue_ROB_mean * 255
                
                # rescale from 0 to 255
                blue_norm *= 255.0/blue_norm.max() 
    
                # to stack and display below
                blue_norm = blue_norm.astype('uint8') 
                                
                # flatten mask image to 1D without the background
                blue_hist = np.ravel(blue_norm[(blue_norm != 255) & (blue_norm != 254)]) 
                # obtain mean without background
                blue_TP_mean = blue_hist.mean()
                
                # sd
                blue_TP_std = blue_hist.std()  
            
                # and mode
                blue_TP_mode = int(stats.mode(blue_hist)[0])
                
                # average std in three channels
                average_std = (red_TP_std+green_TP_std+blue_TP_std)/3
                
                # intensity
                intensity = (red_TP_mean+green_TP_mean+blue_TP_mean)/3
                
                # compute luminance
                luminance = degree_of_luminance(red_TP_mean,
                                                green_TP_mean,
                                                blue_TP_mean)
                
                # to visualize the normalised image
                norm_alpha_image = np.dstack((blue_norm,green_norm,red_norm,alpha_channel))
        
                cv2.imwrite(path + '/input/normalized_images/%s/%s' %(particle_label,complete_name), norm_alpha_image)                
                
                # 3) Texture analysis
                
                gray = color.rgb2gray(im)
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
             
                measurements[name] = [convexity, rectangularity, elongation, roundness, circularity, eccentricity_moments,eccentricity_ellipse,solidity, aspect_rat, luminance, red_TP_mode, green_TP_mode, blue_TP_mode, contrast_mean, dissimilarity_mean, homogeneity_mean, energy_mean, correlation_mean, asm_mean, particle_label]
                
                #left_image = im_gray3d[:,0:int(x_centroid)]
                #right_image = im[:,int(x_centroid):w]
                #merged_im = np.hstack((left_image,right_image))
                up_image = im_gray3d[0:int(y_centroid),:]
                down_image = im[int(y_centroid):h,:]
                merged_im = np.vstack((up_image,down_image))
                cv2.drawContours(merged_im,cnt,-1,[40,40,185],5)
                d = x_centroid-w
                shapestr = '\n'.join((
                r"$\bf{Shape}$", 
                f'Convexity = {convexity:.2f}',
                f'Rectangularity = {rectangularity:.2f}',
                f'Elongation = {elongation:.2f}',
                f'Roundness = {roundness:.2f}',
                f'Circularity = {circularity:.2f}'))
                
                textstr = '\n'.join((
                r"$\bf{Texture}$", 
                f'Dissimilarity = {dissimilarity_mean:.2f}',
                f'Homogeneity = {homogeneity_mean:.2f}',
                f'Energy = {energy_mean:.2f}',
                f'ASM = {asm_mean:.2f}',
                f'Correlation = {correlation_mean:.2f}'))
                
                colorstr = '\n'.join((
                r"$\bf{Color}$", 
                f'Red mode = {red_TP_mode:.2f}',
                f'Green mode = {green_TP_mode:.2f}',
                f'Blue mode = {blue_TP_mode:.2f}'))
                
                fig, ax = plt.subplots(1,2, gridspec_kw={
                           'width_ratios': [0.2, 2]})
                           #'height_ratios': [5,5,1.5,6,5,5]})
                ax[0].text(0.3, 0.75, shapestr, fontsize = 10, va = 'center')
                ax[0].text(0.3, 0.45, textstr, fontsize = 10, va = 'center') 
                ax[0].text(0.3, 0.20, colorstr, fontsize = 10, va = 'center')
                ax[0].axis('off')
                ax[1].imshow(merged_im[...,::-1],)
                plt.axis('off')
                plt.tight_layout()
                plt.savefig(f'/Users/dbenet/Desktop/PhD/Chapter2_automatic_class/capytol2/feature_extraction/catalogue2/{complete_name}', transparent = False)
                plt.show()
                
            else:
                pass
            
    return measurements
               