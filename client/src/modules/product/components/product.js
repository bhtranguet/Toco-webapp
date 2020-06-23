import React from 'react';
import '../styles/product.scss';
import SideBar from './side-bar'
import ProductCollection from './product-collection'
var ProductService = require('common/services/product.service');
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.service = new ProductService();
    this.state = {
      categories: [],
      collections: []
    };
  }

  async componentDidMount() {
    // Danh sách category, và collecton
    var categories = await (await this.service.getCategories()).json();
    var collections = await(await this.service.getAllCollection()).json();

    // set state
    this.setState({categories: categories, collections: collections});

  }

  render() {
    // danh sách collection
    var collections = this.state.categories.map((category, index) => {
      var products = this.state.collections.filter(item => item.categoryId === category.id)
      return (
        <ProductCollection category={category} key={category.id} products={products}></ProductCollection>
      );
    })
    return (
      <div className='product'>
        <div className='breadcumb'>
          <div className='text'>TOCOTOCO MENU</div>
        </div>
        <div className='main'>
          <div className='side-bar'>
            <SideBar categories={this.state.categories}></SideBar>
          </div>
          <div className='collections'>
            {collections}
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
