import React, { useState } from 'react'
import { fileUploadStyle } from './FileUpload.style';
import Dropzone from 'react-dropzone';
import {CloudUploadOutlined} from "@ant-design/icons"
import Axios from 'axios';
import { Grid } from '@material-ui/core';
function FileUpload(props) {
    const classes = fileUploadStyle();
    const [Images, setImages] = useState([])

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        for(var i=0;i<files.length;i++){
            formData.append("files",files[i])
        }
        //save the Image we chose inside the Node Server 
        Axios.post('/upload/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.image)
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
                <Grid item xs={7} className={classes.uploadfiles}>
                        {Images.map((image, index) => (
                            <span onClick={() => onDelete(image)}>
                                <img style={{ width: '100px', height: '100px',marginRight:"10px" }} src={`${image}`} alt={`Img-${index}`} />
                            </span>
                        ))}
                </Grid>
            </Grid>

        </div>
    )
}

export default FileUpload