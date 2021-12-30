import React,{useEffect, useState} from "react";
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
export default function DatePickerCustom(props){
    const [readOnly,setReadOnly] = useState(true)
    const [views,setViews] = useState([])
    useEffect(()=>{
        props.setValue(null)
        if(props.dateFormat=="Unknown") setReadOnly(true)
        else setReadOnly(false)
        switch(props.dateFormat){
            case "mm/dd/yyyy": setViews(['year','month','day']); break;
            case "mm/yyyy": setViews(['year','month']); break;
            case "Year only": setViews(["year"]); break;
            default: setViews([])
        }
    },[props.dateFormat])
    return(
        <div>
            <Grid container xs={12} spacing={2}>
                <Grid item xs={6} >
                    <TextField 
                        label="Choose Date Format" 
                        variant="outlined" 
                        select
                        value={props.dateFormat}
                        onChange={props.onFormatChange}
                        fullWidth
                        required >
                            {props.values.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                <Grid item xs={6}>
                    {props.dateFormat=="Years BP"?
                    <TextField 
                        placeholder="Enter positive number only" 
                        label={props.label}
                        variant="outlined" 
                        type="number"
                        value={props.yearsBP}
                        onChange={props.onYearsBPChange}
                        fullWidth>
                    </TextField>:
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={views}
                            label={props.label}
                            value={props.value}
                            onChange={(newValue) => {
                            props.setValue(newValue.toISOString().slice(0,10)); // change format
                            }}
                            readOnly={readOnly}
                            renderInput={(params) => 
                            <TextField 
                                {...params}
                                error={props.valid.error}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: !props.dateFormat || props.dateFormat =="Unknown"?false:true
                                }}
                                helperText={props.valid.helperText}
                                fullWidth />}
                        />
                    </LocalizationProvider>}
                </Grid>
            </Grid>
        </div>
    )}