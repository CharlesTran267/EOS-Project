
import { volcanoStyle } from "./volcanoCard.style";
import { Badge } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LoadingCard from "./loadingCard";
export default function VolcanoCard({info,type}) {
    const classes=volcanoStyle();
    const history = useHistory();
    const imgPath = "optimizedImages" + info.imgURL.slice(7)
    const routeChange = (name) =>{
      let path = `/par_gral/par_gralDetailPage`+'/'+name;
      history.push(path);
    }
    
  return (
    <div className={classes.container}>
      {type=="Volcanoes"? 
        <div>     
          <a href={`/volcano/${info.volc_name}`}>
            <img
            style={{width:"100%" ,height:"200px"}}
            className={classes.poster}
            src={`/${info.imgURL}`}
            />
          </a>
          <div className={classes.name}>{info.volc_name}</div>
        </div>:
        <div onClick = {() =>{return routeChange(info.volc_name)}}>
          <LazyLoadImage
          style={{width:"100%" ,height:"200px"}}
          className={classes.poster}
          src={`/${imgPath}`}
          threshold="500"
        />
          <div className={classes.cardOver}>
            <h3 style={{fontWeight:700}}>Basic Information </h3>
            <h4><span style={{fontWeight:700}}>ID: </span> {info.id}</h4>
            {info.index?<h4><span style={{fontWeight:700}}>Index: </span> {info.index}</h4>:null}
            <h4><span style={{fontWeight:700}}>Volcano Name: </span> {info.volc_name}</h4>
            {info.basic_component?<h4><span style={{fontWeight:700}}>Basic Component: </span> {info.basic_component}</h4>:null}
            {info.crystal_type?<h4><span style={{fontWeight:700}}>Crystal Type: </span> {info.crystal_type}</h4>:null}
            {info.juvenile_type?<h4><span style={{fontWeight:700}}>Juvenile Type: </span> {info.juvenile_type}</h4>:null}
            {info.altered_material_type?<h4><span style={{fontWeight:700}}>Altered Material Type: </span> {info.altered_material_type}</h4>:null}
            {info.crystallinity_and_color?<h4><span style={{fontWeight:700}}>Crystallinity and Color: </span> {info.crystallinity_and_color}</h4>:null}
            {info.alteration_degree?<h4><span style={{fontWeight:700}}>Alteration Degree: </span> {info.alteration_degree}</h4>:null}
            {info.shape?<h4><span style={{fontWeight:700}}>Shape: </span> {info.shape}</h4>:null}
          </div>
        </div>
        }
    </div>
  )
};
