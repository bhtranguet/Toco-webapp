import React from 'react';
import ProductCard from './product-card';
class ProductCollection extends React.Component {
  render() {
    var products = this.props.products.map((product, index) => {
      return (
        <ProductCard product={product} key={product.id}></ProductCard>
      )
    })
    return (
      <div className='product-collection'>
        <div className='product-collection-header'>
          <div className='title'>{this.props.category.name}</div>
          <div className='view-all'>Xem tất cả {'>>'}</div>
        </div>
        <div className='product-collection-content'>
          {products}
        </div>
      </div>
    );
  }
}

export default ProductCollection;
