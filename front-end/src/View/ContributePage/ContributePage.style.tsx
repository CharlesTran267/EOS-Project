import { makeStyles } from "@material-ui/styles";
export const contributeStyle = makeStyles(({
    root:{
      '& .MuiTextField-root':{
          width:'20ch',
      }
    },
    progressArea:{
        '&.row':{
            marginBottom: "10px",
            background: "#E9F0FF",
            listStyle: "none",
            padding: "15px 20px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }
    },
    tableButton:{
        appearance: "button",
        backfaceVisibility: "hidden",
        backgroundColor: "#1d9e00",
        borderRadius: "6px",
        borderWidth: 0,
        boxShadow: `"rgba(50, 50, 93, .1) 0 0 0 1px inset","rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0"`,
        boxSizing: "border-box",
        color: "#fff",
        cursor: "pointer",
        fontFamily: `"-apple-system,system-ui","Segoe UI","Roboto","Helvetica Neue","Ubuntu","sans-serif"`,
        fontSize: "100%",
        fontWeight:600,
        height: "44px",
        lineHeight: 1.15,
        margin: "12px 0 0",
        outline: "none",
        padding: "0 25px",
        position: "relative",
        textAlign: "center",
        textTransform: "none",
        transform: "translateZ(0)",
        userSelect: "none",
        WebkitUserSelect:"none",
        touchAction: "manipulation",
        width: "13%",
        '&:hover':{
            background:"#1d9e00"
        }

        },
    submitButton:{
        appearance: "button",
        backfaceVisibility: "hidden",
        backgroundColor: "#405cf5",
        borderRadius: "6px",
        borderWidth: 0,
        boxShadow: `"rgba(50, 50, 93, .1) 0 0 0 1px inset","rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0"`,
        boxSizing: "border-box",
        color: "#fff",
        cursor: "pointer",
        fontFamily: `"-apple-system,system-ui","Segoe UI","Roboto","Helvetica Neue","Ubuntu","sans-serif"`,
        fontSize: "100%",
        fontWeight:600,
        height: "44px",
        lineHeight: 1.15,
        outline: "none",
        padding: "0 25px",
        position: "relative",
        textAlign: "center",
        textTransform: "none",
        transform: "translateZ(0)",
        transition: "all .2s,box-shadow .08s ease-in",
        userSelect: "none",
        WebkitUserSelect:"none",
        touchAction: "manipulation",
        width: "7%",
        '&:hover':{
            background:"#405cf5"
        }  
    },
    submitandLoading:{
        display:"flex",
        float:"right",
        flexDirection:"row",
        marginTop:"20px"
    },
    loading:{
        marginRight:"20px",
    }

}))