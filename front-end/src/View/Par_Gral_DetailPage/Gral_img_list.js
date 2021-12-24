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


	return(
		<div class = 'myList' >
			<h1>General Imgage</h1>
			{(fetchedData && Object.keys(fetchedData).map((key)=>
          key=="Generals"?(fetchedData[key].length !=0?(

            <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
            {fetchedData[key].map((e) =>
	    e.volc_num==2?
	     <VolcanoCard
              info={e}
              type={key}
            />:null
	    )}
            </div>
	    
	    ):null):
            null
      ))}


{(fetchedData && Object.keys(fetchedData).map((key)=>
          key=="Generals"?(fetchedData[key].length !=0?(
            <div>
            </div>):null):(
            <div>

<div class = 'imageList' >
			    <h1>Particle Imgage</h1>
		    </div>
            <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
		
            {fetchedData[key].map((ele)=>
            ele.volc_num==2?
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

