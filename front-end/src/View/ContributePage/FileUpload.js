import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import {FileAddOutlined} from "@ant-design/icons"
import Axios from 'axios';
function FileUpload(props) {
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={true}
                maxSize={99999999999999999999999999999999}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <FileAddOutlined style={{fontSize:"100px"}} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${image}`} alt={`Img-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload