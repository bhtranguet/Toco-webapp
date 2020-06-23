import React from 'react';
import ProductService from 'common/services/product.service';
import '../styles/admin-product-detail.scss';
import $ from 'jquery';
import ImageField from 'common/component/image-field';
class AdminProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.service = new ProductService();
    this.state = {
      product: {
        name: '',
        description: '',
        origin_price: 0,
        sale_price: 0,
        image_path: null
      },
      mode: 'add'
    }
  }

  async componentDidMount() {
    var id = this.props.match.params.id;
    var mode = this.props.match.params.mode;
    this.setState({
      mode: mode
    })
    switch (mode) {
      case 'view':
      case 'edit':
        var product = await (await this.service.getProductById(id)).json();
        this.setState({ product: product });
        break;
      default:
        break;
    }


  }

  handleChange(event) {
    var input = $(event.target);
    var fieldName = input.attr('name');
    var fieldValue = input.val();
    var product = this.state.product;
    product[fieldName] = fieldValue;
    this.setState({ product: product });
  }

  async handleAction(action) {
    var mode = this.props.match.params.mode;
    switch (action) {
      case 'back':
        if (mode === 'view') {
          this.props.history.push(`/admin/product/list`);
          break;
        }
        if (mode === 'edit') {
          this.setState({
            mode: 'view'
          })
        }
        this.props.history.goBack();
        break;
      case 'edit':
        this.props.history.push(`/admin/product/detail/edit/${this.state.product.id}`);
        this.setState({
          mode: 'edit'
        })
        break;
      case 'save':
        var result = await (await this.service.updateProduct(this.state.product)).json();
        if (result.success) {
          alert('Thành công');
        }
        this.props.history.push(`/admin/product/detail/view/${this.state.product.id}`);
        this.setState({
          mode: 'view'
        })
        break;
      case 'add':
        var result = await (await this.service.addProduct(this.state.product)).json();
        if (result.success) {
          alert('Thành công');
        }
        this.props.history.push(`/admin/product/detail/view/${this.state.product.id}`);
        this.setState({
          mode: 'view'
        })
        break;
      default:
        break;
    }
  }

  changeImage(imgName) {
    var product = this.state.product;
    product['image_path'] = imgName;
    this.setState({
      product: product
    })
  }

  render() {
    var disable = this.state.mode === 'view' ? 'disable' : '';
    var title = this.state.mode === 'add' ? 'Thêm mới sản phẩm' : this.state.product.name;
    var hideBtnSave = this.state.mode === 'view' || this.state.mode === 'add' ? 'hide' : '';
    var hideBtnEdit = this.state.mode === 'edit' || this.state.mode === 'add' ? 'hide' : '';
    var hideBtnAdd = this.state.mode !== 'add' ? 'hide' : '';

    return (
      <div className='admin-detail admin-detail-product'>
        <div className='title'>{title}</div>
        <div className='group-button'>
          <button type="button" className={`btn btn-success ${hideBtnAdd}`} onClick={e => this.handleAction('add')}>Thêm</button>
          <button type="button" className={`btn btn-success ${hideBtnSave}`} onClick={e => this.handleAction('save')}>Lưu</button>
          <button type="button" className={`btn btn-primary ${hideBtnEdit}`} onClick={e => this.handleAction('edit')}>Sửa</button>
          <button type="button" className={`btn btn-secondary`} onClick={e => this.handleAction('back')}>Quay lại</button>
        </div>
        <div className='detail-content'>
          <form>
            <div className='form-group'>
              <label htmlFor="name">Tên sản phẩm</label>
              <input type="text" className={`form-control ${disable}`} name="name" placeholder="Tên sản phẩm" value={this.state.product.name} onChange={this.handleChange.bind(this)}></input>
            </div>
            <div className='form-group'>
              <label htmlFor="description">Mô tả</label>
              <input type="text" className={`form-control ${disable}`} name="description" placeholder="Mô tả" value={this.state.product.description} onChange={this.handleChange.bind(this)}></input>
            </div>
            <div className='form-group'>
              <label htmlFor="origin_price">Giá gốc</label>
              <input type="number" className={`form-control ${disable}`} name="origin_price" placeholder="Giá gốc" value={this.state.product.origin_price} onChange={this.handleChange.bind(this)}></input>
            </div>
            <div className='form-group'>
              <label htmlFor="sale_price">Giá sale</label>
              <input type="number" className={`form-control ${disable}`} name="sale_price" placeholder="Giá sale" value={this.state.product.sale_price} onChange={this.handleChange.bind(this)}></input>
            </div>
            <div className='form-group'>
              <label htmlFor="sale_price">Ảnh sản phẩm</label>
              <ImageField imgName={this.state.product.image_path} disable={disable} changeImage={this.changeImage.bind(this)}></ImageField>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminProductDetail;
