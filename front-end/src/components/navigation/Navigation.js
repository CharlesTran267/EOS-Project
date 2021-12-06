import React, { useCallback, useState } from 'react';
import {Menu, MenuItem} from "@material-ui/core"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { NavigationStyles } from './Navigation.styles';
import { useHistory } from 'react-router-dom';
import {Link} from "react-router-dom"
import RightMenu from "./RightMenu"
export default function Navigation() {
  const classes = NavigationStyles();
  const history = useHistory();
  const [anchorEl,setAnchorEl] = useState(null);
  const handleOnClick = useCallback(
    (url) => history.push(url),
    [history]
  );
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <AppBar className={classes.header} position='static'>
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
          <Button
            aria-controls= 'menu'
            onMouseOver={handleOpenMenu}
            className={classes.navBtn}
            color='inherit'
          >
            Data Base
          </Button>
          <Button
            className={classes.navBtn}
            color='inherit'
            onClick={() => handleOnClick('/contribute')}
          >
            Contribute
          </Button>
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
    <Menu style={{ marginTop : "50px", marginLeft:"20px"}} id= 'menu' onClose={handleMenuClose} anchorEl={anchorEl} open={Boolean(anchorEl)}>
        <MenuItem onClick={() => {handleOnClick('/catalogue'); handleMenuClose();}}> Catalogue </MenuItem>
        <MenuItem onClick={() => {handleOnClick('/analyze'); handleMenuClose();}}> Analytic </MenuItem>
    </Menu>
    </>
  );
}
