import './DisplayPage.css';
import { useState } from 'react'
import ParList from './Par_img_list';import GralList from './Gral_img_list';
import MenuDropDown from './MenuDropDown';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function DpPage(props) {

  const history = useHistory();


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
  
  let volImg = volcanoes[1];


  const [listOfImage,setListOfImage] = useState(<GralList />);

  return (
    <div className="App">
      <div class = 'picAndName'>

        <div class = 'name'> 
          <h1> Volcano Name : Taal</h1>
          <h1> Volcano ID :  </h1>
        </div>

        <div onClick = {routeChange} class = 'pic1' >
          { volcanoes[1] && ( <img src= {`/${volImg.imgURL}`} />)}
        </div>


          
      </div>
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
