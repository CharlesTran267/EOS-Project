import { SwipeableDrawer } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Legend, Title } from 'chart.js';
import React from 'react';
import {Line} from 'react-chartjs-2'; 
import App from './VolcanoeTimeLine';
import { useHistory } from 'react-router-dom';


const AFEtimeGraph = (props) =>{

	let AFEDummyData = props.onGetAFEData();

	let TaalData = props.onGetTaalData();
	let list = props.ll();
	let graphData = props.dt();
	let TaalEruptionEndYear = props.onGetTaalEruptionEndYear();
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

	let AFEFilteredData = AFEDummyData.filter(n => list.includes(n.x));

	for(let i =0;i<EndYear.length;i++){
		fillList.push(EndYear[i]);
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