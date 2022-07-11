import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  IconButton,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './CatalogPage.styles';
import { useHistory } from 'react-router-dom';
import VolcanoCard from './VolcanoCard/volcanoCard';
import Tags from './Tags/Tags.js';
import LoadingCard from './VolcanoCard/loadingCard';
import stringSimilarity from 'string-similarity'
const originalTags=['Volcano Name','Basic Component','Crystal Type','Juvenile Type','Altered Material Type','Crystallinity and Color','Aleration Degree','Shape']
function CatalogPage() {
  const classes = useStyles();
  const history = useHistory();
  const [tags,setTags] = useState(originalTags)
  const [selectedTags,setSelectedTags] = useState([]);
  const [fetchedData, setFetchedData] = useState({})
  const [particles,setParticles] = useState([]);
  const [volcanoes,setVolcanoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSubmit, setSearchSubmit] = useState();
  const [filterSubmit, setFilterSubmit] = useState([]);
  const [searchData, setSearchData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const getSearchResult = (submit, selectedTags) => {
    setIsLoading(true)
    setSuggest(false)
    let dataList  = {} 
    if (submit !== "" || selectedTags.length!==0) {
      var filter=[]
      if(selectedTags){
        for (var i =0; i<selectedTags.length;i++){
          filter.push(selectedTags[i].toLowerCase());
        }
      }
      if(submit){
        if(!filter.includes(submit.toLowerCase())) filter.push(submit.toLowerCase())
      }
      Object.keys(fetchedData).map(key => {
        const data = fetchedData[key].filter(d=>{
          var props_arr = Object.values(d).map(ele=> typeof(ele)==="string"?ele.toLowerCase():null)      
          return(filter.every(elem => props_arr.includes(elem)))
        })
        dataList[key]=data;
      })
      setSearchData(dataList);
    }
    setTimeout(()=>{setIsLoading(false)},1000)
    return dataList
  };
  const t = require("./Tags/Tags.json")
  let keyword =[]
  Object.keys(t).map((taglabel)=>{
    if(taglabel!=="volcanoName"){
      t[taglabel].choices.map((ele,index)=> index!==0?keyword.push(ele):null)
    }
  })
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
  setTimeout(()=>{setIsLoading(false)},1000)
  },[])
  const [keyWordList, setKeyWordList] = useState()
  useEffect(()=>{
    setFetchedData({
      Volcanoes: volcanoes,
      Particles: particles
    })
    console.log(volcanoes)
    let chosen = ["volc_name","volc_num"]
    particles.map(volc=>{
      Object.keys(volc).map(attr=>{
        if(chosen.includes(attr)){
          if(!keyword.includes(volc[attr])){
            keyword.push(volc[attr])
          }
        }
      })
    })
    console.log(keyword)
    setKeyWordList(keyword)
  },[volcanoes,particles])

  const handleKeyPress =(event)=>{
    if(event.key === 'Enter'){
      document.getElementById('search-button').click();
    }
  }
  const [suggestSearch, setSuggestSearch] = useState()
  const [suggest,setSuggest] = useState(false)
  const handleSubmit = (submit) =>{
    setSearchSubmit(submit)
    setFilterSubmit(submit && selectedTags.length!=0?submit+", "+selectedTags.join(","):submit + selectedTags.join(","))
    if (submit !==""){
      let max = 0
      let maxWord = ""
      keyWordList.map(word=>{
        let lowCase 
        if(isNaN(word)){
          lowCase = word.toLowerCase()
        }else{
          lowCase = word.toString()
        }
        let similarity = stringSimilarity.compareTwoStrings(submit,lowCase)
        if (similarity>max) {
          max = similarity
          maxWord = word
        }
      })
      if(max==1){
        getSearchResult(submit,selectedTags)
      }else if(max>0.3 && max<1){
        setSuggestSearch(maxWord)
        setSuggest(true)
        setSearchData({})
      }else{
        setSuggest(false)
        getSearchResult()
        setSearchData({})
      }
    }else if(selectedTags){
      getSearchResult(submit, selectedTags)
    }
  }

  let loadingCards=[1,2,3,4,5]
  let count = 0
  useEffect(()=>{
    console.log(filterSubmit)
  },[filterSubmit])
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
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search by Volcano Name, Particle Type or use our Tags"
        onKeyDown={handleKeyPress}
      ></input>
      <IconButton
        type='submit'
        id = 'search-button'
        className={classes.iconButton}
        aria-label='search'
        onClick={()=>handleSubmit(searchTerm.toLowerCase())}
      >
        <SearchIcon fontSize="large"/>
      </IconButton>
      </div>
      <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
        <Tags
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}   
          tags={tags}
          setTags={setTags}
        />
        <Button variant='contained' style={{backgroundColor:"#388e3c", fontWeight:700, fontSize:12, height:40, marginTop:15, marginLeft:100, borderRadius:"20px", color:"white"}} onClick={()=>handleSubmit(searchTerm.toLowerCase())}> Apply Filters</Button>
      </div>
      {filterSubmit.length!=0 && !isLoading?(
        <Typography style={{ marginLeft: 25, paddingBottom: 20 }}>
          {(searchData.Volcanoes && searchData.Volcanoes.length!=0) || (searchData.Particles && searchData.Particles.length!=0)? (
              <Typography
                component='h3'
                variant='h5'
                align='center'
                style={{ marginBottom: 10 }}
              >
                Search results for "{filterSubmit}"
              </Typography>
          ) : suggest?(
            <Typography
                component='h3'
                variant='h5'
                align='center'
                style={{ marginBottom: 10 }}
              >
                Sorry! There is no result for "{searchSubmit}" in our database.
                <br/>
                Did you mean <span style={{textDecoration:"underline",color:"#1890ff",cursor:"pointer"}} onClick={function(){getSearchResult(suggestSearch.toLowerCase(),selectedTags);setSearchTerm(suggestSearch);setSearchSubmit(suggestSearch);setFilterSubmit(suggestSearch && selectedTags.length!=0?suggestSearch+", "+selectedTags.join(","):suggestSearch + selectedTags.join(","))}}> {suggestSearch}</span>?
              </Typography>
          ):(
              <Typography
              component='h3'
              variant='h5'
              align='center'
              style={{ marginBottom: 10 }}
            >
              Sorry! There is no result for "{filterSubmit}" in our database.
              <br/>
              <a href="/contribute/binocular" style={{textDecoration:"underline"}}>Help us expand our Database!</a>
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
    
      {isLoading?<div>
        <h2 style={{fontWeight:700,fontSize:"1.8rem", marginBottom:"20px"}}>VOLCANO </h2>
        <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
          <LoadingCard/>
        </div>
        <hr
        style={{
          alignSelf:"center",
          marginTop: 50,
          marginBottom:50,
          marginLeft: "40%",
          marginRight:"25%",
          width: "20%",
          border: "1px solid #C0C0C0"
          
        }}/>
        <h2 style={{fontWeight:700,fontSize:"1.8rem", marginBottom:"20px"}}>PARTICLE </h2>
        <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
          {loadingCards.map(num=> <LoadingCard/>)}
        </div>
      </div>:filterSubmit.length!=0?
        (searchData && Object.keys(searchData).map((key)=>
            key=="Volcanoes"?(searchData[key].length !=0?
            <div>
              <h2 style={{fontWeight:700,fontSize:"1.8rem", marginBottom:"20px"}}>VOLCANO </h2>
              <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
                {searchData[key].map((ele)=>
                <VolcanoCard
                  info={ele}
                  type={key}
                />)}
                <hr
                style={{
                  alignSelf:"center",
                  marginTop: 50,
                  marginBottom:50,
                  marginLeft: "40%",
                  marginRight:"25%",
                  width: "20%",
                  border: "1px solid #C0C0C0"
                  
                }}/>
              </div>
            </div>:null):(
            searchData[key].length!=0?
            <div>
            <h2 style={{fontWeight:700,fontSize:"1.8rem", marginBottom:"20px"}}>PARTICLE </h2>
            <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
              {searchData[key].map((ele)=>
              <VolcanoCard
                info={ele}
                type= "Particles"
              />)}
            </div></div>:null)
            
        ))
          :(fetchedData && Object.keys(fetchedData).map((key)=>
          key=="Volcanoes"?(fetchedData[key].length !=0?(
            <div>
            <h2 style={{fontWeight:700,fontSize:"1.8rem", marginBottom:"20px"}}>VOLCANO </h2>
            <VolcanoCard
              info={fetchedData[key][0]}
              type={key}
            />
            <hr
                style={{
                  alignSelf:"center",
                  marginTop: 50,
                  marginBottom:50,
                  marginLeft: "40%",
                  marginRight:"25%",
                  width: "20%",
                  border: "1px solid #C0C0C0"
                  
                }}/>
            </div>):null):(
            <div>
            <h2 style={{fontWeight:700,fontSize:"1.8rem", marginBottom:"20px"}}>PARTICLE </h2>
            <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap"}}>
            {fetchedData[key].map((ele)=>
            ele.volc_num==273083 && count<10 ? 
            <VolcanoCard
              info={ele}
              type={key}
            > {count+=1} </VolcanoCard>:null)}
            </div></div>)
                
            )) }
      </div>
    </div>
  );
}
export default CatalogPage;
