import { volcanoStyle } from "./volcanoCard.style";

export default function LoadingCard(){
    const classes = volcanoStyle();
    return(
        <div className={classes.loadingContainer}>
            <div className={classes.loadingPoster}></div>
            <div className={classes.nameBox}> 
                <div className={classes.loadingName}></div>
            </div>
        </div>
    )
}