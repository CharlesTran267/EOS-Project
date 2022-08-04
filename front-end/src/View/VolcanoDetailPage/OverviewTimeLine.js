import React from 'react';
import { Line } from 'react-chartjs-2';
import DragBox from './DragBox';
import { useState,useEffect } from 'react';

let c = 0

const axios = require('axios')
const OverviewTimeLine = (props) =>{
  const [eruptions,setEruptions] = useState([])
  const [volcanoes,setVolcanoes] = useState([])
  const [AFE,setAFE] = useState([])


  useEffect(() =>{
    axios.get('/volcanoes/getAFE')
    .then(data =>{
      setAFE(data.data.afes)
      console.log(data.data.afes)
    })


		axios.get('/volcanoes/getEruptions')
		.then(data =>{
      setEruptions(data.data['eruptions'])
			console.log(data.data['eruptions'])
		})
	  axios.get(`/volcanoes/getVolcanoes`)

         .then(response => {
           if(response.data.success){
             console.log(response.data.volcanoes)
             console.log('work')
             setVolcanoes(response.data.volcanoes)
           } else{
             alert("Failed to fetch data")
           }
         })	
         
	},[])
  let Vol = [];
  let TaalEruptionYear = [];
const TaalData = [];



var pathArray = window.location.pathname.split('/');
let vol = props.onPassVolcName();

let volc_num = 0;
for (let i=0;i<volcanoes.length;i++){
  if(volcanoes[i]['volc_name'] === vol ){
    volc_num = volcanoes[i]['volc_num'];
    break;
  }
}



for(let i=0;i<eruptions.length;i++){
  if(eruptions[i]['volc_name'] === vol && eruptions[i]['ed_stime'] && eruptions[i]['ed_etime'] ){
  let s = eruptions[i]['ed_stime'].substr(0,4) + '.' + eruptions[i]['ed_stime'].substr(5,7);
  let e = eruptions[i]['ed_etime'].substr(0,4) + '.' + eruptions[i]['ed_etime'].substr(5,7);

    if(parseFloat(s) !== parseFloat(e)){
    Vol.push({s:parseFloat(s),e:parseFloat(e)})
    }
    else{
      Vol.push({s:parseFloat(s),e:parseFloat(e)+1})
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



for(let i=0;i<TaalEruptionYear.length;i++){
  let s = {
    x: TaalEruptionYear[i],
    y: 10
  }
  TaalData.push(s);
  let e = {
    x: VolEndYear[i],
    y:10
  } 
  TaalData.push(e)

}



  let list = [];
	for(let i = 1910;i<=2023;i++){
		for(let j = 0.01;j<=0.12;j+=0.01){
      if(j===0.01){
        list.push(i)
      }
      else
        list.push(i+j);
    }
	}

  const [lb,setLB] = useState(list);

  const [yearDown,setYearDown] = useState(0);
  const [yearUp,setYearUp] = useState(0);
  const [w,setW] = useState(window.innerWidth);
  const [EruptionLabel,setEruptionLabel] = useState([...list]);

  let TaalEndYear = props.onGetTaalEruptionEndYear();
  // let AFEDummyData = props.onGetDummyAFEData();
  let AFEDummyData = []

 
  for(let i =0;i<AFE.length;i++){
    if(AFE[i]['volc_num'] === volc_num){
    let s = AFE[i]['afe_date'].substr(0,4) + '.' + AFE[i]['afe_date'].substr(5,7);
    AFEDummyData.push({x:parseFloat(s),y:5});
    }
  
}

  console.log(AFEDummyData)

  let fillList = TaalData;

  console.log(TaalEruptionYear)
  console.log(fillList)

	fillList.sort((a,b) => a.x > b.x && 1 || -1 )

  let zoomList = [];
 
  if(fillList.length >0 && c ===0){
  zoomList.push({x:fillList[0].x,
                  y:0}
    )
	for(let i=0;i<fillList.length;i++){
    
    zoomList.push(fillList[i])
		if(i>=1&& i<fillList.length -1 && i%2 ===1){
      zoomList.push({
        x:fillList[i].x,
        y:0
      })

      zoomList.push({
        x:fillList[i+1].x,
        y:0
      })
    }
	}

zoomList.push({
  x:fillList[fillList.length-1].x,
  y:0
})


  }

  console.log(zoomList);


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
   
    setYearDown(2*(posX-20)/24.25 + EruptionLabel[0] );
    
    console.log(posX);
      
  }

  const MouseUp = () =>{
    var e = window.event;
    var w = window.innerWidth;
    var posX = e.clientX;
    let x = Math.floor((posX-19)/19)
    setYearUp(2*(posX-20)/24.25 + EruptionLabel[0] );
    var yU = 2*(posX - 20)/(24.25) + EruptionLabel[0];
    var m = Math.floor((yU-Math.floor(yU)) /0.1) + 1 ;
   
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
    pointStyle: 'rectRot',
    pointRadius: 5,
    borderColor: 'rgba(0,0,0,1)',
    borderWidth: 2,
    data: AFEDummyData,
    showLine: false,
    pointRadius: 5,
  }
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
                  maxTicksLimit: 58,
              
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

  for(let i =0;i<zoomList.length;i++){
    if(zoomList[i].x === 1911.11){
      alert('hhhhhh')
    }
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