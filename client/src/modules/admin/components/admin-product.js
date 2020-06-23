import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AdminProductList from './admin-product-list';
import AdminProductDetail from './admin-product-detail';
class AdminProduct extends React.Component {
  render() {
    return (
      <div className='admin-product'>
        <Switch>
          <Redirect exact from="/admin/product" to="/admin/product/list" />
          <Route path="/admin/product/list">
            <AdminProductList></AdminProductList>
          </Route>
          <Route path="/admin/product/detail/:mode/:id" render={(props) => <AdminProductDetail {...props}></AdminProductDetail>} />
          <Route path="/admin/product/detail/:mode" render={(props) => <AdminProductDetail {...props}></AdminProductDetail>} />
        </Switch>
      </div>
    );
  }
}

export default AdminProduct;
