import { Legend, Title } from 'chart.js';
import React from 'react';
import {Chart, Line} from 'react-chartjs-2';
import './DetailPage.css';
import { useState } from 'react';
import TimeLine from './TimeLine';
import AFEtimeGraph from './AFEtimeLine';
import OverviewTimeLine from './OverviewTimeLine';
import MenuDropDown from './MenuDropDown';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';




  var pathArray = window.location.pathname.split('/');
let vol = pathArray[2]


const VolcanoTimeLine = () => {

  const [eruptions,setEruptions] = useState([])
  const [volcanoes, setVolcanoes] = useState([]);
  const [c,setC] = useState(0)
  const [AFE,setAFE] = useState([])

  let AFEData = []
 

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
  // for(let i =0;i<volcanoes.length;i++){
  //   if(parseInt(pathArray[2]) === volcanoes[i].id ){
  //     vol = volcanoes[i].volc_name;
  //     break;
  //   }
  // }
let volc_num = 0
  for(let i=0;i<volcanoes.length;i++){
      if(volcanoes[i].volc_name === vol){
        volc_num = volcanoes[i].volc_num
      }
  }



  for(let i =0;i<AFE.length;i++){
    
      let s = AFE[i]['afe_date'].substr(0,4) + '.' + AFE[i]['afe_date'].substr(5,7);
      AFEData.push({x: parseFloat(s),y:5});
    
  }

  

let TaalEruptionYear = [];
const TaalData = [];


let check = 0;


let EndYearData =[];


if(check === 0){

for(let i=0;i<TaalEruptionYear.length;i++){
  let p = {
    x: TaalEruptionYear[i]+1,
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

check = 1;
}



const PassTaalData = () =>{

  return TaalData;
}

const PassEndYear = () => {
  console.log(EndYearData)
  return EndYearData;
}

const [list,setList] = useState(['9','10']);
const [gData,setgData] = useState([]);


  const onGetData = (yD,yU) =>{
    let list = [];
    console.log(yD)
    for(let i = Math.floor(yD);i<=Math.floor(yU);i++){
      for(let j=0.01;j<=0.12;j+=0.01){
        if(j===0.01){
          list.push(i)
        }
        else{ 
        list.push(i+j);
        }
      }
    }
    setList([...list]);
  }

  console.log(list)


  const onUp = (yD,yU) => {
    var l = [];
    for(let i = Math.floor(yD);i<=Math.floor(yU);i++){
      for(let j=0;j<0.12;j+=0.01){
        l.push(i+j);
        alert(j+i);
        break;
      }
    }
    
    setList([...l]);
  }
 


  const AddLable = () => {
    
    return list;
  }

  const AddGraphData = () => {
    console.log(gData);
    return gData;
  }


const getDummyData = () =>{
    return AFEData;
  }

const redirectPage = () =>{
  
}

  let OverviewTL = <OverviewTimeLine 
  onPassVolcName = {() =>{return vol}}
    onPassData = {onGetData}
    onGetTaalData = {() =>{return TaalData}}
    onGetTaalEruptionEndYear = {PassEndYear}
    onGetDummyAFEData = {getDummyData}
  />;

  let DecadeTL = <TimeLine 
  onPassData = {onUp}
  onGetTaalData = {() => {return TaalData}}
  onGetDummyAFEData = {getDummyData}
/>;

  const [EruptionOption,setEruptionOption] = useState(OverviewTL);
  
const ChangeGraph = (choice) => {
  if(choice === 'overview'){
    setEruptionOption(<OverviewTimeLine 
      onPassVolcName ={() =>{return vol}}
      onPassData = {onGetData}
      onGetTaalData = {PassTaalData}
      onGetTaalEruptionEndYear = {PassEndYear}
      onGetDummyAFEData = {getDummyData}
    />);
  }
  else if(choice === 'decade'){
    setEruptionOption(<TimeLine 
      onPassData = {onUp}
      onGetTaalData = {PassTaalData}
      onGetTaalEruptionEndYear = {PassEndYear}
      onGetDummyAFEData = {getDummyData}
    />);
  }
}
  

    return (
      <div>
            <div className="Row1">
                <div className = "infoDisplay"> 
                    <h1>Name: {vol}</h1>
                    <h1>Volcano Number: {volc_num}</h1>
                    <h1>Latest Eruption: {2022}</h1>
                </div>
                <div className = "giantImage">
                { volcanoes[1] && ( <img src= {`/${volcanoes[1].imgURL}`} />)}
                </div>
            </div>
            <div>
              <div>
                <MenuDropDown onChangeGraph = {ChangeGraph} />
              </div>
                {EruptionOption}
            </div>
            <div >
            <AFEtimeGraph 
  ll = {AddLable}
  dt = {AddGraphData}
  onGetTaalData = {()=>{return TaalData}}
  onGetTaalEruptionEndYear = {PassEndYear}
  onGetAFEData = {getDummyData}
  />
            </div>
        </div>
    );
}

export default VolcanoTimeLine;
