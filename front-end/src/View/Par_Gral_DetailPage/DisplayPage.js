import './DisplayPage.css';
import { useState } from 'react'
import ParList from './Par_img_list';import GralList from './Gral_img_list';
import MenuDropDown from './MenuDropDown';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import OverviewTimeLine from '../VolcanoDetailPage/OverviewTimeLine';

const AFEData = [];

  for(let i = 0;i<15;i++){
    AFEData.push({x : Math.floor(Math.random() * (2020 - 1550) + 1550),
      y: 5});
  }


function DpPage(props) {

  const history = useHistory();


  const [volcanoes, setVolcanoes] = useState([]);
  const [particles, setParticles] = useState([])
  const [list,setList] = useState(['9','10']);
    
    useEffect(()=>{
        
        axios.get(`/volcanoes/getParticles`)

         .then(response => {
           if(response.data.success){
             console.log(response.data['particles'])
             setParticles(response.data['particles'])
            
           } else{
             alert("Failed to fetch data")
           }
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



     let splitted = window.location.href.split('/');
      let volc_name = splitted[5]
     let volc_num = 0
      for(let i=0;i<volcanoes.length;i++){
        if(volcanoes[i].volc_name = volc_name){
            volc_num = volcanoes[i].volc_num
        }
      }
      


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


  const PassEndYear = () => {
      return EndYearData;
    }

    const getDummyData = () =>{
      return AFEData;
    }
  
    const PassTaalData = () =>{
      return TaalData;
    }

    const onGetData = (yD,yU) =>{
      let list = [];
      for(let i = Math.floor(yD);i<=Math.floor(yU);i++){
        list.push(i);
      }
  
      setList([...list]);
    }

  
    

  const HandleChange = (choice) =>{
    if(choice === 'gral'){
      setListOfImage(<GralList  />);
    }
    else if( choice === 'par'){
      setListOfImage(<ParList />);
    }
  }

  const routeChange = () => {
    let path = `/volcano/2`;
    history.push(path);
  }
  
  let volImg = particles[1];


  const [listOfImage,setListOfImage] = useState(<GralList />);

  return (
    <div className="App">
      <div class = 'picAndName'>

        <div class = 'name'> 
          <h1> Volcano Name : {volc_name}</h1>
          <h1> Volcano Number : {volc_num} </h1>
        </div>

        <div onClick = {routeChange} class = 'pic1' >
          { particles[1] && ( <img src= {`/${volImg.imgURL}`} />)}
        </div>
          
      </div>
      <OverviewTimeLine
      onPassVolcName ={() =>{return volc_name}}
       onPassData = {onGetData}
       onGetTaalData = {PassTaalData}
       onGetTaalEruptionEndYear = {PassEndYear}
       onGetDummyAFEData = {getDummyData}
      />
      <div>
          <MenuDropDown
          onChange = {HandleChange}
          />
      </div>
      <div class = "imageList">
          {listOfImage}
      </div>
    </div>
  );
}

export default DpPage;
