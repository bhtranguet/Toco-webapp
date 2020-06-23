import React from 'react';
class ProductCard extends React.Component {
  render() {
    var imagePath = this.props.product.image_path === null || this.props.product.image_path === 'null' ? 'milk-tea.jpg' : this.props.product.image_path;
    return (
      <div className='product-card'>
        <div className='image'>
          <img src={`http://localhost:8000/upload/real/${imagePath}`} alt='img' />
          <div className='sale-off'>{Math.ceil(parseInt(this.props.product.sale_price)*100/parseInt(this.props.product.origin_price))}%</div>
        </div>
        <div className='content'>
          <div className='product-name'>{this.props.product.name}</div>
          <div className='product-price'>
            <div className='sale-price'>{parseInt(this.props.product.sale_price)}đ</div>
            <div className='origin-price'>{parseInt(this.props.product.origin_price)}đ</div>
          </div>
          <div className='group-button'>
            <div className='btn btn-left'>Đặt ngay</div>
            <div className='btn btn-right'>Xem chi tiết</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
