import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Home from 'modules/home/components/home';
import About from 'modules/about/about';
import Product from 'modules/product/components/product';
import AppHeader from 'modules/header/header';


function WebPage(props) {
  return (
    <div>
      <AppHeader></AppHeader>
      <Switch>
        <Route exact path="/webpage">
          <Home></Home>
        </Route>
        <Route path="/webpage/about">
          <About></About>
        </Route>
        <Route path="/webpage/product">
          <Product></Product>
        </Route>
      </Switch>
    </div>
  );
}

export default WebPage;
