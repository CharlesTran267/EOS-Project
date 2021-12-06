import React, { useState,useEffect } from 'react'
import FileUpload from './FileUpload.js'
import axios from 'axios';
import Table from './Table'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import { contributeStyle } from './ContributePage.style.tsx';
import MenuItem from '@mui/material/MenuItem';
const { Title } = Typography;

const gsValue = [0,1,2,3,4];
const pTypes  = ["Pyroxene","Plagioclase","Other minerals","Altered material","Glassy"];
const gTypes = ["Juvenile","Non-juvenile"];
const crystallinity = ["Low Transparent","Low Black", "Mid", "High"];
const alterations = ["None", "Slight", "Moderate"];
const shapes = ["Blocky", "Fluidal", "Microtubular","Highly vesicular","Spongy"]
const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

function ContributePage(props) {
    const classes = contributeStyle();
    const [volcName, setVolcName] = useState("");
    const [volcValid,setVolcValid] = useState({
        error:true,
        helperText:""
    })
    const [magnification, setMg] = useState(null);
    const [magValid,setMagValid] = useState({
        error:true,
        helperText:""
    })
    const [gsLow,setGsLow] = useState();
    const [gsLowValid,setGsLowValid] = useState({
        error:true,
        helperText:""
    })
    const [gsUp,setGsUp] = useState();
    const [gsUpValid,setGsUpValid] = useState({
        error:true,
        helperText:""
    })
    const [pType,setPType] = useState("");
    const [pValid,setPValid] = useState({
        error:true,
        helperText:""
    })
    const [gType,setGType] = useState('');
    const [gValid,setGValid] = useState({
        error:true,
        helperText:""
    })
    const [crys,setCrys] = useState("");
    const [crysValid,setCrysValid] = useState({
        error:true,
        helperText:""
    })
    const [alteration, setAlt] = useState("");
    const [altValid,setAltValid] = useState({
        error:true,
        helperText:""
    })
    const [shape, setShape] = useState('');
    const [shapeValid,setShapeValid] = useState({
        error:true,
        helperText:""
    })
    const [buttonClicked, setButtonClicked] = useState(false)
    const [data,setData] = useState([])
    const [Images, setImages] = useState([])

    const onVolcChange = (event)=>{
      setVolcName(event.target.value)
    } 
    const onMgChange = (event)=>{
      setMg(event.target.value)
    } 
    const onGsLowChange = (event)=>{
        setGsLow(event.target.value)
    } 
    const onGsUpChange = (event)=>{
      setGsUp(event.target.value)
    } 
    const onPTypeChange = (event)=>{
      setPType(event.target.value)
    } 
    const onGTypeChange = (event)=>{
      setGType(event.target.value)
    } 
    const onCrysChange = (event)=>{
      setCrys(event.target.value)
    } 
    const onAltChange = (event)=>{
      setAlt(event.target.value)
    } 
    const onShapeChange = (event)=>{
      setShape(event.target.value)
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
    const onSubmit = async(event) => {
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
           await axios.post("/volcanoes/particles/add", particle)
              .catch(err=>console.log(err),failed=true)
          const image={
              imageURL:`${data[i].image_path}`,
              gsLow:data[i].gsLow,
              gsUp: data[i].gsUp,
              magnification: data[i].magnification,
              volc_id:1,
              par_id:i
          }
            await axios.post("/volcanoes/images/add",image)
            .catch(err=>console.log(err),failed=true)

        }
        
        if(!failed) props.history.push('/')
      }
    return (
        <div style={{ maxWidth:"80%",margin: '2rem auto' }}>
            <Typography gutterBottom variant="h4" align="center" style={{fontWeight:"600"}} >
        Help Us Expand Our Database!
       </Typography>
      <Grid>
        <Card style={{ maxWidth: "100%", padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>

            <form>
            <div style={{padding: "20px 5px"}}>
                <FileUpload refreshFunction={updateImages}/>
            </div>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField 
                    placeholder="Enter volcano name" 
                    label="Volcano Name" 
                    variant="outlined" 
                    value={volcName}
                    onChange={onVolcChange}
                    fullWidth 
                    required />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField 
                        placeholder="Enter number only (E.g. 1.4 instead of 1.4x)" 
                        label="Magnification" 
                        variant="outlined" 
                        type="number"
                        value={magnification}
                        onChange={onMgChange}
                        fullWidth 
                        required >
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField 
                        label="Grain Size Lower Bound" 
                        variant="outlined" 
                        select
                        value={gsLow}
                        onChange={onGsLowChange}
                        fullWidth 
                        helperText="Please ensure Upper Bound is greater than or equal to Lower Bound"
                        required >
                            {gsValue.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                        </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField 
                        label="Grain Size Upper Bound" 
                        variant="outlined" 
                        select
                        value={gsUp}
                        onChange={onGsUpChange}
                        fullWidth 
                        required >
                            {gsValue.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} >
                    <Typography style={{color:"#7d7d7d"}}> Tell us more about your data:</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label="Particle Type" 
                        variant="outlined" 
                        select
                        value={pType}
                        onChange={onPTypeChange}
                        fullWidth 
                        required >
                            {pTypes.map(item => (
                           <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField 
                        label="Shape" 
                        variant="outlined" 
                        select
                        value={shape}
                        onChange={onShapeChange}
                        fullWidth 
                        optional >
                            {shapes.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField 
                        label="Glassy Type" 
                        variant="outlined" 
                        select
                        value={gType}
                        onChange={onGTypeChange}
                        fullWidth 
                        optional >
                            {gTypes.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField 
                        label="Crystallinity" 
                        variant="outlined" 
                        select
                        value={crys}
                        onChange={onCrysChange}
                        fullWidth 
                        optional >
                            {crystallinity.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField 
                        label="Alteration" 
                        variant="outlined" 
                        select
                        value={alteration}
                        onChange={onAltChange}
                        fullWidth 
                        optional >
                            {alterations.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
              </Grid>
            </form>
            {buttonClicked?<div>
                    <Button
                        className={classes.tableButton}
                        variant="contained" 
                        color="success"
                        onClick={()=>{handleClick()}}
                        style={{marginBottom:"10px"}}
                >
                    Refresh Table
                </Button>
                    <Table data={data} setData={setData}/>
                    </div>:
                    <div>                
                    <Button
                        className={classes.tableButton}
                        variant="contained" 
                        color="success"
                        onClick={()=>{handleClick()}}
                        style={{marginBottom:"10px"}}
                >
                    Show in Table
                </Button></div>}
                        <Button
                            className={classes.submitButton}
                            variant="contained" 
                            onClick={onSubmit}
                            >
                            Submit
                        </Button>

                
          </CardContent>
        </Card>
      </Grid>
            {/* <Form onSubmit={onSubmit} >
                
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
                

            </Form> */}

        </div>
    )
}

export default ContributePage