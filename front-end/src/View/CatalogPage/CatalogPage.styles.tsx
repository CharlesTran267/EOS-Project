import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  SearchTitle:{
    marginTop: "50px",
    color: "black",
    fontSize: '36px',
    textAlign: "center",
    fontWeight:"bold"
  },
  SearchContainer:{
      backgroundColor: "white",
      width: "100%",
      height:"100%",
      overflowY:"scroll",
      overflowX:"hidden",
      position: "absolute",
      padding: "8px 24px",
      display: "flex",
      alignContent:"center",
      flexDirection: "column",
      alignItems: "center",
      opacity: "100%"
  },
  SearchBoxContainer:{
    width: "100%",
    display:"flex",
    alignItems:"center"
  },
  SearchBox:{
    alignContent:"center",
    width: "80%",
    padding: "20px 30px",
    margin: "8px 0",
    marginLeft:"150px",
    display: "block",
    border: "5px solid #ccc",
    borderRadius: "20px",
    boxSizing: "border-box",
    fontSize: "24px",
  },
  container:{
      backgroundSize: "100%",
      display: "flex",
      padding: "0 30px",
      height: "800px",
      position: "relative",
  },
  iconbutton:{
    position:"absolute",
    right:0,
    top:0,
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
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
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  ResultContainer:{
    backgroundColor: "white",
    width: "80%",
    height: "500px",
    position: "relative",
    padding: "8px 24px",
    marginTop:"20px",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent:"flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    opacity: "100%"
  }
  
}));
