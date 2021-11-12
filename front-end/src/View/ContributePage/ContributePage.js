import React, { useState,useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from './FileUpload.js'
import axios from 'axios';
import Table from './Table'
const { Title } = Typography;

const gsValue = [0,1,2,3,4];
const pTypes  = ["Pyroxene","Plagioclase","Other minerals","Altered material","Glassy"];
const gTypes = ["Juvenile","Non-juvenile"];
const crystallinity = ["Low Transparent","Low Black", "Mid", "High"];
const alterations = ["None", "Slight", "Moderate"];
const shapes = ["Blocky", "Fluidal", "Microtubular","Highly vesicular","Spongy"]

function ContributePage(props) {
    const [volcName, setVolcName] = useState("");
    const [magnification, setMg] = useState(null);
    const [gsLow,setGsLow] = useState();
    const [gsUp,setGsUp] = useState();
    const [pType,setPType] = useState("");
    const [gType,setGType] = useState("");
    const [crys,setCrys] = useState("");
    const [alteration, setAlt] = useState("");
    const [shape, setShape] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false)
    const [data,setData] = useState([])
    const [Images, setImages] = useState([])

    const onVolcChange = (event)=>{
      setVolcName(event.currentTarget.value)
    } 
    const onMgChange = (event)=>{
      setMg(event.currentTarget.value)
    } 
    const onGsLowChange = (event)=>{
      setGsLow(event.currentTarget.value)
    } 
    const onGsUpChange = (event)=>{
      setGsUp(event.currentTarget.value)
    } 
    const onPTypeChange = (event)=>{
      setPType(event.currentTarget.value)
    } 
    const onGTypeChange = (event)=>{
      setGType(event.currentTarget.value)
    } 
    const onCrysChange = (event)=>{
      setCrys(event.currentTarget.value)
    } 
    const onAltChange = (event)=>{
      setAlt(event.currentTarget.value)
    } 
    const onShapeChange = (event)=>{
      setShape(event.currentTarget.value)
    } 
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const handleClick = ()=>{
        setButtonClicked(true)
        let newData = []
        for(var i =0;i<Images.length;i++){
            const particle={
                volc_name: volcName,
              mag: magnification,
              gsLow: gsLow,
              gsUp: gsUp,
              pType: pType,
              gType: gType,
              crys: crys,
              alteration: alteration,
              shape: shape,
              image_path:Images[i]
            }
            newData.push(particle)

        }
        setData(newData)
    }
    const onSubmit = (event) => {
        event.preventDefault();

        if (!volcName || !magnification || !gsLow ||
            !gsUp  ) {
            return alert('Fill all the compulsory fields first!')
        }
        
        if(gsLow > gsUp) {
            return alert('Grain size lower bound cannot be higher than upper bound')
        }
        var failed=false;
        for(var i =0;i<data.length;i++){
          const particle ={
            id: i+1,
            index: 1,
            instrument:"b",
            imgURL:data[i].image_path,
            particleType: data[i].pType, 
            glassyType: data[i].gType,
            crystallinity:data[i].crys, 
            alteration: data[i].alteration, 
            shape:data[i].shape,
            volc_id: 1,
            volc_name: data[i].volc_name,
            afe_id: 1,
            gen_id: 1,
            microscope: "",
            software: "",
            device: "",
            magnification: "",
            ligh_intensity: "",
            epis_dias_light: "",
            scale_ref: ""
          }
          console.log(particle)
           axios.post("/volcanoes/particles/add", particle)
              .catch(err=>console.log(err),failed=true)
          const image={
              imageURL:`${data[i].image_path}`,
              gsLow:data[i].gsLow,
              gsUp: data[i].gsUp,
              magnification: data[i].magnification,
              volc_id:1,
              par_id:i
          }
          console.log(image)
           axios.post("/volcanoes/images/add",image)
            .catch(err=>console.log(err),failed=true)

        }
        
        if(!failed) props.history.push('/')
      }

    return (
        <div style={{ maxWidth:"80%",margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Help us expand our Database!</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Volcano Name</label>
                <Input
                    onChange={onVolcChange}
                    value={volcName}
                />
                <br />
                <br />
                <label>Magnification</label>
                <Input
                    placeholder="Enter the magnification value in number only (E.g. 1.4 instead of 1.4x)"
                    onChange={onMgChange}
                    value={magnification}
                    type= "number"
                />
                <br /><br />
                <label>Grain Size:</label>
                <label>Lower Bound(Φ)</label>
                <select onChange={onGsLowChange} value={gsLow}>
                    {gsValue.map(item => (
                        <option value={item}>{item} </option>
                    ))}
                </select>
                <br /><br />
                <label>Upper Bound(Φ)</label>
                <select onChange={onGsUpChange} value={gsUp}>
                    {gsValue.map(item => (
                        <option value={item}>{item} </option>
                    ))}
                </select>
                <br /><br />
                <h4> Tell us more about your data (Optional)</h4>
                <label>Particle Type</label>
                <select onChange={onPTypeChange} value={pType}>
                    {pTypes.map(item => (
                        <option value={item}>{item} </option>
                    ))}
                </select>
                <br /><br />
                <label>Glassy Type</label>
                <select onChange={onGTypeChange} value={gType}>
                    {gTypes.map(item => (
                        <option value={item}>{item} </option>
                    ))}
                </select>
                <br /><br />
                <label>Crystallinity</label>
                <select onChange={onCrysChange} value={crys}>
                    {crystallinity.map(item => (
                        <option value={item}>{item} </option>
                    ))}
                </select>
                <br /><br />
                <label>Alteration</label>
                <select onChange={onAltChange} value={alteration}>
                    {alterations.map(item => (
                        <option value={item}>{item} </option>
                    ))}
                </select>
                <br /><br />
                <label>Shape</label>
                <select onChange={onShapeChange} value={shape} style={{marginBottom:"10px"}}>
                    {shapes.map(item => (
                        <option value={item}>{item} </option>
                    ))}
                </select>
                <br /><br />
                <Button
                    onClick={()=>{handleClick()}}
                    style={{marginBottom:"10px"}}
                >
                    Show in Table
                </Button>
                <br/>
                {buttonClicked?<div>
                    <Table data={data} setData={setData}/>
                    <br/>
                    <Button
                    onClick={onSubmit}
                    >
                     Submit
                    </Button>
                    </div>:null}
                

            </Form>

        </div>
    )
}

export default ContributePage