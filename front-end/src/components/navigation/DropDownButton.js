import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavigationStyles } from './Navigation.styles';
import Button from '@material-ui/core/Button';


export default function DropDownButton({label,options}) {
  const classes = NavigationStyles();
  const history = useHistory();
  const handleOnClick = useCallback(
    (url) => history.push(url),
    [history]
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={classes.navBtn}
      >
        {label}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{top:"45px", left:"20px"}}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >

        {options.map((option)=>
        <MenuItem onClick={()=>{handleOnClick(`${option.path}`);handleClose()}}>{option.label}</MenuItem>
          )}
      </Menu>
    </div>
  );
}