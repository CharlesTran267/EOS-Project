import { BorderStyle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

export const volcanoStyle = makeStyles({
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
            backgroundColor:"#C0C0C0",
            "& $cardOver":{
                transform:"translateY(0%)"
            }
        },
        BorderStyle:"solid"
    },
    poster:{
        borderRadius:"10px"
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