import React from "react";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from 'react-router';

import Layout from "../src/components/Layout";
import Error from "./pages/error";
// import logopage from "../pages/logopage/logopage";
import Auth from "./pages/Auth/Auth";
// import Signup from "../pages/signup";
// import Forgot from "../pages/forgot";
// import Resend from "../pages/Resend";
// import VerifyEmail from "../pages/VerifyEmail";
// import Contactus from "../pages/contactus/Contactus";
// import ValidateToken from "../pages/ValidateToken/ValidateToken";
import Nanobar from 'react-nanobarjs';


export default function App() {

  return (
    <BrowserRouter>

      <Switch>
        {/* <Route exact path="/" render={() => <Redirect to="/app/home" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/home" />}
        /> */}
        <PrivateRoute path="/app" component={withRouter(Layout)} />
        <PublicRoute path="/login" component={withRouter(Auth)} />
        <Route component={Error} />
      </Switch>
      <Nanobar progress={100} color="#ffffff" />

    </BrowserRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          localStorage.getItem('userMeta') ? (
            //  true ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          false ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
