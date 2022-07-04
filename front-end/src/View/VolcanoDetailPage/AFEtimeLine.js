import { SwipeableDrawer } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Legend, Title } from 'chart.js';
import React from 'react';
import {Line} from 'react-chartjs-2'; 
import App from './VolcanoeTimeLine';
import { useHistory} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { ppid } from 'process';

const axios = require('axios')
const AFEtimeGraph = (props) =>{

	const [eruptions,setEruptions] = useState([])
  useEffect(() =>{
		axios.get('/volcanoes/getEruptions')
		.then(data =>{
      setEruptions(data.data['eruptions'])
			console.log(data.data['eruptions'])
		})
		
	
	},[])

	let AFEDummyData = props.onGetAFEData();

	let list = props.ll();
	let graphData = props.dt();
	//let TaalEruptionEndYear = props.onGetTaalEruptionEndYear();


	let TaalData = [];

var pathArray = window.location.pathname.split('/');
let vol =""
if(pathArray[2] === "1" ){
  vol = "Pinatubo"
}
else{
  vol="Taal"
}
let Vol = []
for(let i=0;i<eruptions.length;i++){
	if(eruptions[i]['volc_name'] === vol && eruptions[i]['ed_stime'] && eruptions[i]['ed_etime'] ){
	let s = eruptions[i]['ed_stime'].substr(0,4);
	let e = eruptions[i]['ed_etime'].substr(0,4);
	if(parseInt(s)>=1521  && parseInt(s) <= 2020 && parseInt(e)>=1521  && parseInt(e) <= 2022 ){
	Vol.push({s:parseInt(s),e:parseInt(e)})
      }
      }
      }

let TaalEruptionEndYear=[]
// for(let i=0;i<eruptions.length;i++){
//   if(eruptions[i]['volc_name'] === vol && eruptions[i]['ed_etime']){
//     let s = eruptions[i]['ed_etime'].substr(0,4);
//     if(parseInt(s)>=1521  && parseInt(s) <= 2022){
//     TaalEruptionEndYear.push({x:parseInt(s),y:10})
//   }
//   } 
// }

for(let i=0;i<Vol.length;i++){
	TaalData.push(Vol[i].s)
	TaalEruptionEndYear.push(Vol[i].e+1)
      }
console.log(TaalData)

// let intervals = []
// for(let i=0;i<TaalData.length;i++){
// 	intervals.push({s:TaalData[i],e:TaalEruptionEndYear[i]})	
// }

// intervals.sort(function(a,b){return a.s.x<b.s.x})
// if(intervals.length>0){

// let q =[]
// let b = intervals[intervals.length-1].s.x
// let k = intervals[intervals.length-1].e.x
// for(let i=intervals.length-2;i>=0;i--){		
// 	if(intervals[i].s.x<=k){
// 		k = intervals[i].e.x
// 	}
// 	else{
// 		q.push({s:b,e:k})
// 		b=intervals[i].s.x
// 		k=intervals[i].e.x
// 	}


// }
// q.push({s:b,e:k})
// console.log(q)
// }


	let p = TaalData.filter(n => list.includes(n.x));

	let EndYear = TaalEruptionEndYear.filter(n => list.includes(n.x));

	const history = useHistory();

	const routeChange = () =>{
		let path = `/par_gral/par_gralDetailPage`;
		history.push(path);
	}

	let fillList = TaalData.filter(n => list.includes(n.x));
	for(let i=0;i<fillList.length;i++){
		fillList[i].y = 10;
	}





	for(let i =0;i<EndYear.length;i++){
		fillList.push(EndYear[i]);
	}

	let AFEFilteredData = AFEDummyData.filter(n => list.includes(n.x));
console.log(TaalData)
console.log(TaalEruptionEndYear)
	if(p.length>0 && EndYear.length>0){
		if(p[0]>EndYear[0]){
			fillList.unshift({x:list[0],y:10})
			alert('3')
		}

		if(p[p.length-1] > EndYear[EndYear.length - 1] ){
			fillList.push({x:list[list.length-1],y:10})
		}
	}

	for(let i =1;i<fillList.length;i++){
		for(let j = i;j>0;j--){
			if(fillList[j].x < fillList[j-1].x){
			let temp = fillList[j].x;
			fillList[j].x = fillList[j-1].x;
			fillList[j-1].x = temp;
			
			}
		}
	}

	console.log(fillList);

	

	let zoomList = []
	for(let i=0;i<fillList.length;i++){
		zoomList.push(fillList[i]);
		if(zoomList.length %2 === 0){
			zoomList.push({
				x:zoomList[zoomList.length - 1].x,
				y:0
			});
			if(i< fillList.length - 1){
			zoomList.push({
				x:fillList[i+1].x,
				y:0
			});
			}
		}
	}


	

		
	const AFEdata = {
		labels: list,
  datasets: [

	{
	label: 'Line Dataset',
	data: zoomList,
	fill: true,
	showLine: false,
	pointRadius: 0,
	backgroundColor: 'rgba(0, 100, 0, 0.4)',

    },
    {
      position: 'Right',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'red',
      pointStyle: 'rectRot',
      pointRadius: 5,
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: AFEFilteredData,
      showLine: false,
      pointRadius: 5,
    }
  ],
	}
	const opt = {maintainAspectRatio: false,
		scales: {
			y: {
			  display:false,
		
			},
	  
			x:{
			  display:true,
			  ticks: {
				autoSkip: true,
				maxTicksLimit: 55
			    },
	

			}
		      },

		      plugins: {
			title: {
			    display: true,
			    text: 'Zoom In',
			    font: {
			      size: 25
			    }
			},
	  
			legend:{
			  display: false,
			}
	  
			
		    },
		    onClick: function(evt, ele){
			    if(ele.length >0)
			    	routeChange();
		    }
	
	};

	const BackToEruption = (event) =>{
		props.onBack(event);
	}


	return(
	<div>
		<div>
		<Line 
		data={AFEdata}
		height={200}
		width={200}
		options ={opt}
		/>
		</div>
		
	</div>


		
	);
}

export default AFEtimeGraph;