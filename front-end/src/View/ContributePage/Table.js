import React, { useState } from 'react'
import MaterialTable from '@material-table/core'
import { TablePagination } from '@material-ui/core';

export default function Table({data,setData}){
    const colums =[{
        title:"Volcano Name", field: "volc_name", editable:"never"
    },{
        title:"Magnification", field:"mag",type:"numeric", validate: rowData =>{
            if(!rowData.mag) {return "Required"}
            return true
        }
    },{
        title: "GS Lower Bound", field:"gsLow",lookup:{1:"1",2:"2",3:"3",4:"4"},type:"numeric", validate: rowData =>{
            if(!rowData.gsLow) {return "Required"}
            return true
        }
    },{
        title: "GS Upper Bound", field:"gsUp",lookup:{1:"1",2:"2",3:"3",4:"4"},type:"numeric", validate: rowData =>{
            if(!rowData.gsUp) {return "Required"}
            return true
        }
    },{
        title:"Particle Type", field:"pType", lookup:{"Pyroxene":"Pyroxene","Plagioclase":"Plagioclase","Other minerals":"Other minerals","Altered material":"Altered material","Glassy":"Glassy"}
        ,validate: rowData => ({ isValid: true, helperText: "Optional" })
    },{
        title:"Glassy Type", field:"gType", lookup:{"Juvenile":"Juvenile","Non-juvenile":"Non-juvenile"}
        ,validate: rowData => ({ isValid: true, helperText: "Optional" })
    },{
        title:"Crystallinity", field:"crys", lookup:{"Low Transparent":"Low Transparent", "Low Black":"Low Black", "Mid":"Mid", "High":"High"}
        ,validate: rowData => ({ isValid: true, helperText: "Optional" })
    },{
        title:"Alteration", field:"alteration", lookup:{"None":"None", "Slight":"Slight","Moderate":"Moderate"}
        ,validate: rowData => ({ isValid: true, helperText: "Optional" })
    },{
        title:"Shape", field:"shape", lookup:{"Blocky":"Blocky", "Fluidal":"Fluidal", "Microtubular":"Microtubular", "Highly vesicular":"Highly vesicular", "Spongy":"Spongy"}
        ,validate: rowData => ({ isValid: true, helperText: "Optional" })
    },{
        title: "Image name", field:"image_name", editable:"never"
    }]
    return (
        <MaterialTable
            title={<h2 style={{fontWeight:600}}> Uploaded Image </h2>}
            editable={{
                onRowUpdate:(newRow,oldRow) => new Promise((res,rej)=>{
                    const newData = [...data]
                    newData[oldRow.tableData.id] = newRow
                    setData(newData)
                    setTimeout(()=>res(),500)
                }),
                onRowDelete:(selectedRow) => new Promise((res,rej)=>{
                    const newData  = [...data]
                    newData.splice(selectedRow.tableData.id,1)
                    setData(newData)
                    setTimeout(()=>res(),500)
                })
            }}
            data={data}
            columns={colums}
            options={{
                exportButton:true,
                addRowPosition:"first",
                rowStyle:(data,index) =>index%2==0?{background:"#f5f5f5"}:null,
                headerStyle:{background:"#096fe3",fontWeight:600,color:"white"},
            }}
        />
    )
}