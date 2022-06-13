import React from 'react';
import { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import Plot from 'react-plotly.js';
import DropDownBar from './DropDownForBinaryGraph';
import DropDownForHistogramMode from './DropDownForHistogramMode';
import DropDownForHistogramCompare from './DropDownForHistogramCompare';
const axios = require('axios')


var variableData = ["convexity","rectangularity","elongation","roundness","circularity","eccentricity_moments","eccentricity_ellipse","solidit","aspect_rat","compactness","circ_rect","comp_elon","circ_elon","rect_comp","contrast","dissimilarity","homogeneity","energy","correlation","asm","blue_mean","blue_std","blue_mode","green_mean","green_std","green_mode","red_mean","red_std","red_mode"];

const Histogram = (props) =>{
	// let mesurement = []
	// mesurement = require("/Users/vinhkhaitruong/Desktop/EOS Project /front-end/src/sample.json");
	// console.log(mesurement)
	Chart.register(...registerables);
	const [parArray,setParArray] = useState([])
	const [volTable,setVolTable] = useState({})
	const [histogramData,setHistogramData] = useState([])
	const [histogramVariable,setHistogramVariable] = useState('red_std') 
	const [histogramMode,setHistogramMode] = useState('Overview')
	const [volcToCompare1,setVolcToCompare1] = useState('Pinatubo')
	const [volToComapare2,setVolcToCompare2] = useState('Taal')

	const PassHistogramVariable =(a) =>{
		setHistogramVariable(a)
	}

	function GetVariableData(){
		return variableData
	}

	
	
	let Data = props.onGetData()
	
	let variable = histogramVariable;
	let pData = []
	let volcToCompare = [volcToCompare1,volToComapare2];
	let mode = histogramMode;
	let side = props.onGetSide();

	const PassHistogramMode = (a) => {
		setHistogramMode(a)
	}

	const PassVolcToCompare1 = (a) =>{
		setVolcToCompare1(a)
	}
	
	const PassVolcToCompare2 = (a) =>{
		setVolcToCompare2(a)
	}

	

	console.log(Data)
	if(mode === 'Overview'){
		let d = [];
		for(let i=0;i<Data.length;i++){
			if(Data[i]['blue_std']){
				d.push(Data[i][variable])
			}
		}
		d.sort(function(a, b){return a - b})
		let max=0;
		let min =99999
		for(let i=0;i<d.length;i++){
			if(d[i] > max){
				max =d[i]
			}
			if(d[i] < min){
				min = d[i]
			}
		}
		let bin = (max-min)/29
		let dict ={}
		let temp = min
		while(temp<=max-bin){
			let w = (2*temp+bin)/2
			dict[parseFloat(w.toFixed(8))] = 0
			temp += bin 
		}
		for(let i=0;i<d.length;i++){
			let a = Math.floor((d[i] - min)/bin) 
			let q = (min+(a*bin) + min + (a+1)*bin)/2

			dict[parseFloat(q.toFixed(8))] +=1
		}

		let arr_X = []
		let arr_Y = [] 
		for(const[key,value] of Object.entries(dict)){
			arr_X.push(key)
			arr_Y.push(value)
		}


		console.log(dict)

		pData.push({
			x: d,
			type: 'histogram',
			mode: 'lines',
			xbins: {
				size: bin, 
				},
			
		})
		pData.push({
			
			x: arr_X,
			y: arr_Y,
			mode: 'lines',
			name: 'spline',
			text: ['tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object'],
			line: {shape: 'spline',
			color: 'rgb(55, 128, 191)',
		
		},
			type: 'scatter'
			      
		})

// 		var gaussian = require('gaussian');
// var distribution = gaussian(mean, variance);
// // Take a random sample using inverse transform sampling method.
// var sample = distribution.ppf(d);

	}
	else{
		let arr1 = [12, 29, 43, 44, 47, 79, 91, 96, 97, 102, 104, 107, 109, 110, 117, 122, 127, 141, 143, 159, 161, 169, 173, 190, 200, 205, 210, 214, 216, 221, 237, 242, 248, 266, 267, 284, 291, 293, 299, 309, 318, 324, 344, 350, 360, 393, 412, 418, 420, 443, 444, 447, 453, 456, 463, 464, 472, 480, 490, 495]
		let arr2 = [19, 23, 25, 39, 42, 65, 90, 92, 98, 104, 106, 115, 122, 123, 138, 142, 151, 154, 160, 168, 178, 179, 180, 183, 194, 198, 213, 215, 232, 233, 234, 241, 243, 246, 258, 260, 261, 282, 284, 286, 287, 300, 306, 311, 338, 352, 395, 396, 397, 399, 414, 422, 423, 428, 444, 457, 459, 462, 472, 481]
		let volc1Data=[]
		let volc2Data=[]
		for(let i=0;i<Data.length;i++){
			if(Data[i]['volc_name'] === volcToCompare[0])
				volc1Data.push(Data[i][variable]);
			if(Data[i]['volc_name'] === volcToCompare[1])  
				volc2Data.push(Data[i][variable]);
		}
		volc1Data= arr1
		volc2Data=arr2

		let max1=0;
		let min1 =99999
		let d1 = arr1
		let d2 = arr2
		for(let i=0;i<volc1Data.length;i++){
			if(volc1Data[i] > max1){
				max1 =volc1Data[i]
			}
			if(volc1Data[i] < min1){
				min1 = volc1Data[i]
			}
		}
		let bin1 = (max1-min1)/20
		let dict1 ={}
		let temp1 = min1
		while(temp1<=max1-bin1){
			let w1 = (2*temp1+bin1)/2
			dict1[parseFloat(w1.toFixed(8))] = 0
			temp1 += bin1 
		}
		for(let i=0;i<d1.length;i++){
			let a1 = Math.floor((volc1Data[i] - min1)/bin1) 
			let q1 = (min1+(a1*bin1) + min1 + (a1+1)*bin1)/2

			dict1[parseFloat(q1.toFixed(8))] +=1
		}

		let arr_X1 = []
		let arr_Y1 = [] 
		for(const[key,value] of Object.entries(dict1)){
			arr_X1.push(key)
			arr_Y1.push(value)
		}

		let max2=0;
		let min2 =99999
		for(let i=0;i<volc2Data.length;i++){
			if(volc2Data[i] > max2){
				max2 =volc2Data[i]
			}
			if(d2[i] < min2){
				min2 = volc2Data[i]
			}
		}
		let bin2 = (max2-min2)/20
		let dict2 ={}
		let temp2 = min2
		while(temp2<=max2-bin2){
			let w2 = (2*temp2+bin2)/2
			dict2[parseFloat(w2.toFixed(8))] = 0
			temp2 += bin2
		}
		for(let i=0;i<d2.length;i++){
			let a2 = Math.floor((volc2Data[i] - min2)/bin2) 
			let q2 = (min2+(a2*bin2) + min2 + (a2+1)*bin2)/2

			dict2[parseFloat(q2.toFixed(8))] +=1
		}

		let arr_X2 = []
		let arr_Y2 = [] 
		for(const[key,value] of Object.entries(dict2)){
			arr_X2.push(key)
			arr_Y2.push(value)
		}


		console.log(bin1)
		console.log(bin2)
		pData.push({
			x: arr1,
			type:'histogram',
			mode:'marker',
			name: volcToCompare[0],
			xbins: {
				size: bin1, 
				},
			marker:{
				color:'blue'
			}
			
		})
		pData.push({
			x: arr2,
			type:'histogram',
			mode:'marker',
			name: volcToCompare[1],
			xbins: {
				size: bin2, 
				},
			marker:{
				color:'blue'
			}
			
		})

		pData.push({
			
			x: arr_X1,
			y: arr_Y1,
			mode: 'lines',
			name: 'spline',
			text: ['tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object'],
			line: {shape: 'spline'},
			type: 'scatter',
			line:{
				color: 'rgb(55, 128, 191)',
				width: 3
		}
			      
		})

		pData.push({
			
			x: arr_X2,
			y: arr_Y2,
			mode: 'lines',
			name: 'spline',
			text: ['tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object', 'tweak line smoothness<br>with "smoothing" in line object'],
			line: {shape: 'spline'},
			type: 'scatter',
			line:{
				color: 'rgb(55, 128, 191)',
				width: 3
		}
			      
		})

	}
	//console.log(pData)
	const doubleClick = () =>{
		// props.onPassZoomInBinaryPlot([xAxis,yAxis,essentialVariable]);
		 props.onPassZoomMode([mode,histogramVariable],"histogramPlot");
	}
	
	return(
		<div>

<div className = 'DropDownHistogram'>
					<DropDownForHistogramMode onPassHistogramMode = {PassHistogramMode} />
				

					{(histogramMode === 'Compare')?(
						<div className= 'volcToCompare'>  
							<DropDownForHistogramCompare onPassVolcToCompare1 = {PassVolcToCompare1} />
							<DropDownForHistogramCompare onPassVolcToCompare2 = {PassVolcToCompare2} />
						</div>
					):(
						<div> </div>
					)
	}

			</div>

		<div>
				<DropDownBar onPassHistogramVariable = {PassHistogramVariable} onGetVariableData={GetVariableData}/>
		</div>
<div onDoubleClick = {doubleClick}>
<Plot
data={pData}
layout={ {width: side[0], height: side[1], title: 'Histogram',
xaxis: {
	title: {
	  text: histogramVariable + ' frequency',
	  font: {
	    family: 'Courier New, monospace',
	    size: 18,
	    color: '#7f7f7f'
	  }
	},
      },
      yaxis: {
	title: {
	  text: 'count',
	  font: {
	    family: 'Courier New, monospace',
	    size: 18,
	    color: '#7f7f7f'
	  }
	}
      }
    
} }
/>
</div>
</div>
	
);
}

export default Histogram;




	
	