import {makeStyles} from "@material-ui/core/styles";

export const NavigationStyles = makeStyles({
    navMenu:{
        marginLeft:"150px",
        display: "flex",
        alignItems: "center",
        listStyle: "none",
        textAlign: "center",
    },
    navLogo: {
        color: "white",
        justifySelf: "flex-start",
        fontSize: "1.5rem",
        display: "flex",
        alignItems: "center",
        marginLeft: "24px",
        fontWeight: "bold",
        textDecoration: "none",
    },
    header: {
        background: "#0c4aad",
        paddingLeft: "1%",
        paddingRight: "1%",
    },
    navBtn: {
        borderRadius: "20px",
        whiteSpace: "nowrap",
        padding: "10px 22px;",
        fontSize: "16px",
        outline: "none",
        border: "none",
        cursor: "pointer",
        transition: "all 0.2 ease-in-out",
        textDecoration: "none",
        '&:hover': {
            background: "white",
            color: "black"
        },
        color: "white"
    },
    loginBtn: {
        marginLeft: "100px"
    },
    signupBtn:{
        marginLeft:"10px",
        marginRight:"10px"
    },
});
