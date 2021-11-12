import React from 'react';
import { Line } from 'react-chartjs-2';
import DragBox from './DragBox';
import { useState } from 'react';


const OverviewTimeLine = (props) =>{

  
  let list = [];
	for(let i = 1521;i<=2021;i++){
		list.push(i);
	}

  const [lb,setLB] = useState(list);

  const [yearDown,setYearDown] = useState(0);
  const [yearUp,setYearUp] = useState(0);
  const [w,setW] = useState(window.innerWidth);
  const [EruptionLabel,setEruptionLabel] = useState([...list]);

  let TaalEndYear = props.onGetTaalEruptionEndYear();
  let TaalData = props.onGetTaalData();
  let AFEDummyData = props.onGetDummyAFEData();


  let fillList = TaalData;
	for(let i=0;i<fillList.length;i++){
		fillList[i].y = 10;
	}

	for(let i =0;i<TaalEndYear.length;i++){
		fillList.push(TaalEndYear[i]);
	}

	fillList.sort((a,b) => a.x > b.x && 1 || -1 )

  let zoomList = [];
	for(let i=0;i<fillList.length;i++){
		zoomList.push(fillList[i]);
		if(zoomList.length%2 === 0){
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

  console.log(fillList);


  window.addEventListener("resize", () => {
    setW(window.innerWidth);
  })

  window.addEventListener("onload", () => {
    setW(window.innerWidth);
  })


  const MouseDown = () =>{
    var e = window.event;
    var w = window.innerWidth;
    var posX = e.clientX;
    setYearDown(10*(posX/w - 0.01828681424446583)/(0.01936477382) + EruptionLabel[0] );
    var yD = 10*(posX/w - 0.01828681424446583)/(0.01936477382) + EruptionLabel[0];
    console.log(yD);
        
  }

  const MouseUp = () =>{
    var e = window.event;
    var w = window.innerWidth;
    var posX = e.clientX;
    setYearUp(10*(posX/w - 0.01828681424446583)/(0.01936477382) + EruptionLabel[0] );
    var yU = 10*(posX/w - 0.01828681424446583)/(0.01936477382) + EruptionLabel[0];
    var m = Math.floor((yU-Math.floor(yU)) /0.1) + 1 ;
    console.log(yU);
    props.onPassData(yearDown,yU);

  }


	const graphData = {
		labels: lb,
  datasets: [{
      label: 'Line Dataset',
      data: zoomList,
      fill: true,
      showLine: false,
      pointRadius: 0,
      backgroundColor: 'rgba(0, 100, 0,1)',


  },
    {
      position: 'Right',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'red',
      borderColor: 'rgba(0,0,0,1)',
      pointStyle: 'rectRot',
      borderWidth: 1,
      pointRadius: 5,
      data: AFEDummyData,
      showLine: false,
	},
  

],
}

	const opt = {
		maintainAspectRatio: false,
            scales: {
              y: {
                display:false,
              },

              x:{
                display:true,
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 55
              }
              }
            },

            plugins: {
              title: {
                  display: true,
                  text: 'Eruption History',
                  font: {
                    size: 25
                  }
              },

              legend:{
                display: false,
              }

              
          },
	}

	return(
<div>
      <div
      onMouseDownCapture = {MouseDown}
      onMouseUpCapture = {MouseUp}
      >
        <DragBox  ></DragBox>
      </div>

      
    <div>
		  <Line 
		  data={graphData}
		      height={300}
		      width={300}
		      options={opt}
		  />
    </div>
</div>
	);
}

export default OverviewTimeLine;