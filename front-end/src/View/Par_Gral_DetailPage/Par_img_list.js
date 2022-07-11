import React from 'react';
import './DisplayPage.css'
import {useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import VolcanoCard from '../CatalogPage/VolcanoCard/volcanoCard';
	

const ParList = (props) =>{
	
    const [volcanoes, setVolcanoes] = useState([]);
    const [particles, setParticles] = useState([]);
    const [fetchedData, setFetchedData] = useState({})
    const [generals, setGenerals] = useState([]);

    useEffect(()=>{
        
        axios.get(`/volcanoes/getVolcanoes`)
         .then(response => {
           if(response.data.success){
             setVolcanoes(response.data.volcanoes)
           } else{
             alert("Failed to fetch data")
           }
         })
        axios.get("/volcanoes/getParticles")
       .then(response => {
         if(response.data.success){
           setParticles(response.data.particles)
         } else{
           alert("Failed to fetch data")
         }
       })

       axios.get("/volcanoes/getGenerals")
       .then(res => {
        if(res.data.success){
            setGenerals(res.data.generals)
          } else{
            alert("Failed to fetch data")
          }
       })
   
     },[])



     useEffect(()=>{
        setFetchedData({
          Particles: particles,
          Generals: generals
        })
      },[particles])

      console.log(fetchedData['Particles'])

      let splitted = window.location.href.split('/');
      console.log(splitted)
      let volc_name = splitted[5]
     

	return(
		<div class = 'myList' >
		
			{(fetchedData && Object.keys(fetchedData).map((key)=>
          key=="Particles"?(fetchedData[key].length !=0?(
            <div>
            
            <div class = 'imageList' >
			    <h1>Particle Imgage</h1>
		    </div>

		    <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
            {fetchedData[key].map((e) =>
	    e.volc_name==volc_name?
	     <VolcanoCard
              info={e}
              type={key}
            />:null
	    )}
            </div>

            </div>):null):(
            <div>
            <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
            {fetchedData[key].map((ele)=>
            ele.volc_name==volc_name?
            <VolcanoCard
              info={ele}
              type={key}
            />:null)}
            </div></div>)
          
      ))}
		</div>
	);
}

export default ParList;


