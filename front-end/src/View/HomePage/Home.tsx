import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {HomeStyle} from './Home.styles'
import picture2 from '../../assets/images/Picture2.png'
import picture3 from '../../assets/images/Picture3.png'
import picture4 from '../../assets/images/Picture4.png'
import { classExpression } from '@babel/types'
export default function Home(){
  const classes = HomeStyle();
  const history = useHistory();

  const handleOnClick = useCallback(
    (url: string) => history.push(url),
    [history]
  );
    return (
        <div className={classes.BodyContainer}>
            <div className={classes.BodyBg}></div>
            <div className={classes.BodyContent}>
                <Typography className={classes.BodyText}>A volcanic ash database for monitoring and comparing</Typography>
                <div className={classes.BodyBtn}>
                    <Button className={classes.Btn} onClick={()=> handleOnClick("/about")}> About Us</Button>
                    <br/>
                    <Button className={classes.Btn} onClick={()=> handleOnClick("/database")}> Explore Our Data</Button>
                </div>
                <br/>
                <span className={classes.BodyOption}>
                    <figure>
                        <img src ={picture2} alt = "Logo"/>
                        <Button className={classes.Btn} onClick={()=> handleOnClick("/catalogue")} > Catalogue</Button>
                    </figure>
                    <br/>
                    <figure>
                        <img src = {picture3}alt = "Logo"/>
                        <Button className={classes.Btn} onClick={()=> handleOnClick("/analyze")}> Analyze your own data!</Button>
                    </figure>
                    <figure>
                        <img src = {picture4} alt = "Logo"/>
                        <Button className={classes.Btn} onClick={()=> handleOnClick("/")}> Deep Learning Classification</Button>
                    </figure>
                </span>
            </div>
        </div>
    )
}
