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

const AFEData = [];

  for(let i = 0;i<15;i++){
    AFEData.push({x : Math.floor(Math.random() * (2020 - 1550) + 1550),
      y: 5});
  }


const VolcanoTimeLine = () => {

  const [volcanoes, setVolcanoes] = useState([]);
    
    useEffect(()=>{
        
        axios.get(`/volcanoes/getVolcanoes`)

         .then(response => {
           if(response.data.success){
             setVolcanoes(response.data.volcanoes)
           } else{
             alert("Failed to fetch data")
           }
         })
   
     },[])


const TaalEruptionYear = [2020, 1977, 1976, 1970, 1969, 1968, 1967, 1966, 1965, 1911, 1904, 1903, 1885, 1878, 1874, 1873, 1842, 1825, 1808, 1790, 1754, 1749, 1731, 1729, 1716, 1715, 1709, 1707, 1645, 1641, 1635, 1634, 1609, 1591, 1572];
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

const [taalData,setTaalData] = useState(TaalData);

const PassTaalData = () =>{
  return taalData;
}

const PassEndYear = () => {
  return EndYearData;
}

const [list,setList] = useState(['9','10']);
const [gData,setgData] = useState([]);


  const onGetData = (yD,yU) =>{
    let list = [];
    for(let i = Math.floor(yD);i<=Math.floor(yU);i++){
      list.push(i);
    }

    setList([...list]);
  }


  const onUp = (begin,end,yD,yU) => {
    var l = [];
    let g = end - begin;

    let YU = Math.floor(yU);
    let YD = Math.floor(yD);

    if(YU > YD){
      for(let i = YD;i<YU;i++){
        for(let j = begin;j<=12;j++){
          if(j === 1){
            l.push(YD);
            continue;
          }
          else{
          l.push(j);
          }
        }
        begin = 1;
        YD+=1;
      }

      for(let i = begin;i <= end;i++){
        if(i === 1){
          l.push(YD);
          continue;
        }
        l.push(i);
      }

    }
    else{
      
        for(let i = begin;i<=end;i++){
            l.push(i);
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
    onPassData = {onGetData}
    onGetTaalData = {PassTaalData}
    onGetTaalEruptionEndYear = {PassEndYear}
    onGetDummyAFEData = {getDummyData}
  />;

  let DecadeTL = <TimeLine 
  onPassData = {onUp}
  onGetTaalData = {PassTaalData}
  onGetDummyAFEData = {getDummyData}
/>;

  const [EruptionOption,setEruptionOption] = useState(OverviewTL);
  
const ChangeGraph = (choice) => {
  if(choice === 'overview'){
    setEruptionOption(<OverviewTimeLine 
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
                    <h1>Name: Taal</h1>
                    <h1>ID Number: 2</h1>
                    <h1>Latest Eruption: 2020</h1>
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
  onGetTaalData = {PassTaalData}
  onGetTaalEruptionEndYear = {PassEndYear}
  onGetAFEData = {getDummyData}
  />
            </div>
        </div>
    );
}

export default VolcanoTimeLine;
