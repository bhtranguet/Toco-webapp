import React from 'react';
import Grid from 'common/component/grid';
import history from 'common/base/history';
var ProductService = require('common/services/product.service');
class AdminProductCategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.service = new ProductService();
    this.grid = React.createRef();
    this.state = {
      gridCol: [
        {
          data: "id",
          title: 'Id',
          dataType: 'text'
        },
        {
          data: "name",
          title: 'Tên loại',
          dataType: 'text'
        }
      ],
      gridUrl: `http://localhost:8000/api/product_controller/categories`,
      isEnableEdit: false,
      isEnableDelete: false
    };
  }

  executeCustomEvent(event, grid) {
    switch (event) {
      case 'row-click':
        var numberRowSelected = 0;
        grid.state.data.forEach(item => {
          if (item['isSelected']) {
            numberRowSelected++;
          }
        });
        var isEnableDelete = numberRowSelected > 0 ? true : false;
        var isEnableEdit = numberRowSelected === 1 ? true : false;
        this.setState({ isEnableEdit: isEnableEdit, isEnableDelete: isEnableDelete });
        break;

      default:
        break;
    }
  }

  navigateProductDetail(mode) {
    var product = this.grid.current.state.data.find(item => item.isSelected === true);
    var id = product ? product.id : 1;
    if (mode == 'add') {
      history.push(`/admin/product-category/detail/add`);
    } else {
      history.push(`/admin/product-category/detail/${mode}/${id}`, { id: id, mode: 'view' });
    }
  }

  render() {
    var disableEditClass = this.state.isEnableEdit ? '' : 'disable';
    var disableDeleteClass = this.state.isEnableDelete ? '' : 'disable';
    return (
      <div className='admin-list admin-list-product-category'>
        <div className='title'>Danh sách sản phẩm</div>
        <div className='group-button'>
          <button type="button" className={`btn btn-success`} onClick={e => this.navigateProductDetail('add')}>Thêm</button>
          <button type="button" className={`btn btn-primary ${disableEditClass}`} onClick={e => this.navigateProductDetail('edit')}>Sửa</button>
          <button type="button" className={`btn btn-info ${disableEditClass}`} onClick={e => this.navigateProductDetail('view')}>Xem</button>
          <button type="button" className={`btn btn-danger ${disableDeleteClass}`}>Xóa</button>
        </div>
        <div className='grid-container'>
          <Grid ref={this.grid} url={this.state.gridUrl} columns={this.state.gridCol} height={500} executeCustomEvent={this.executeCustomEvent.bind(this)}></Grid>
        </div>
      </div>
    );
  }
}

export default AdminProductCategoryList;
