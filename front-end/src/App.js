import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Auth from './hoc/auth';
import Navigation from './components/navigation/Navigation';
import { AppStyles } from './App.styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './View/HomePage/Home';
import CataloguePage from './View/CatalogPage/CatalogPage.js';
import VolcanoDetailPage from './View/VolcanoDetailPage/VolcanoDetailPage';
import LoginPage from './View/LoginPage/LoginPage';
import RegisterPage from './View/RegisterPage/RegisterPage';
import ProfilePage from './View/ProfilePage/ProfilePage';
import ContributePage from './View/ContributePage/ContributePage.js';
import Multifocus from './View/ContributePage/Multi_focus';
import GralParDetailPage from './View/Par_Gral_DetailPage/GralParDetailPage'
import NewDashBoard from './View/AnalyticPlots/NewDashBoard';
function App() {
  const classes = AppStyles();
// true for logged in, false for not logged in, null for either 
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Navigation />
        <main className={classes.main}>
          <Switch>
          <Route  path="/profile/:userId" component={Auth(ProfilePage,true)}/>
            <Route  path="/volcano/:volcanoId" component={Auth(VolcanoDetailPage,null)}/>
            <Route  path="/par_gral/par_gralDetailPage" component={Auth(GralParDetailPage,null)}/>
            <Route path={'/database/catalogue'} component={Auth(CataloguePage,null)}/>
            <Route path={'/database/analytic'} component={Auth(NewDashBoard,null)}/>
            <Route path={'/home'} component={Auth(Home,null)}/>
            <Route path={'/contribute/binocular'} component={Auth(ContributePage,null)}/>
            <Route path={'/contribute/multifocus'} component={Auth(Multifocus,null)}/>
            <Route path="/login" component={Auth(LoginPage,false)}/>
            <Route path="/register" component={Auth(RegisterPage,false)}/>
            <Route path={'/'}>
              <Home />
            </Route>
          </Switch>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;
 