import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { reduce } from 'async';
import Plot from 'react-plotly.js';
import { useState } from 'react';
import DropDownBar from './DropDownForBinaryGraph';
import DropDownForEssential from './DropDownForEssentialVariable';

var variableData = ["convexity","rectangularity","elongation","roundness","circularity","eccentricity_moments","eccentricity_ellipse","solidit","aspect_rat","compactness","circ_rect","comp_elon","circ_elon","rect_comp","contrast","dissimilarity","homogeneity","energy","correlation","asm","blue_mean","blue_std","blue_mode","green_mean","green_std","green_mode","red_mean","red_std","red_mode"];
let crystallinity = "crystallinity";
let shape = shape;
const BinaryPlot = (props) =>{

	// let mesurement = require("/Users/vinhkhaitruong/Desktop/EOS Project /front-end/src/sample.json");
	const [a,setA] = useState([])
	const [binaryPlotX,setBinaryPlotX] = useState([])
	const [binaryPlotY,setBinaryPlotY] = useState([])
	const [check,setCheck] = useState(0);

	let initialXAxis = props.onGetInitialXAxis();
	let initialYAxis = props.onGetInitialYAxis();
	let initialEssentialVariable = props.onGetEssentialVariable();
	let legendSize = props.onGetLegendSize();
	const [xAxis,setXAxis] = useState(initialXAxis)
	const [yAxis,setYAxis] = useState(initialYAxis)
	const [essentialVariable,setEssentialVariable] = useState(initialEssentialVariable)
	Chart.register(...registerables);
	let arr = []
	arr = props.onGetData();
	let side = props.onGetSide()
	// for(const [key,value] of Object.entries(mesurement)){
	// 	arr.push(value);
	// }
	// let variable = props.onGetVariable();
	// let essentialVariable = props.onGetEssentialVariable(); 
	// if(check == 0){
		
	// 	console.log(variable.label);
	// 	setS(variable.label);
	// 	setCheck(1);
	// 	}



function PassVariableForX(x){
        setXAxis(x);
        
    }

function PassVariableForY(y){
      setYAxis(y);
  }

const PassEssentialVariable = (a) =>{
	setEssentialVariable(a)
}

function GetVariableData(){
	return variableData
}

  	let variable = [xAxis,yAxis]



	let dataListX = {}
	let dataListY = {}
	let essentialList = {}
	let data = []
	let JnCrys = {}
	let JnShape = {}
	

	for(let i=0;i<arr.length;i++){
		
		JnCrys[arr[i]["crystallinity_and_color"]] = [];
		
		essentialList[arr[i][essentialVariable]] = 1;
	} 

	console.log(JnCrys)
	console.log(JnShape)
	for(const[key,value] of Object.entries(essentialList)){

		dataListX[key] = []
		dataListY[key] = []
	}

	for(let i=0;i<arr.length;i++){
		JnCrys[arr[i][crystallinity]].push(arr[i]["shape"])	
		if(arr[i][essentialVariable]){
			dataListX[arr[i][essentialVariable]].push(arr[i][variable[0]])
		}
		if(arr[i][essentialVariable]){
			dataListY[arr[i][essentialVariable]].push(arr[i][variable[1]])
		}
	}

	console.log(JnCrys)

	for (const [key, value] of Object.entries(essentialList)){
		let check = 0;
		for(let i =0;i<a.length;i++){
			if(key === a[i])
				check = 1
		}
		if(check === 1){
			data.push({
				x:dataListX[key],
				y:dataListY[key],
				type:'scatter',
				mode:'markers',
				name:key,
				marker:{
					color:'grey'
				}
			})  
		}
		else
			data.push({x: dataListX[key],
			y: dataListY[key],
			type: 'scatter',
			mode: 'markers',
			name: key,
			
			
		})
	      }

	      document.addEventListener('click', function handleClick(event) {
		console.log('user clicked: ', event.target.parentNode.firstChild.textContent);
	      if(event.target.classList.value === 'legendtoggle'){
		      
		    let t = event.target.parentNode.firstChild.textContent
		    let w = []
		    let s = 0
		  	for(let i=0;i<a.length;i++){
				  w.push(a[i])
				  if(t === a[i]){
					w.splice(i, 1);
					s = 1
				  }
			  }
		   if(s===1){
			   setA(w)
		   }
		   else
			setA([...a,t])
		    
	      }
		
	      });
	const doubleClick = () =>{
		
		props.onPassZoomMode([xAxis,yAxis,essentialVariable],"binaryPlot");
	}
	
	console.log(data)
		return(
	<div>
	<div className = 'binaryDropDown' >
	<div>
			<DropDownForEssential onPassEssentialVariable = {PassEssentialVariable} onGetEssential = {()=>{return initialEssentialVariable }} />
		</div>

		<div class='select'>
			<DropDownBar className = 'dropdown' onPassVariableForY = {PassVariableForY} onGetVariableData={GetVariableData} onGetInitialData={() => { return [initialXAxis,initialYAxis,initialEssentialVariable] }}/>	
			<DropDownBar className = 'dropdown' onPassVariableForX = {PassVariableForX} onGetVariableData={GetVariableData} onGetInitialData={() => {return [initialXAxis,initialYAxis,initialEssentialVariable] }}/>
		</div>


	</div>
<div onDoubleClick={doubleClick}>
<Plot
        data={data}
	
        layout={ {width: side[0], height: side[1], title: 'Binary Plot',legend:{
		font:{
			size:legendSize
		}
	},
	 xaxis: {
		title: {
		  text: xAxis,
		  font: {
		    family: 'Courier New, monospace',
		    size: 18,
		    color: '#7f7f7f'
		  }
		},
	      },
	      yaxis: {
		title: {
		  text: yAxis,
		  font: {
		    family: 'Courier New, monospace',
		    size: 18,
		    color: '#7f7f7f'
		  }
		}
	      }
	
} }
	onLegendClick={(e) => {
		return false
	}

}	
	
	
	
      />
</div>
	</div>
		
	);
}

export default BinaryPlot;