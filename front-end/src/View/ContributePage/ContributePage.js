import React, { useState,useEffect,useCallback } from 'react'
import FileUpload from './FileUpload.js'
import axios from 'axios';
import Table from './Table'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import { contributeStyle } from './ContributePage.style.tsx';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
const gsValue = [0,1,2,3,4];
const pTypes  = ["Pyroxene","Plagioclase","Other minerals","Altered material","Glassy"];
const gTypes = ["Juvenile","Non-juvenile"];
const crystallinity = ["Low Transparent","Low Black", "Mid", "High"];
const alterations = ["None", "Slight", "Moderate"];
const shapes = ["Blocky", "Fluidal", "Microtubular","Highly vesicular","Spongy"]
const multi_focus_values =[
  {key:"True",value:true},
  {key:"False", value:false}
]
function ContributePage(props) {
    const history= useHistory();
    const classes = contributeStyle();
    const navigate = useCallback(
      (url) => history.push(url),
      [history]
    );
    
    const [isLoading, setIsLoading] = useState(false)
    const [volcanoList, setVolcanoList] = useState([])
    useEffect(()=>{
      axios.get("/volcanoes/getVolcanoes")
      .then(response => {
        if(response.data.success){
          let newVolcanoList = []
          response.data.volcanoes.map(volcano=>{
            newVolcanoList.push({
              label: volcano.vd_name,
              id: volcano.vd_num
            })
          })
          setVolcanoList(newVolcanoList)
        } else{
          alert("Failed to fetch data")
        }
      })
    },[])
    const [volcName, setVolcName] = useState("");
    const [volcID,setVolcID] = useState()
    const [volcValid,setVolcValid] = useState({
        error:false,
        helperText:""
    })
    const [afeDate,setAFEDate] = useState(null)
    const [afeValid,setAFEValid] =useState({
      error:false,
      helperText:""
    })
    const [eStartDate, setEStart] = useState({
      date:null,
      helperText:""
    })
    const [eStartValid,setEStartValid] =useState({
      error:false,
      helperText:""
    })
    const [eEndDate, setEEnd] = useState({
      date:null,
      helperText:""
    })
    const [eEndValid,setEEndValid] =useState({
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
    const [gType,setGType] = useState('');
    const [crys,setCrys] = useState("");
    const [alteration, setAlt] = useState("");
    const [shape, setShape] = useState('');
    const [multi_focus, setMulti_focus] = useState()
    const [multiValid, setMultiValid] = useState({
      error:false,
      helperText:""
  })
    const [buttonClicked, setButtonClicked] = useState(false)
    const [data,setData] = useState([])
    const [Images, setImages] = useState([])

    useEffect(()=>{
      console.log(volcID,afeDate)
      if(volcID && afeDate){
        axios.get(`/volcanoes/eruption_by_date?date=${afeDate}&volc=${volcID}`)
        .then(res=>{
          if(res.data.length!=0){
            setEStart({
              date:res.data[0].ed_stime.slice(0,10), // change 2000-12-30T00:00:00.000Z to 2000-12-30
              helperText:""
            })
            setEEnd({
              date:res.data[0].ed_etime.slice(0,10), // change 2000-12-30T00:00:00.000Z to 2000-12-30
              helperText:""
            })
          }else{
            setEStart({
              date:null,
              helperText:"No Eruption Found"
            })
            setEEnd({
              date:null,
              helperText:""
            })
          }
        })
        .catch(err=>console.log(err))
      }
    },[volcID,afeDate])
    const onVolcChange = (newValue)=>{
      if(newValue){
        setVolcName(newValue.label);
        setVolcID(newValue.id)
      } 
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
    const onMfChange = (event)=>{
      setMulti_focus(event.target.value)
    }
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    useEffect(()=>{
        console.log(afeDate,eStartDate.date,eEndDate.date)
    },[afeDate,eStartDate,eEndDate])

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
      if(eStartDate.date){
        if(eEndDate.date){
          if(eStartDate.date>eEndDate.date){
            setEStartValid({
              error:true,
              helperText:"Eruption Start Date cannot be later than End Date"
            })
            valid=false
          }else{
            setEStartValid(isValid)
            if(afeDate<=eEndDate.date && afeDate>=eStartDate.date){
              setAFEValid(isValid)
            }else{
              setAFEValid({
                error:true,
                helperText:"Ash Emission Date must lie between Eruption Start Date and End Date"
              })
              valid=false
            }
          }
        }else{
          if(afeDate.date>eStartDate.date){
            setAFEValid({
              error:true,
              helperText:"Ash Emission Date cannot be before Eruption Start Date"
            })
            valid=false
          }else{
            setAFEValid(isValid)
          }
        }
      }else{
        if(eEndDate.date){
          setEEndValid({
            error:true,
            helperText:"Please fill Start Date first!"
          })
          valid=false
        }else{
          setEEndValid(isValid)
        }
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
        valid=false
      }
      if(multi_focus==null){setMultiValid(nullError);valid=false}
      else{
        setMultiValid(isValid);
      }

      return valid;
    }
    const [addable, setAddable] = useState(false)
    const handleTableClick = ()=>{
        if(checkValidData()){
          setButtonClicked(true)
          let newData = []
          for(var i =0;i<Images.length;i++){
              const particle={
                volc_name: volcName,
                afeDate: afeDate,
                eStartDate: eStartDate.date,
                eEndDate: eEndDate.date,
                mag: magnification,
                gsLow: gsLow,
                gsUp: gsUp,
                pType: pType,
                gType: gType,
                crys: crys,
                alteration: alteration,
                shape: shape,
                image_path:Images[i],
                multi_focus:multi_focus
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
          setIsLoading(true)
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
                par_id:i,
                multi_focus:data[i].multi_focus
            }
            console.log(image)
            await axios.post("/volcanoes/images/add",image)
              .then(console.log("success"))
              .catch(err=>console.log(err),setFailed(true))

          }
          if(afeDate){
            const afe = {
              id:1,
              volc_id:volcID,
              volc_name:volcName,
              ed_stime:afeDate
            }
            console.log(afe)
            axios.post("/volcanoes/afes/add",afe)
            .catch(err=> console.log(err),setFailed(true))
          }
          if(addable){
            const eruption={
              vd_num: volcID,
              ed_stime: eStartDate.date,
              ed_etime: eEndDate.date,
            }
            axios.post("/volcanoes/eruptions/add",eruption)
            .catch(err=> console.log(err),setFailed(true))
          }
          setIsLoading(false);
          if(!failed) {
            navigate('/catalogue')
          }
          else{
            return alert("Upload failed! Please try again!")
          }
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
                <Grid xs={12} sm={3} item>
                <Autocomplete
                  disablePortal
                  options={volcanoList}
                  value={volcName}
                  onChange={(event,newValue)=>{onVolcChange(newValue)}} 
                  renderInput={(params) => 
                  <TextField 
                    {...params} 
                    placeholder="Enter volcano name" 
                    label="Volcano Name" 
                    variant="outlined"
                    fullWidth
                    error={volcValid.error} 
                    helperText={volcValid.helperText}
                    required />}
                />
                </Grid>
                <Grid xs={12} sm={3} item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Ash Emission Date" 
                    value={afeDate}
                    onChange={(newValue) => {
                      setAFEDate(newValue.toISOString().slice(0,10)); // change format
                      setAddable(false);
                    }}
                    renderInput={(params) => 
                    <TextField 
                    {...params}
                    error={afeValid.error}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                    helperText={afeValid.helperText}
                    fullWidth />}
                  />
                </LocalizationProvider>
                </Grid>
                <Grid xs={12} sm={3} item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Eruption Start Date"
                    value={eStartDate.date}
                    onChange={(newValue)=>{
                      setEStart({...eStartDate,date:newValue.toISOString().slice(0,10)}) //change format date
                    }}
                    readOnly={!addable}
                    renderInput={(params) => 
                    <TextField
                      {...params}
                      error={eStartValid.error}
                      variant="outlined" 
                      InputLabelProps={{
                        shrink: true
                      }}
                      helperText={!eStartDate.date?
                        (<div>
                          <p style={{display:"inline",color:"red"}}>{eStartDate.helperText}.</p>
                          {eStartDate.helperText?<p style={{display:"inline",color:"#0291c9",cursor:"pointer",textDecoration:"underline"}} onClick={()=>setAddable(true)}> Add a new Eruption</p>:null}
                        </div>):eStartValid.helperText}
                      fullWidth />}
                  />
                </LocalizationProvider>
                </Grid>
                <Grid xs={12} sm={3} item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Eruption End Date" 
                    value={eEndDate.date}
                    onChange={(newValue)=>{
                      setEEnd({...eEndDate,date:newValue.toISOString().slice(0,10)}) //change format date
                    }}
                    readOnly={!addable}
                    renderInput={(params) => 
                    <TextField
                      {...params}
                      error={eEndValid.error}
                      variant="outlined" 
                      InputLabelProps={{
                        shrink: true
                      }}
                      helperText={eEndValid.helperText}
                      fullWidth />}
                  />
                </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField 
                        placeholder="Enter number only" 
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
                    <TextField 
                        label="Multifocus Image" 
                        variant="outlined" 
                        select
                        value={multi_focus}
                        onChange={onMfChange}
                        error={multiValid.error} 
                        helperText={multiValid.helperText}
                        fullWidth 
                        required >
                            {multi_focus_values.map(item => (
                            <MenuItem key = {item.key} value={item.value}>{item.key} </MenuItem>
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
                <Grid item xs={12} >
                    <Typography style={{color:"#7d7d7d"}}> * means required</Typography>
                </Grid>
              </Grid>
            </form>
            {buttonClicked?<div>
                <Button
                        className={classes.tableButton}
                        variant="contained" 
                        color="success"
                        onClick={()=>{handleTableClick()}}
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
                        onClick={()=>{handleTableClick()}}
                        style={{marginBottom:"10px"}}
                >
                    Show in Table
                </Button></div>}
                <div className={classes.submitandLoading}>
                  {isLoading?<CircularProgress className={classes.loading} />:null}
                <Button
                  className={classes.submitButton}
                  variant="contained" 
                  onClick={onSubmit}
                  >
                  Submit
              </Button>
              </div>

                
          </CardContent>
        </Card>
      </Grid>
        </div>
    )
}

export default ContributePage