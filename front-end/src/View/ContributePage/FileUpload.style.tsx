import { makeStyles } from "@material-ui/core"
export const fileUploadStyle = makeStyles(({
    upload:{
        height: "200px",
        display: "flex",
        cursor: "pointer",
        margin: "30px 0",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "5px",
        border: "2px dashed #6990F2",
    },
    uploadfiles:{
        height: "200px",
        margin: "30px 0",
        padding:"20px",
        borderRadius: "5px",
        border: "2px solid #6990F2",
        overflow:"auto"
    },
    image:{
        width: '100px',
        height: '100px',
        marginRight:"10px",
        '&:hover':{
            transform:"scale(1.2)",
        }
    }
}))