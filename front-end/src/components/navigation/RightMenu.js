import React,{useCallback,useEffect} from 'react'
import axios from "axios";
import { NavigationStyles } from './Navigation.styles';
import { useSelector } from "react-redux";
import { USER_SERVER } from "../../Config.js";
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
function RightMenu(props) {
    const classes = NavigationStyles();
    const user = useSelector(state => state.user);

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
        if (response.status === 200) {
          props.history.push("/login");
        } else {
            alert('Log Out Failed')
        }
        });
    };
    console.log(user.userData)
    if (user.userData && !user.userData.isAuth ){
        return (
             <div>
            <Button
                className={`${classes.navBtn} ${classes.loginBtn}`}
                onClick={() => props.history.push('/login')}
                color='inherit'
            > Log In </Button>
            <Button
                className={`${classes.navBtn} ${classes.signupBtn}`}
                onClick={() => props.history.push('/register')}
                color='inherit'
            >
                Sign Up
            </Button> </div>
            )} 
    else {  
        return (
              <div>
                <Button
                className={`${classes.navBtn} ${classes.loginBtn}`}
                onClick={() => props.history.push(`/profile/${user.userData.userId}`)}
                color='inherit'
              >
                Profile
              </Button>
              <Button
                className={`${classes.navBtn} ${classes.signupBtn}`}
                onClick={logoutHandler}
                color='inherit'
              >
                Log Out
              </Button>
              </div>
            )}
}

export default withRouter(RightMenu)