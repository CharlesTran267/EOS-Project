import { makeStyles } from '@material-ui/core/styles';
export const HomeStyle = makeStyles({
    Btn:{
      background: "#0c4aad",
      borderRadius: "10px",
      whiteSpace: "nowrap",
      padding: "10px 22px;",
      fontSize: "16px",
      outline: "none",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2 ease-in-out",
      textDecoration: "none",
      '&:hover': {
          background: "#0c4aad",
          color: "white"
      },
      color: "white"
    },
    BodyContainer:{
      background: `url(src/images/Picture1.png)`,
      backgroundSize: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 30px",
      height: "800px",
      position: "relative",
    },
    BodyBg:{
      position: "absolute",
      top:"0",
      right:"0",
      bottom:"0",
      left:"0",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
    BodyContent:{
      maxWidth: "1200px",
      position: "absolute",
      padding: "8px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      opacity: "100%",
    },
    BodyText:{
      fontWeight: "bold",
      color: "black",
      fontSize: "48px",
      textAlign: "center",
    },
    BodyBtn:{
      marginTop: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    BodyOption:{
      display: "flex",
      flexDirection: "row",
    }
});
