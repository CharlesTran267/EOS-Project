import React, { useState,useEffect,useCallback } from 'react'
import FileUpload from '../FileUpload.js'
import axios from 'axios';
import Table from '../Table'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import { contributeStyle } from '../ContributePage.style.tsx';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DatePickerCustom from '../DatePickerCustom.js';
import extractInfo from '../extractInfo.js';
const gsValue = [0,1,2,3,4];
const pTypes  = ["Pyroxene","Plagioclase","Other minerals","Altered material","Glassy"];
const gTypes = ["Juvenile","Non-juvenile"];
const crystallinity = ["Low Transparent","Low Black", "Mid", "High"];
const alterations = ["None", "Slight", "Moderate"];
const shapes = ["Blocky", "Fluidal", "Microtubular","Highly vesicular","Spongy"]
const dateFormatValues = ["mm/dd/yyyy", "mm/yyyy", "Year only", "Years BP", "Unknown"]
const booleanList = {
  "Yes": true,
  "No": false
}
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
              label: volcano.volc_name,
              id: volcano.volc_num
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
    const [afeFormat, setAFEFormat] = useState("")
    const [afeDate,setAFEDate] = useState(null)
    const [afeYearsBP, setAFEYearsBP] = useState()

    const [sampleFormat, setSampleFormat] = useState("")
    const [sampleDate,setSampleDate] = useState(null)
    const [sampleYearsBP, setSampleYearsBP] = useState()
    const [eStartDate, setEStart] = useState({
      date:null,
      helperText:""
    })
    const [sampleLon,setSampleLon] = useState()
    const [sampleLat,setSampleLat] = useState()
    const [eEndDate, setEEnd] = useState({
      date:null,
      helperText:""
    })
    const [followConvention, setFollow] = useState(null)
    const [followValid,setFollowValid] = useState({
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
    const onAFEFormatChange = (event)=>{
      setAFEFormat(event.target.value)
    }
    const onAFEYearsBPChange = (event)=>{
      setAFEYearsBP(event.target.value)
    }
    const onSampleFormatChange = (event)=>{
      setSampleFormat(event.target.value)
    }
    const onSampleYearsBPChange = (event)=>{
      setSampleYearsBP(event.target.value)
    }
    const onSampleLonChange = (event)=>{
        const value = event.target.value
        if (value >90){setSampleLon(90)}
        else if (value<0){setSampleLon(0)}
        else {setSampleLon(value)}
    }
    const onSampleLatChange = (event)=>{
        const value = event.target.value
        if (value >90){setSampleLat(90)}
        else if (value<0){setSampleLat(0)}
        else {setSampleLat(value)}
    }
    const onFollowChange = (event)=>{
      setFollow(event.target.value)
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
      if(followConvention==null){setFollowValid(nullError);valid=false}
      else{
        setFollowValid(isValid);
      }
      if(followConvention==false){
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
    }

      return valid;
    }
    const handleTableClick = ()=>{
      if(checkValidData()){
        setButtonClicked(true)
        if(followConvention==false){
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
                image_name:Images[i].split("_").slice(1).join("_").slice(0,-4),
                image_path:Images[i]
              }
              newData.push(particle)

          }
          setData(newData)
        }else if (followConvention==true){
          let newData = []
          for(var i=0;i<Images.length;i++){
            const image_path = Images[i]
            const image_name = Images[i].split("_").slice(1).join("_").slice(0,-4)
            const info = extractInfo(image_name,volcID,image_path)
            if (info == undefined) {alert ("Your filenames are not following our naming convention")}
            else {
                const changeToPascalCase =(s)=>{
                let arr = s.split(" ")
                for(var i=0;i<arr.length;i++){
                    arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1)
                }
                return arr.join(" ")
                }
                const par = info.particle
                const particle = {
                volc_name: volcName,
                id: par.id,
                mag: par.magnification,
                gsLow: par.gsLow,
                gsUp: par.gsUp,
                multi_focus: par.multi_focus,
                image_name: image_name,
                image_path:image_path
                }
                if(par.index){ particle.index = par.index}
                if(par.particleType){ particle.pType = changeToPascalCase(par.particleType)}
                if(par.glassyType){ particle.gType = changeToPascalCase(par.glassyType)}
                if(par.crystallinity){ particle.crys = changeToPascalCase(par.crystallinity)}
                if(par.alteration){ particle.alteration = changeToPascalCase(par.alteration)}
                if(par.shape){ particle.shape = changeToPascalCase(par.shape)}
                newData.push(particle)
            }
         }
          setData(newData)
        }
      }
    }
    const [failed,setFailed] = useState(false)
    const onSubmit = async(event) => {
        event.preventDefault();
        if(checkValidData()){
          setIsLoading(true)
          if(followConvention==false){
            data.map(par=>{
                const particle ={
                  volc_num: volcID,
                  volc_name: par.volc_name,
                  afe_id: 1,
                  sample_id:1,
                  id:0,
                  index:0,
                  instrument:"b",
                  imgURL:par.image_path,
                  gsLow:par.gsLow,
                  gsUp: par.gsUp,
                  multi_focus: true,
                  magnification: par.mag,
                  particleType: par.pType, 
                  glassyType: par.gType,
                  crystallinity:par.crys, 
                  alteration: par.alteration, 
                  shape:par.shape
                }
                axios.post("/volcanoes/particles/add", particle)
                  .catch(err=>console.log(err),setFailed(true))
                })
            }else if(followConvention == true){
              for(var i=0;i<data.length;i++){
                const particle={
                  volc_num: volcID,
                  volc_name: data[i].volc_name,
                  afe_id: 1,
                  sample_id:1,
                  id: data[i].id,
                  index: data[i].index,
                  instrument:"b",
                  imgURL:data[i].image_path,
                  gsLow:data[i].gsLow,
                  gsUp: data[i].gsUp,
                  multi_focus: data[i].multi_focus,
                  magnification: data[i].mag,
                  particleType: data[i].pType, 
                  glassyType: data[i].gType,
                  crystallinity:data[i].crys, 
                  alteration: data[i].alteration, 
                  shape:data[i].shape
                }
                axios.post("/volcanoes/particles/add", particle)
                  .catch(err=>console.log(err),setFailed(true))
              }
            }
          }
          if(afeDate){
            const afe = {
              afe_id:1,
              volc_num:volcID,
              volc_name:volcName,
              afe_date:afeDate,
            }
            if(afeYearsBP) afe.yearsBP = afeYearsBP
            axios.post("/volcanoes/afes/add",afe)
            .catch(err=> console.log(err),setFailed(true))
          }
          if(sampleDate || sampleLat || sampleLon){
            const sample={
              volc_num: volcID,
              afe_id:1,
              sample_id:1,
            }
            if(sampleDate) {sample.sample_date = sampleDate}
            if (sampleLat) {sample.sample_loc_lat = sampleLat}
            if (sampleLon) {sample.sample_loc_lon = sampleLon}
            axios.post("/volcanoes/samples/add",sample)
            .catch(err=> console.log(err),setFailed(true)) 
          }
          axios.post("/upload/mesureTool",{len:Images.length}).catch(err=>console.log(err))
          setIsLoading(false);
          if(!failed) {
            navigate('/database/catalogue')
          }
          else{
            return alert("Upload failed! Please try again!")
          }
      }
      useEffect(()=>{
        console.log(volcanoList[3])
      },[volcanoList])
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
              <Grid container spacing={2}>
                <Grid xs={12} item>
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
                <Grid xs ={12} sm={3} item>
                  <Typography style={{fontWeight:600}}>Ash Emission Date:</Typography>
                </Grid>
                <Grid xs={12} item>
                  <DatePickerCustom 
                  dateFormat={afeFormat} 
                  onFormatChange={onAFEFormatChange} 
                  values={dateFormatValues} 
                  label="Ash Emission Date" 
                  value ={afeDate}
                  yearsBP={afeYearsBP}
                  onYearsBPChange={onAFEYearsBPChange} 
                  setValue={setAFEDate}/>
                </Grid>
                <Grid xs ={12}  item>
                  <Typography style={{fontWeight:600}}>Eruption:</Typography>
                </Grid>
                <Grid xs={12} sm={6} item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Eruption Start Date"
                    value={eStartDate.date}
                    onChange={(newValue)=>{
                      setEStart({...eStartDate,date:newValue.toISOString().slice(0,10)}) //change format date
                    }}
                    readOnly="true"
                    renderInput={(params) => 
                    <TextField
                      {...params}
                      variant="outlined" 
                      InputLabelProps={{
                        shrink: true
                      }}
                      helperText={!eStartDate.date?
                        (<div>
                          <p style={{display:"inline",color:"red"}}>{eStartDate.helperText}</p>
                        </div>):null}
                      fullWidth />}
                  />
                </LocalizationProvider>
                </Grid>
                <Grid xs={12} sm={6} item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Eruption End Date" 
                    value={eEndDate.date}
                    onChange={(newValue)=>{
                      setEEnd({...eEndDate,date:newValue.toISOString().slice(0,10)}) //change format date
                    }}
                    readOnly="true"
                    renderInput={(params) => 
                    <TextField
                      {...params}
                      variant="outlined" 
                      InputLabelProps={{
                        shrink: true
                      }}
                      fullWidth />}
                  />
                </LocalizationProvider>
                </Grid>
                <Grid xs ={12}  item>
                  <Typography style={{fontWeight:600}}>Sample infomation:</Typography>
                </Grid>
                <Grid xs={12} item>
                  <DatePickerCustom 
                  dateFormat={sampleFormat} 
                  onFormatChange={onSampleFormatChange} 
                  values={dateFormatValues} 
                  label="Sample Collection Date" 
                  value ={sampleDate}
                  yearsBP={sampleYearsBP}
                  onYearsBPChange={onSampleYearsBPChange} 
                  setValue={setSampleDate} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        placeholder="Enter number from 0 to 90" 
                        label="Collection Location (longitude)" 
                        variant="outlined" 
                        type="number"
                        value={sampleLon}
                        onChange={onSampleLonChange}
                        inputProps={{min:0,max:90}}
                        fullWidth 
                        required >
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        placeholder="Enter number from 0 to 90" 
                        label="Collection Location (latitude)" 
                        variant="outlined" 
                        type="number"
                        value={sampleLat}
                        onChange={onSampleLatChange}
                        inputProps={{min:0,max:90}}
                        fullWidth 
                        required >
                    </TextField>
                </Grid>
                <Grid xs ={12}  item>
                  <Typography style={{fontWeight:600}}>Image infomation:</Typography>
                  <Typography style={{color:"#8f8f8f"}} >Tips: If you name your images following our naming convention. Our system will automatically get data from your filename.</Typography>
                </Grid>
                <Grid item xs={4} >
                    <TextField 
                        label="Follow our Naming Convention" 
                        variant="outlined" 
                        select
                        value={followConvention}
                        onChange={onFollowChange}
                        error={followValid.error} 
                        helperText={followValid.helperText}
                        fullWidth 
                        required >
                            {Object.keys(booleanList).map(key => (
                            <MenuItem key = {key} value={booleanList[key]}>{key} </MenuItem>
                            ))}
                        </TextField>
                </Grid>
                <Grid item xs={8}/>
                {followConvention==false?
                (<Grid container xs={12} spacing={2} style={{paddingLeft:7}}><Grid item xs={12} sm={4}>
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
                    <Typography style={{fontWeight:600}}> Tell us more about your data (optional):</Typography>
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
                </Grid></Grid>):null}
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
