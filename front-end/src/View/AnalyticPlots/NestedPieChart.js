import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Plot from 'react-plotly.js';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import SelectForSunBurst from './SelectWithCheckForSunBurst';
import Button from './SubmitButton';
import {useState} from 'react'
import DropDownForSunBurst from './DropDownForSunBurst';

// var values = [0, 0, 0, 0];
// var labels = ["juvenile", "lithic", "free crystal", "undefined"];
// var parents =  ["", "", "", ""];
function intToChar(int) {
	const code = 'A'.charCodeAt(0);
	console.log(code); // 👉️ 65
      
	return String.fromCharCode(code + int);
      }
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
      }
var volColor = {
	'juvenile' : '#A91B0D',
	'lithic' : '#3A43BA',
	'free crystal' : '#26D701'
}

function NestedPieChart(props){
	const [SunBurstVariable,setSunBurstVariable] = useState()
	const [SunBurstFinalVariable,setSunBurstFinalVariable] = useState([{value:1,label:"juvenile"},{value:2,label:"lithic"},{value:3,label:"free crystal"}])
	const [sunBurstDataVariable,setSunBurstDataVariable] = useState('overview')
	
	let side = props.onGetSide()
	let data=props.onGetData();
	let variable = SunBurstFinalVariable;
	//console.log(variable)
	//let variable= props.onGetVariable();
	let labels =[]
	let values=[]
	let parents=[]
	// for(let i=0;i<variable.length;i++){
	// 	labels.push(variable[i].label)
	// 	values.push(0);
	// 	parents.push("")
		
	// }
	const PassSunBurstDataVariable = (a) =>{
		setSunBurstDataVariable(a);
	}

	const PassSunBurstVariable = (a) => {
		setSunBurstVariable(a)
	}
	

	const submitSunBurstVariable =()=>{
		setSunBurstFinalVariable(SunBurstVariable)
	}

	let cc = setSunBurstDataVariable
	let Data = []
// 	if(cc !== 'overview'){
// 	for (let i=0;i<data.length;i++){
		
// 			if(data[i]['volc_name'] === cc){
// 				Data.push(data[i])
// 			}
			
		
// 	}

// 	data = Data

// }

	

	let crysTable ={}
	let shapeTable ={}
	let alterTable = {}
	for(let i=0;i<variable.length;i++){
		crysTable[variable[i].label] ={}
		shapeTable[variable[i].label] = {}
		alterTable[variable[i].label] = {}
	}
	
	//console.log(crysTable)
	// for(let i=0;i<data.length;i++){
	// 	if(data[i]['basic_component'] === 'lithic'){
	// 		console.log(data[i]['crystalinity_and_color']);
	// 	}
	// }

	for(let i=0;i<data.length;i++){
		if(crysTable[data[i]["basic_component"]]&&data[i]["crystallinity_and_color"]){
			
			crysTable[data[i]["basic_component"]][data[i]["crystallinity_and_color"]] =0;}
		else if(crysTable[data[i]['basic_component']])
			crysTable[data[i]["basic_component"]]['undefined'] =0;
		else
			crysTable['undefined'] = 0
		if(shapeTable[data[i]["basic_component"]]&&data[i]["shape"])	
			shapeTable[data[i]["basic_component"]][data[i]["shape"]] =0;
		else if(shapeTable[data[i]['basic_component']])
			shapeTable[data[i]["basic_component"]]['undefined'] =0;
		else
			shapeTable['undefined'] = 0
		if(alterTable[data[i]["basic_component"]]&&data[i]["alteration_degree"])
			alterTable[data[i]["basic_component"]][data[i]["alteration_degree"]] =0;
		else if(alterTable[data[i]['basic_component']])
			alterTable[data[i]["basic_component"]]['undefined'] =0;
		else
			alterTable['undefined'] = 0
	}
	for(let i=0;i<data.length;i++){
		if(data[i]["basic_component"]&&data[i]["crystallinity_and_color"]&&crysTable[data[i]["basic_component"]])
			crysTable[data[i]["basic_component"]][data[i]["crystallinity_and_color"]] +=1;
		else if(data[i]['basic_component']&&crysTable[data[i]["basic_component"]])
			crysTable[data[i]["basic_component"]]['undefined'] +=1;
		else
			crysTable['undefined'] +=1;
		if(data[i]["basic_component"]&&data[i]["shape"]&&shapeTable[data[i]["basic_component"]])
			shapeTable[data[i]["basic_component"]][data[i]["shape"]] +=1;
		else if(data[i]['basic_component']&&shapeTable[data[i]['basic_component']])
			shapeTable[data[i]["basic_component"]]['undefined'] +=1;
		else
			shapeTable['undefined'] +=1;
		if(data[i]["basic_component"]&&data[i]["alteration_degree"]&&alterTable[data[i]["basic_componet"]])
			alterTable[data[i]["basic_component"]][data[i]["alteration_degree"]] +=1;
		else if(data[i]['basic_component']&&alterTable[data[i]['basic_component']])
			alterTable[data[i]["basic_component"]]['undefined'] +=1;
		// else
		// 	alterTable['undefined'] +=1;
	}

	
	// console.log(crysTable)
	// console.log(shapeTable)
	// console.log(alterTable)
	


	for(const[key,value] of Object.entries(crysTable)  ){
		for(const[k,v] of Object.entries(value)){
			let check=0;
			for(let i=0;i<labels.length;i++){
				if(labels[i]===k){
					check = 1;
				}
			}
			
	

			if(k !== 'undefined' && check === 0){
			labels.push(k);
			parents.push("");
			values.push(0);}
			else if(check ===0 && k === 'undefined'){
			labels.push(k+key)
			values.push(0)
			parents.push("")
		}
			// if(key !== 'undefined')
			//parents.push("")
		}
	}

	for(let i=0;i<variable.length;i++){
		
		for(const[key,value] of Object.entries(crysTable[variable[i].label])){
			let check = 0;
			for(let i=0;i<parents.length;i++){
				if(parents[i]===key){
					check = 1;
				}
			}
			if(check === 0){
			labels.push(variable[i].label)
			if(key === 'undefined'){
			
			parents.push(key+variable[i].label)
		
		}
			else
			parents.push(key)
			values.push(crysTable[variable[i].label][key])
	}
	else{

	}
		}
		// if(crysTable[variable[i].label]['undefined'])
		// 	if(crysTable[variable[i].label]['undefined']>0)
		// 		values.push(crysTable[variable[i].label]['undefined']);
		// 	else
		// 		values.push(0)
		// else
		// values.push(crysTable[variable[i].label])
		
		
	}

	let ids=[]
	for(let i=0;i<values.length;i++){
		if(i>0 && labels[i]===labels[i-1]){
			ids.push(labels[i]+i)
		}
		else
		ids.push(labels[i])
	}
	
	let colors = []

	for(let i=0;i<labels.length;i++){
		if((i>= 0 && i<=5) || (i===7)){
			colors.push('#FF8886')
		}
		else if(i===6){
			colors.push('#45b6fe')
		}
		else if(i===8){
			colors.push('#FFFBC8')}
		else if((i>=9 && i<=14) || (i===16)){
			colors.push('red')
		}
		else if(i === 15){
			colors.push('#3A9BDC')}
		else if(i===17){	
			colors.push('yellow')}
	}

	// for(let i=0;i<labels.length;i++){
	// 	if(i>0 && i>=9 && labels[i] === labels[i-1])
	// 		colors.push(colors[i-1]);
	// 	else
	// 		colors.push(volColor[labels[i]])

	// }

	console.log(labels)
	console.log(parents)
	console.log(values)
	console.log(colors)

	let d={}
	let t = []
	for(let i=0;i<labels.length;i++){
		if(i>0 && labels[i]===labels[i-1]){
			t.push("")
		}
		else{
			t.push(labels[i])
		}
	}


	console.log(d)
	
	const doubleClick = () =>{
	
		props.onPassZoomMode(SunBurstFinalVariable,"sunburstPlot");
	}

	return (
				<div>
				<div>
					<DropDownForSunBurst  onPassSunBurstDataVariable= {PassSunBurstDataVariable} />
					
				</div>
				<div>
					<SelectForSunBurst onPassSunBurstVariable = {PassSunBurstVariable}/>
				</div>
				<div>
					<Button onSubmitSunBurstVariable = {submitSunBurstVariable}/>
				</div>
		<div onDoubleClick ={doubleClick}>
			<Plot
        data={[{
		labels: t,
		parents: parents,
		ids: ids,
		type: "sunburst",
		values:  values,
		marker:{line:{width:0},
		colors:colors,
	}
		}
	]}		
									
        layout={ {width: side[0], height: side[1], title: 'Sunburst'} }
      />
      </div>
		</div>
	)
}

export default NestedPieChart;