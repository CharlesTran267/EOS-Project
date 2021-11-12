import React,{useCallback,useEffect} from 'react'
import axios from "axios";
import { NavigationStyles } from './Navigation.styles';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { USER_SERVER } from "../../Config.js";
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { auth } from '../../_actions/user_actions';
function RightMenu() {
    const history = useHistory();
    const classes = NavigationStyles();
    const dispatch = useDispatch()
    const handleOnClick = useCallback(
        (url) => history.push(url),
        [history]
      );
    const user = useSelector(state => state.user);

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
        if (response.status === 200) {
            handleOnClick("/login");
        } else {
            alert('Log Out Failed')
        }
        });
    };
    useEffect(()=> dispatch(auth()) ,[])
    if (user.userData && !user.userData.isAuth ){
        return (
             <div>
            <Button
                className={`${classes.navBtn} ${classes.loginBtn}`}
                onClick={() => handleOnClick('/login')}
                color='inherit'
            > Log In </Button>
            <Button
                className={`${classes.navBtn} ${classes.signupBtn}`}
                onClick={() => handleOnClick('/register')}
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
                onClick={() => handleOnClick(`/profile/${user.userData.userId}`)}
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