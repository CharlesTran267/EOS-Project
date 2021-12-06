import React, { useState,useEffect,useCallback } from 'react'
import FileUpload from './FileUpload.js'
import axios from 'axios';
import Table from './Table'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import { contributeStyle } from './ContributePage.style.tsx';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router';

const gsValue = [0,1,2,3,4];
const pTypes  = ["Pyroxene","Plagioclase","Other minerals","Altered material","Glassy"];
const gTypes = ["Juvenile","Non-juvenile"];
const crystallinity = ["Low Transparent","Low Black", "Mid", "High"];
const alterations = ["None", "Slight", "Moderate"];
const shapes = ["Blocky", "Fluidal", "Microtubular","Highly vesicular","Spongy"]

function ContributePage(props) {
    const history= useHistory();
    const classes = contributeStyle();
    const navigate = useCallback(
      (url) => history.push(url),
      [history]
    );
    const [volcName, setVolcName] = useState("");
    const [volcValid,setVolcValid] = useState({
        error:false,
        helperText:""
    })
    const [magnification, setMg] = useState(null);
    const [magValid,setMagValid] = useState({
        error:false,
        helperText:""
    })
    const [gsLow,setGsLow] = useState();
    const [gsLowValid,setGsLowValid] = useState({
        error:false,
        helperText:""
    })
    const [gsUp,setGsUp] = useState();
    const [gsUpValid,setGsUpValid] = useState({
        error:false,
        helperText:""
    })
    const [pType,setPType] = useState("");
    const [pValid,setPValid] = useState({
        error:false,
        helperText:""
    })
    const [gType,setGType] = useState('');
    const [gValid,setGValid] = useState({
        error:false,
        helperText:""
    })
    const [crys,setCrys] = useState("");
    const [crysValid,setCrysValid] = useState({
        error:false,
        helperText:""
    })
    const [alteration, setAlt] = useState("");
    const [altValid,setAltValid] = useState({
        error:false,
        helperText:""
    })
    const [shape, setShape] = useState('');
    const [shapeValid,setShapeValid] = useState({
        error:false,
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
    const checkValidData = ()=>{
      let valid = true;
      const nullError={
        error:true,
        helperText:"This field cannot be blank"
      }
      const isValid={
        error:false,
        helperText:""
      }
      if(!volcName){setVolcValid(nullError);valid=false}
      else{
        setVolcValid(isValid);
      }
      if(magnification==null){setMagValid(nullError);valid=false}
      else{
        setMagValid(isValid);
      }
      if(gsLow==null){setGsLowValid(nullError);valid=false}
      else{
        setGsLowValid(isValid);
      }
      if(gsUp==null){setGsUpValid(nullError);valid=false}
      else{
        setGsUpValid(isValid);
      }
      if(gsLow!=null && gsUp!=null && gsLow>gsUp){
        setGsLowValid({
          error:true,
          helperText:"Lower Bound cannot not be greater than Lower Bound"
        })
        valid=false}
      return valid;
    }
    const handleClick = ()=>{
        if(checkValidData()){
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
    }
    const [failed,setFailed] = useState(false)
    const onSubmit = async(event) => {
        event.preventDefault();
        if(checkValidData()){
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
                .catch(err=>console.log(err),setFailed(true))
            const image={
                imageURL:data[i].image_path,
                gsLow:data[i].gsLow,
                gsUp: data[i].gsUp,
                magnification: data[i].mag,
                volc_id:1,
                par_id:i
            }
            console.log(image)
            await axios.post("/volcanoes/images/add",image)
              .then(console.log("success"))
              .catch(err=>console.log(err),setFailed(true))

          }
          
          // if(!failed) {navigate('/catalogue')}
          // else{
          //   return alert("Upload failed! Please try again!")
          // }
        }
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
                    error={volcValid.error} 
                    helperText={volcValid.helperText}
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
                        error={magValid.error} 
                        helperText={magValid.helperText}
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
                        error={gsLowValid.error} 
                        helperText={gsLowValid.error?gsLowValid.helperText:"Please ensure Upper Bound is greater than or equal to Lower Bound"}
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
                        error={gsUpValid.error} 
                        helperText={gsUpValid.helperText}
                        fullWidth 
                        required >
                            {gsValue.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} >
                    <Typography style={{color:"#7d7d7d"}}> Tell us more about your data (optional):</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        label="Particle Type" 
                        variant="outlined" 
                        select
                        value={pType}
                        onChange={onPTypeChange}
                        fullWidth 
                        optional >
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
        </div>
    )
}

export default ContributePage