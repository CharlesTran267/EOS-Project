
import { volcanoStyle } from "./volcanoCard.style";
import { Badge } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function VolcanoCard({info,type}) {
    const classes=volcanoStyle();
    const history = useHistory();

    const routeChange = () =>{
      let path = `/par_gral/par_gralDetailPage`;
      history.push(path);
    }

  return (
    <div className={classes.container}>
      {type=="Volcanoes"? 
        <div>     
          <a href={`/volcano/${info.id}`}><img
          style={{width:"100%" ,height:"200px"}}
          className={classes.poster}
          src={`/${info.imgURL}`}
        /></a>
          <div className={classes.name}>{info.name}</div>
        </div>:
        <div onClick = {routeChange}>
          <img
          style={{width:"100%" ,height:"200px"}}
          className={classes.poster}
          src={`/${info.imgURL}`}
        />
          <div className={classes.cardOver}>
            <h3 style={{fontWeight:800}}>Basic Information: </h3>
            <h4>ID: {info.id}</h4>
            <h4>Index: {info.index}</h4>
            <h4>Volcano Name: {info.volc_name}</h4>
            <h4>AFE ID: {info.afe_id}</h4>
            <h4>General Images ID: {info.gen_id}</h4>
            <h4>Glassy Type: {info.glassyType}</h4>
            <h4>Crystallinity: {info.crystallinity}</h4>
            {info.glassyType=="Juvenile"?<h4>Shape: {info.shape}</h4>:<h4>ALteration: {info.alteration}</h4>}
          </div>
        </div>
        }
    </div>
  )
};
