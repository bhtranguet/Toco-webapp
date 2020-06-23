import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AdminProductCategoryList from './admin-product-category-list';
import AdminProductCategoryDetail from './admin-product-category-detail';
class AdminProductCategory extends React.Component {
  render() {
    return (
      <div className='admin-product-category'>
        <Switch>
          <Redirect exact from="/admin/product-category" to="/admin/product-category/list" />
          <Route path="/admin/product-category/list">
            <AdminProductCategoryList></AdminProductCategoryList>
          </Route>
          <Route path="/admin/product-category/detail/:mode/:id" render={(props) => <AdminProductCategoryDetail {...props}></AdminProductCategoryDetail>} />
          <Route path="/admin/product-category/detail/:mode" render={(props) => <AdminProductCategoryDetail {...props}></AdminProductCategoryDetail>} />
        </Switch>
      </div>
    );
  }
}

export default AdminProductCategory;
