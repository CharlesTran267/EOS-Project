import React from 'react';
import { Line } from 'react-chartjs-2';
import DragBox from './DragBox';
import { useState,useEffect } from 'react';

const axios = require('axios')
const OverviewTimeLine = (props) =>{
  const [eruptions,setEruptions] = useState([])
  useEffect(() =>{
		axios.get('/volcanoes/getEruptions')
		.then(data =>{
      setEruptions(data.data['eruptions'])
			console.log(data.data['eruptions'])
		})
		
	
	},[])
  let Vol = [];
  let TaalEruptionYear = [];
const TaalData = [];

var pathArray = window.location.pathname.split('/');
let vol =""
if(pathArray[2] === "1" ){
  vol = "Pinatubo"
}
else{
  vol="Taal"
}

for(let i=0;i<eruptions.length;i++){
  if(eruptions[i]['volc_name'] === vol && eruptions[i]['ed_stime'] && eruptions[i]['ed_etime'] ){
  let s = eruptions[i]['ed_stime'].substr(0,4);
  let e = eruptions[i]['ed_etime'].substr(0,4);
  if(parseInt(s)>=1521  && parseInt(s) <= 2020 && parseInt(e)>=1521  && parseInt(e) <= 2022 ){
  Vol.push({s:parseInt(s),e:parseInt(e)})
}
}
}

// console.log(TaalEruptionYear)
let VolEndYear=[]
// for(let i=0;i<eruptions.length;i++){
//   if(eruptions[i]['volc_name'] === vol && eruptions[i]['ed_etime']){
//     let s = eruptions[i]['ed_etime'].substr(0,4);
//     if(parseInt(s)>=1521  && parseInt(s) <= 2022){
//     VolEndYear.push(parseInt(s))
//   }
//   } 
// }

for(let i=0;i<Vol.length;i++){
  TaalEruptionYear.push(Vol[i].s)
  VolEndYear.push(Vol[i].e)
}




console.log(VolEndYear.length)
console.log(TaalEruptionYear.length)

for(let i=0;i<TaalEruptionYear.length;i++){
  let p = {
    x: VolEndYear[i]+1,
    y: 10
  }
  TaalData.push(p);
}


for(let i=0;i<TaalEruptionYear.length;i++){
  let p = {
    x: TaalEruptionYear[i],
    y: 10
  }
  TaalData.push(p);
}


  
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
  datasets: [
    {
      label: 'Line Dataset',
      data: zoomList,
      fill: true,
      showLine: false,
      pointRadius: 0,
      backgroundColor: 'rgba(0, 100, 0,0.5)',
     


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
    tooltips: {
      callbacks: {
          label: function (tooltipItem, data) {
              return Number(tooltipItem.yLabel).toFixed(2);
          }
      }
  },
            scales: {
              y: {
                display:false,
              },

              x:{
                display:true,
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 55,
              
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