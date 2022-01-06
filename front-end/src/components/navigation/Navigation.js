import React, { useCallback } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { NavigationStyles } from './Navigation.styles';
import { useHistory } from 'react-router-dom';
import {Link} from "react-router-dom"
import RightMenu from "./RightMenu"
import DropDownButton from './DropDownButton';

export default function Navigation() {
  const classes = NavigationStyles();
  const history = useHistory();

  const handleOnClick = useCallback(
    (url) => history.push(url),
    [history]
  );
  const options_db=[{
    label: "Catalogue",
    path:"/database/catalogue"
  },{
    label:"Analytic",
    path:"/database/analytic"
  }]
  const options_cb=[{
    label: "Upload Binocular Image",
    path: "/contribute"
  },{
    label: "Upload Multifocus Image",
    path: "/contribute/multifocus"
  }]
  return (
    <>
    <AppBar position='static'>
      <Toolbar> 
        <Link to="/home" className={classes.navLogo}> Volcanic Ash <br/> DataBase </Link>
        <div className={classes.navMenu}>
          <Button
            className={classes.navBtn}
            color='inherit'
            onClick={() => handleOnClick('/home')}
          >
            Home
          </Button>
          <Button
            className={classes.navBtn}
            color='inherit'
            onClick={() => handleOnClick('/about')}
          >
            About Us
          </Button>
          <DropDownButton label='Data Base' options={options_db}/>
          <DropDownButton label='Contribute' options={options_cb}/>
          <Button
            className={classes.navBtn}
            color='inherit'
            onClick={() => handleOnClick('/tool')}
          >
            Tools
          </Button>
        </div>
        <RightMenu/>
        
      </Toolbar>
    </AppBar>
    </>
  );
}
