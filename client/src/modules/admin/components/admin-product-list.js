import React from 'react';
import Grid from 'common/component/grid';
import '../styles/admin-list-product.scss';
import history from 'common/base/history';
var ProductService = require('common/services/product.service');
class AdminProductList extends React.Component {
  constructor(props) {
    super(props);
    this.service = new ProductService();
    this.grid = React.createRef();
    this.state = {
      gridCol: [
        {
          data: "name",
          title: 'Tên',
          dataType: 'text'
        },
        {
          data: "description",
          title: 'Mô tả',
          dataType: 'text'
        },
        {
          data: "origin_price",
          title: 'Nguyên giá',
          dataType: 'number'
        },
        {
          data: "sale_price",
          title: 'Giá bán',
          dataType: 'number'
        },
        {
          data: "image_path",
          title: 'Ảnh',
          dataType: 'text'
        },
        {
          data: "catName",
          title: 'Loại',
          dataType: 'text'
        }
      ],
      gridUrl: `http://localhost:8000/api/product_controller/products`,
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
      history.push(`/admin/product/detail/add`);
    } else {
      history.push(`/admin/product/detail/${mode}/${id}`, { id: id, mode: 'view' });
    }
  }

  render() {
    var disableEditClass = this.state.isEnableEdit ? '' : 'disable';
    var disableDeleteClass = this.state.isEnableDelete ? '' : 'disable';
    return (
      <div className='admin-list admin-list-product'>
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

export default AdminProductList;
