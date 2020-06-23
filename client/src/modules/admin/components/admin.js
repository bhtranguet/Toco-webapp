import React from 'react';
import '../styles/style.scss';
import {
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import AdminProduct from './admin-product';
import AdminProductCategory from './admin-product-category';

function Admin(props) {

  return (
    <div className='admin'>
      <div className='header'>
        <div className='left'>
          <img src='/images/logo.webp' alt='logo'/>
        </div>
        <div className='right'>
          <div className='login-name'>bhtrang</div>
          <div className='logout'>logout</div>
        </div>
      </div>
      <div className='main'>
        <div className='side-bar'>
          <div className='sidebar-content'>
            <Link className='sidebar-item' to="/admin/product">Sản phẩm</Link>
            <Link className='sidebar-item' to="/admin/product-category">Loại sản phẩm</Link>
          </div>
        </div>
        <div className='content'>
          <Switch>
            <Redirect exact from="/admin" to="/admin/product" />
            <Route path="/admin/product">
              <AdminProduct></AdminProduct>
            </Route>
            <Route path="/admin/product-category">
              <AdminProductCategory></AdminProductCategory>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Admin;
