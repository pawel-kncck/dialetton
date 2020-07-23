import React, { useEffect } from 'react';
import './App.css';
import NavBar from './.Navigation/NavBar';
// import Application from './Application/Application'
import Home from './.Course/CoursesLanding';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './.Authentication/LoginPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase from './.Database/firebase';
import { connect } from 'react-redux';
import { setUser } from './.Store/auth.actions';
import ProtecedRoute from './.Hoc/ProtectedRoute';
import Unauthorized from './.Authentication/LogoutDestinationPage';
import Workspace from './.Application/Workspace';


function App(props) {
  // const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    firebase.auth()
    .onAuthStateChanged(user => {
      props.setUser(user)
    })
  }, [props,props.user]);

  return (
      <BrowserRouter>
      <CssBaseline />
          <div className="app">
            <NavBar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <ProtecedRoute path='/course' user={props.user} component={Workspace} />
              {/* <Route path='/course' component={Workspace} /> */}
              <Route path="/unauthorized" component={Unauthorized} />
            </Switch>
          </div>
      </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    user: state.auth.authUser,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUser: (user, id, email) => dispatch(setUser(user,id,email)),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
