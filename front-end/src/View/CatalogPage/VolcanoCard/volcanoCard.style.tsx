import { BorderStyle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

export const volcanoStyle = makeStyles({
    '@global':{
        "@keyframes pulse": {
            "0%, 100%": {
              opacity: 1
            },
            "50%": {
              opacity: .5
            }
          }
    },
    container:{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        padding: "5px",
        margin: "5px 0",
        backgroundColor: "#0c4aad",
        borderRadius: "10px",
        position: "relative",
        marginLeft: "50px",
        overflow:"hidden",
        '&:hover':{
            "& $cardOver":{
                transform:"translateY(0%)"
            }
        },
        BorderStyle:"solid"
    },
    loadingContainer:{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        padding: "5px",
        margin: "5px 0",
        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        borderRadius: "10px",
        position: "relative",
        marginLeft: "50px",
        overflow:"hidden",
        BorderStyle:"solid"
    },
    poster:{
        borderRadius:"10px"
    },
    loadingPoster:{
        borderRadius:"10px",
        width:"100%",
        height:"200px",
        backgroundColor: "rgb(209 213 219)",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    nameBox:{
        paddingLeft:"24px",
        paddingRight:"24px",
        paddingTop:"16px",
        paddingBottom:"16px",
        alignItems:"center",
    },
    loadingName:{
        width:"100px",
        height:"20px",
        borderRadius:"5px",
        backgroundColor: "rgb(209 213 219)",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    name:{
        color: "white",
        width: "100%",
        textAlign:"center",
        fontSize: "20px",
        fontWeight:600,
        padding: "8px 0",
    },
    cardOver:{
        backgroundColor: "#C0C0C0",
        opacity:"0.85",
        position:"absolute",
        padding: "1rem",
        bottom:"0",
        left:"0",
        right:"0",
        transform:"translateY(100%)",
        maxHeight:"100%",
        overflowY: "scroll",
        transition: "transform 0.3s ease-in-out",
    }
});