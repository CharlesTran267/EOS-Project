import { Grid, LinearProgress } from '@material-ui/core';
import React, { useState,useEffect } from 'react'
import FileHeader from './FileHeader';
import Axios from 'axios'
export default function SingleFileUpload({file,onDelete,Images,setImages}){
    const [progress,setProgress] = useState(0)
    const uploadFile = (file)=>{
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        ,
            onUploadProgress : progressEvent => {
                setProgress(
                    parseInt(
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    )
                );
            }
        }
        formData.append('files',file)
        Axios.post('/upload/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.image)
                    setImages(Images.concat(response.data.image))
                } else {
                    console.log("failed")
                    alert('Failed to save the Image in Server')
                }
            })
    }
    useEffect(()=>{
        uploadFile(file)
        console.log(file)
    },[])
    return (
        <Grid item style={{height:"70px"}}>
            <FileHeader file={file} onDelete={onDelete}/>
            <LinearProgress variant="determinate" value={progress}/>
        </Grid>
    )
}