import { Chip } from "@material-ui/core";
import axios from "axios"
import { useState,useEffect } from "react";
import { Menu,MenuItem,Popover } from "@material-ui/core";
import { useRef } from "react";
const Tags = ({
  selectedTags,
  setSelectedTags,
  tags,
  setTags
}) => {
  const tagsRef=useRef({})
  const selectedTagsRef=useRef({})
  tagsRef.current=tags
  selectedTagsRef.current = selectedTags
  const t = require("./Tags.json")
  const [allTags,setAllTags] = useState(t)
  const handleAdd = (tag,oritag) => {
    setSelectedTags([...selectedTagsRef.current, tag]);
    setTags(tagsRef.current.filter((t) => t != oritag));
  };

  const handleRemove = (tag) => {
    setSelectedTags( selectedTagsRef.current.filter((selected) => selected !== tag ));
   Object.keys(allTags).map(label =>{
     if(allTags[label].choices.includes(tag)){
      setTags([...tagsRef.current,allTags[label].choices[0]]);
         }
   })
  };
  
  const [volcList, setVolcList] = useState([])
  useEffect(()=>{
    axios.get("/volcanoes/getVolcanoes")
    .then(res=>{
      let newVolcList =[]
      res.data.volcanoes.map(volc=> newVolcList.push(volc.volc_name))
      newVolcList.sort()
      setVolcList(newVolcList)
    }).catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    let newAllTags = allTags
    delete newAllTags["volcanoName"]
    newAllTags["volcanoName"] = {
      "id":1,
      "choices": ["Volcano Name",...volcList]
    }
    setAllTags(newAllTags)
  },[volcList])
  const handleOpenMenu = (event, tag)=>{
    var _id =1;
    Object.keys(allTags).map(label =>{
      if(allTags[label].choices[0]==tag){
        _id = allTags[label].id
      }
    })
    for (var i=0;i<8;i++){
      if(popover[i].id == _id){
        var newPopover=[...popover];
        newPopover[i].anchorEl=event.currentTarget;
        setPopover(newPopover);
        break;
      }
    }
  }
  const handleMenuClose = (_id)=>{
    for (var i=0;i<8;i++){
      if(popover[i].id == _id){
        var newPopover=[...popover];
        newPopover[i].anchorEl=null;
        setPopover(newPopover);
        break;
      }
    }
  }
  function Popover1() {
    return (
      Object.keys(allTags).map((taglabel)=>
              allTags[taglabel].choices[0]=="Volcano Name"?(
                    allTags[taglabel].choices.map((t)=>(
                      t!=allTags[taglabel].choices[0]?(
                    <MenuItem onClick={() => {
                      handleAdd(t,"Volcano Name");
                      handleMenuClose(allTags[taglabel].id)
                    }}> {t} </MenuItem>):null
                    ))):null)
    );
  }

  function Popover2() {
    return (
      Object.keys(allTags).map((taglabel)=>
              allTags[taglabel].choices[0]=="Basic Component"?(
                    allTags[taglabel].choices.map((t)=>(
                      t!=allTags[taglabel].choices[0]?(
                    <MenuItem onClick={() => {
                      handleAdd(t,"Basic Component");
                      handleMenuClose(allTags[taglabel].id)
                    }}> {t} </MenuItem>):null
                    ))):null)
    );
  }
  function Popover3() {
    return (
      Object.keys(allTags).map((taglabel)=>
              allTags[taglabel].choices[0]=="Crystal Type"?(
                    allTags[taglabel].choices.map((t)=>(
                      t!=allTags[taglabel].choices[0]?(
                    <MenuItem onClick={() => {
                      handleAdd(t,"Crystal Type");
                      handleMenuClose(allTags[taglabel].id)
                    }}> {t} </MenuItem>):null
                    ))):null)
    );
  }
  function Popover4() {
    return (
      Object.keys(allTags).map((taglabel)=>
              allTags[taglabel].choices[0]=="Juvenile Type"?(
                    allTags[taglabel].choices.map((t)=>(
                      t!=allTags[taglabel].choices[0]?(
                    <MenuItem onClick={() => {
                      handleAdd(t,"Juvenile Type");
                      handleMenuClose(allTags[taglabel].id)
                    }}> {t} </MenuItem>):null
                    ))):null)
    );
  }
  function Popover5() {
    return (
      Object.keys(allTags).map((taglabel)=>
              allTags[taglabel].choices[0]=="Altered Material Type"?(
                    allTags[taglabel].choices.map((t)=>(
                      t!=allTags[taglabel].choices[0]?(
                    <MenuItem onClick={() => {
                      handleAdd(t,"Altered Material Type");
                      handleMenuClose(allTags[taglabel].id)
                    }}> {t} </MenuItem>):null
                    ))):null)
    );
  }
  function Popover6() {
    return (
      Object.keys(allTags).map((taglabel)=>
              allTags[taglabel].choices[0]=="Crystallinity and Color"?(
                    allTags[taglabel].choices.map((t)=>(
                      t!=allTags[taglabel].choices[0]?(
                    <MenuItem onClick={() => {
                      handleAdd(t,"Crystallinity and Color");
                      handleMenuClose(allTags[taglabel].id)
                    }}> {t} </MenuItem>):null
                    ))):null)
    );
  }
  function Popover7() {
    return (
      Object.keys(allTags).map((taglabel)=>
              allTags[taglabel].choices[0]=="Aleration Degree"?(
                    allTags[taglabel].choices.map((t)=>(
                      t!=allTags[taglabel].choices[0]?(
                    <MenuItem onClick={() => {
                      handleAdd(t,"Aleration Degree");
                      handleMenuClose(allTags[taglabel].id)
                    }}> {t} </MenuItem>):null
                    ))):null)
    );
  }

  function Popover8() {
    return (
      Object.keys(allTags).map((taglabel)=>
              allTags[taglabel].choices[0]=="Shape"?(
                    allTags[taglabel].choices.map((t)=>(
                      t!=allTags[taglabel].choices[0]?(
                    <MenuItem onClick={() => {
                      handleAdd(t,"Shape");
                      handleMenuClose(allTags[taglabel].id)
                    }}> {t} </MenuItem>):null
                    ))):null)
    );
  }

  const [popover, setPopover] = useState([{
    anchorEl:null,
    child:<Popover1/>,
    id:1
  },{
    anchorEl: null,
    child: <Popover2/>,
    id: 2 
  },{
    anchorEl: null,
    child: <Popover3/>,
    id: 3 
  },{
    anchorEl: null,
    child: <Popover4/>,
    id: 4 
  },{
    anchorEl: null,
    child: <Popover5/>,
    id: 5 
  },{
    anchorEl: null,
    child: <Popover6/>,
    id: 6
  }
  ,{
    anchorEl: null,
    child: <Popover7/>,
    id: 7
  },{
    anchorEl: null,
    child: <Popover8/>,
    id: 8 
  }])
    return (
      <div style={{ padding: "6px 0",display: "flex" }}>
        {selectedTagsRef.current.map((tag) => (
          <Chip
            style={{ margin:10 }}
            label={tag}
            color="primary"
            clickable
            onDelete={() => handleRemove(tag)}
          />
        ))} 
        {tagsRef.current.map((tag) => (
              <Chip 
              aria-controls="menu"
              style={{ margin: 10}}
              label={tag}
              onClick={(event)=>handleOpenMenu(event,tag)}
              clickable
              />))}
        {popover.map(p => 
        <Popover
          id="menu"
          open={Boolean(p.anchorEl)}
          onClose={()=>handleMenuClose(p.id)}
          anchorEl={p.anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          PaperProps={{
            style:{maxHeight:500}
          }}
        >
          {p.child}
        </Popover>)}
      </div>
    );
  };

export default Tags;