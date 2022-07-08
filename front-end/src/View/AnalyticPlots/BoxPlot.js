import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { reduce } from 'async';
import Plot from 'react-plotly.js';
import { useState } from 'react';
import DropDownBar from './DropDownForBinaryGraph';

var variableData = ["convexity","rectangularity","elongation","roundness","circularity","eccentricity_moments","eccentricity_ellipse","solidit","aspect_rat","compactness","circ_rect","comp_elon","circ_elon","rect_comp","contrast","dissimilarity","homogeneity","energy","correlation","asm","blue_mean","blue_std","blue_mode","green_mean","green_std","green_mode","red_mean","red_std","red_mode"];
const BoxPlot = (props) =>{
	const [xAxis,setXAxis] = useState('red_std')
	const [yAxis,setYAxis] = useState()
	let side = props.onGetSide();
	let data = props.onGetData();

	let initialXAxis = 'red_std'
	let initialYAxis = 'props.onGetInitialYAxis();'
	let initialEssentialVariable = '1'

	let a=[]

	function GetVariableData(){
		return variableData
	}

	function PassVariableForY(y){
		setYAxis(y);
	    }

	function PassVariableForX(x){
		setXAxis(x);
		
	    }
	let variable = xAxis;
	for(let i =0;i<data.length;i++){
		if(data[i][variable]){
			a.push(data[i][variable]);
		}
	}

	var d = [
		{
		  y: a,
		  boxpoints: 'all',
		  jitter: 0.3,
		  pointpos: -1.8,
		  type: 'box',
		  name:xAxis,
		}
	      ];
	
	      const doubleClick = () =>{
		
		props.onPassZoomMode([xAxis],"boxPlot");
	}

	return(
	<div >
		<div>
		<DropDownBar className = 'dropdown' onPassVariableForX = {PassVariableForX} onPassVariableForY = {PassVariableForY} onGetVariableData={GetVariableData} onGetInitialData={() => { return [initialXAxis,initialYAxis,initialEssentialVariable] }}/>
		</div>
<div onDoubleClick = {doubleClick}>
	<Plot
        data={d}
	
        layout={ {width: side[0], height: side[1], title: 'Box Plot',yaxis: {
		title: 'value',
		
	      },}}
	
      />
</div>
      </div>
      );
      
}

export default BoxPlot;