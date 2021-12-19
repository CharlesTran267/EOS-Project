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
  const [anchorEL_db,setanchorEL_db] = useState(null);
  const open_db= Boolean(anchorEL_db)
  const [anchorEL_cb,setanchorEL_cb] = useState(null);
  const open_cb= Boolean(anchorEL_cb)

  const handleOnClick = useCallback(
    (url) => history.push(url),
    [history]
  );
  const handleOpen_db = (e) => {
    setanchorEL_db(e.currentTarget);
  };
  const handleOpen_cb = (e) => {
    setanchorEL_cb(e.currentTarget);
  };
  const handleClose_db = () => {
    setanchorEL_db(null);
  };
  const handleClose_cb = () => {
    setanchorEL_cb(null);
  };
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
          <Button
            id='db-button'
            aria-controls= 'dropDown_db'
            aria-haspopup="true"
            aria-expanded={open_db ? 'true' : undefined}
            onClick={handleOpen_db}
            className={classes.navBtn}
            color='inherit'
          >
            Data Base
          </Button>
          <Button
            aria-controls= 'dropDown_cb'
            aria-haspopup="true"
            aria-expanded={open_cb ? 'true' : undefined}
            onClick={handleOpen_cb}
            className={classes.navBtn}
            color='inherit'
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
    <Menu 
      id= 'dropDown_db' 
      anchorEL={anchorEL_db} 
      open={open_db}
      onClose={handleClose_db}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      MenuListProps={{
        'aria-labelledby': 'db-button',
      }}
      >
        <MenuItem onClick={() => {handleOnClick('/database/catalogue');handleClose_db()}}> Catalogue </MenuItem>
        <MenuItem onClick={() => {handleOnClick('/database/analyze');handleClose_db()}}> Analytic </MenuItem>
    </Menu>
    <Menu 
      id= 'dropDown_cb' 
      anchorEL={anchorEL_cb} 
      open={open_cb}
      onClose={handleClose_cb}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
        <MenuItem onClick={() => {handleOnClick('/contribute/binocular');handleClose_cb()}}> Upload Binocular Image </MenuItem>
        <MenuItem onClick={() => {handleOnClick('/contribute/multifocus');handleClose_cb()}}> Upload Multifocus Image </MenuItem>
    </Menu>
    </>
  );
}
