import React from 'react'
import MaterialTable from 'material-table'

export default function Table({data,setData}){
    const colums =[{
        title:"Volcano Name", field: "volc_name"
    },{
        title:"Magnification", field:"mag"
    },{
        title: "Grain Size Low Bound", field:"gsLow",lookup:{1:"1",2:"2",3:"3",4:"4"}
    },{
        title: "Grain Size Upper Bound", field:"gsUp",lookup:{1:"1",2:"2",3:"3",4:"4"}
    },{
        title:"Particle Type", field:"pType", lookup:{"Pyroxene":"Pyroxene","Plagioclase":"Plagioclase","Other minerals":"Other minerals","Altered material":"Altered material","Glassy":"Glassy"}
    },{
        title:"Glassy Type", field:"gType", lookup:{"Juvenile":"Juvenile","Non-juvenile":"Non-juvenile"}
    },{
        title:"Crystallinity", field:"crys", lookup:{"Low Transparent":"Low Transparent", "Low Black":"Low Black", "Mid":"Mid", "High":"High"}
    },{
        title:"Alteration", field:"alteration", lookup:{"None":"None", "Slight":"Slight","Moderate":"Moderate"}
    },{
        title:"Shape", field:"shape", lookup:{"Blocky":"Blocky", "Fluidal":"Fluidal", "Microtubular":"Microtubular", "Highly vesicular":"Highly vesicular", "Spongy":"Spongy"}
    },{
        title: "Image Path", field:"image_path"
    }]
    return (
        <MaterialTable
            title={<h2 style={{fontWeight:600}}> Uploaded Image </h2>}
            editable={{
                onRowAdd:(newRow)=> new Promise((res,rej)=>{
                    setData([...data,newRow])
                    setTimeout(()=>res(),500)
                }),
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
                actionsColumnIndex: -1,
                rowStyle:(data,index) =>index%2==0?{background:"#f5f5f5"}:null,
                headerStyle:{background:"#096fe3",fontWeight:600,color:"white"},
            }}
        />
    )
}