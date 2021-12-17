import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  IconButton,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './CatalogPage.styles';
import { useHistory } from 'react-router-dom';
import VolcanoCard from '../../components/VolcanoCard/volcanoCard';
import Tags from '../../components/Tags/Tags.js';
const originalTags=['Volcano Name','Silica Content','TAS','Eruptive Style','Particle Type','Glassy Type','Crystallinity','Aleration','Shape']
function CatalogPage() {
  const classes = useStyles();
  const history = useHistory();
  const [tags,setTags] = useState(originalTags)
  const [selectedTags,setSelectedTags] = useState([]);
  const [fetchedData, setFetchedData] = useState({})
  const [searchFilter,setSearchFilter] = useState("")
  const [particles,setParticles] = useState([]);
  const [volcanoes,setVolcanoes] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState({});
  const [searchSubmit,setSearchSubmit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
    const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearched(true)
    var submit = searchTerm.toLowerCase();
    setSearchSubmit(submit);
    setIsLoading(true)
    if (submit !== "" || selectedTags.length!==0) {
      const dataList  = {} 
      var filter=[]
      for (var i =0; i<selectedTags.length;i++){
        filter.push(selectedTags[i].toLowerCase());
      }
      var i;
      for(i=0;i<filter.length;i++){
        if(filter[i].includes(submit)) break;
      }
      if(i==filter.length) filter.push(submit)
      var newSearchfilter = [...filter]
      for(var i=0;i<newSearchfilter.length;i++) if(newSearchfilter[i]) newSearchfilter[i]=newSearchfilter[i][0].toUpperCase()+newSearchfilter[i].slice(1);
      selectedTags.length?setSearchFilter(newSearchfilter.join(', ')):setSearchFilter(submit[0].toUpperCase()+submit.slice(1)) 
      Object.keys(fetchedData).map(key => {
        const data = fetchedData[key].filter(d=>{
          var props_arr = Object.values(d)
            .join(" ")
            .toLowerCase()
            .split(" ")
          return(filter.every(elem => props_arr.includes(elem)))
        })
        dataList[key]=data;
      })
      setSearchData(dataList);
    }
    setIsLoading(false)
  };
  useEffect(()=>{
     axios.get("/volcanoes/getVolcanoes2")
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

  },[])
  useEffect(()=>{
    setFetchedData({
      Volcanoes: volcanoes,
      Particles: particles
    })
  },[particles])
    const handleKeyPress =(event)=>{
    if(event.key === 'Enter'){
      document.getElementById('search-button').click();
    }
  }
  const Loading = () =>{
    if(isLoading){
      return <img style={{display:"block",marginLeft:"auto",marginRight:"auto"}} src="https://cutewallpaper.org/21/loading-gif-transparent-background/All-Loading-Gif-Image-Transparent-Background-Best-Studio-.gif"/>
    }
    return null;
  }
  return (
    <div className={classes.SearchContainer}>
      <Typography
        className={classes.SearchTitle}
      >
        Explore our DataBase
      </Typography>
      <div className={classes.SearchBoxContainer}>
      <input
        className={classes.SearchBox}
        onChange={handleChange}
        placeholder="Search by Volcano Name, Particle Type or use our Tags"
        onKeyDown={handleKeyPress}
      ></input>
      <IconButton
        type='submit'
        id = 'search-button'
        className={classes.iconButton}
        aria-label='search'
        onClick={(e)=>handleSubmit(e)}
      >
        <SearchIcon fontSize="large"/>
      </IconButton>
      </div>
      <Tags
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        tags={tags}
        setTags={setTags}
      />
      {searched?(
        <Typography style={{ marginLeft: 25, paddingBottom: 20 }}>
          {(searchData.Volcanoes && searchData.Volcanoes.length!=0) || (searchData.Particles && searchData.Particles.length!=0)? (
              <Typography
                component='h3'
                variant='h5'
                align='center'
                style={{ marginBottom: 10 }}
              >
                Search results for "{searchFilter}":
              </Typography>
          ) : (
            <Typography
                component='h3'
                variant='h5'
                align='center'
                style={{ marginBottom: 10 }}
              >
                Sorry! There is no result for "{searchFilter}" in our database.
                <br/>
                <a href="/contribute" style={{textDecoration:"underline"}}>Help us expand our DataBase!</a>
              </Typography>
          )}
        
        </Typography>
      ):null}
      <hr
        style={{
          marginLeft: 25,
          marginRight: 25,
          width: "50%",
          border: "1px solid #C0C0C0"
          
        }}/>
      <div className={classes.ResultContainer}>
        <Loading/>
      {searched?
        (searchData && Object.keys(searchData).map((key)=>
            key=="Volcanoes"?(searchData[key].length !=0?
            <div>
            <h2 style={{fontWeight:700, fontSize: "30px", marginBottom:"10px"}}>Volcano: </h2>
            <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
            {searchData[key].map((ele)=>
            <VolcanoCard
              info={ele}
              type={key}
            />)}
            </div></div>:null):(
            searchData[key].length!=0?
            <div>
            <h2 style={{fontWeight:700, fontSize: "30px", marginBottom:"10px"}}>Particle: </h2>
            <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
            {searchData[key].map((ele)=>
            <VolcanoCard
              info={ele}
              type={key}
            />)}
            </div></div>:null)
            
        ))
          :(fetchedData && Object.keys(fetchedData).map((key)=>
          key=="Volcanoes"?(fetchedData[key].length !=0?(
            <div>
            <h2 style={{fontWeight:700, fontSize: "30px", marginBottom:"10px"}}>Volcano: </h2>
            <VolcanoCard
              info={fetchedData[key][1]}
              type={key}
            />
            </div>):null):(
            <div>
            <h2 style={{fontWeight:700, fontSize: "30px", marginBottom:"10px"}}>Particle: </h2>
            <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
            {fetchedData[key].map((ele)=>
            ele.volc_id==2?
            <VolcanoCard
              info={ele}
              type={key}
            />:null)}
            </div></div>)
          
      ))}
      </div>
    </div>
  );
}
export default CatalogPage;
