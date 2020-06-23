import React from 'react';
import ProductService from 'common/services/product.service';
import '../styles/admin-product-detail.scss';
import $ from 'jquery';
import ImageField from 'common/component/image-field';
class AdminProductCategoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.service = new ProductService();
    this.state = {
      product: {
        id: 0,
        name: ''
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
        var product = await (await this.service.getCategoryById(id)).json();
        debugger
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
          this.props.history.push(`/admin/product-category/list`);
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
        this.props.history.push(`/admin/product-category/detail/edit/${this.state.product.id}`);
        this.setState({
          mode: 'edit'
        })
        break;
      case 'save':
        var result = await (await this.service.updateProduct(this.state.product)).json();
        if (result.success) {
          alert('Thành công');
        }
        this.props.history.push(`/admin/product-category/detail/view/${this.state.product.id}`);
        this.setState({
          mode: 'view'
        })
        break;
      case 'add':
        var result = await (await this.service.addProduct(this.state.product)).json();
        if (result.success) {
          alert('Thành công');
        }
        this.props.history.push(`/admin/product-category/detail/view/${this.state.product.id}`);
        this.setState({
          mode: 'view'
        })
        break;
      default:
        break;
    }
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
              <label htmlFor="name">Tên loại</label>
              <input type="text" className={`form-control ${disable}`} name="name" placeholder="Tên sản phẩm" value={this.state.product.name} onChange={this.handleChange.bind(this)}></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminProductCategoryDetail;
