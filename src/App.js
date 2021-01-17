/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignIn from './vistas/Login';
import MenuPrincipal from './vistas/MenuTabs';

export default function App() {
  const [remember] = useState(false);


  


  return (



    <Router>
      {remember ? <Redirect to="/menu"/> :""}


      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>


        <Route path="/menu">
           <MenuPrincipal /> 
        </Route>
        <Route path="/">
          <SignIn />
        </Route>


      </Switch>

    </Router>
  );
}
