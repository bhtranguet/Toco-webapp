import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Admin from 'modules/admin/components/admin';
import WebPage from 'modules/webpage/webpage';
import history from 'common/base/history';

function App() {
  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          <Redirect exact from="/" to="/webpage" />
          <Route path="/webpage" component={WebPage} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
