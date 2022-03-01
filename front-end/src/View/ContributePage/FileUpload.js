import React, { useState } from 'react'
import { fileUploadStyle } from './FileUpload.style';
import Dropzone from 'react-dropzone';
import {CloudUploadOutlined} from "@ant-design/icons"
import Axios from 'axios';
import { Grid,LinearProgress } from '@material-ui/core';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';

function FileUpload(props) {
    const classes = fileUploadStyle();
    const [Images, setImages] = useState([])
    const [progress, setProgress] = useState(0)
    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' },
            onUploadProgress : progressEvent => {
                setProgress(
                    parseInt(
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    )
                );
            }
        }
        for(var i=0;i<files.length;i++){
            formData.append("files",files[i])
        }
        //save the Image we chose inside the Node Server 
        Axios.post('/upload/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages(Images.concat(response.data.image))
                    props.refreshFunction(Images.concat(response.data.image))
                } else {
                    console.log("failed")
                    alert('Failed to save the Image in Server')
                }
            })
        
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);
        
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div>
            <Grid container justifyContent="space-between">
                <Grid item xs={3} className={classes.upload}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={true}
                        maxSize={99999999999999999999999999999999}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                display: 'block', alignItems: 'center', justifyContent: 'center'
                            }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <CloudUploadOutlined style={{color: "#6990F2",fontSize:"100px",marginLeft:"50px"}}/>
                                <p style={{color: "#6990F2",fontSize:"20px"}}>Browse File to Upload</p>
                            </div>
                        )}
                    </Dropzone>
                </Grid>
                <Grid item xs={7}>
                    <div className={classes.uploadfiles}>
                        {progress==100?Images.map((image, index) => (
                            <span style={{position:"relative",display:"inline-flex"}}>
                                <IconButton onClick={() => onDelete(image)} style={{position:"absolute",top:2,right:10, zIndex:1, width:"12px", height:"12px"}}>
                                    <RemoveCircleIcon sx={{ color: "#FF0D86" }}/>
                                </IconButton>
                                <img className={classes.image} src={`/${image}`} alt={`Img-${index}`}/>
                            </span>
                        )):null}
                    </div>
                    {progress<100 && progress!=0?<LinearProgress variant="determinate" value={progress}/>:null}
                </Grid>
            </Grid>

        </div>
    )
}

export default FileUpload