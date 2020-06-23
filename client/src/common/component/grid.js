import React from 'react';
import 'common/styles/grid.scss';
import $ from 'jquery';
class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: []
    }
  }

  executeEvent(event) {
    var target = $(event.currentTarget);
    // Xử lý xự kiện tương tác vs grid row
    if (target.hasClass('grid-row')) {
      switch (event.type) {
        case 'click':
          // lấy id product và đổi lại trạng thái
          var productId =  parseInt(target.attr('id'));
          var product = this.state.data.find(p => p.id === productId);
          product['isSelected'] = product['isSelected'] ? false : true;
          this.setState({data: this.state.data})

          // gọi function executeCustomEvent ở lớp cha
          this.props.executeCustomEvent('row-click', this);
          break;
        case 'dbclick':
          break;
        default:
          break;
      }
    }
  }

  async componentDidMount() {
    this.props.columns.forEach(column => {
      if (column['dataType'] === undefined) {
        column['dataType'] = 'text';
      }
      switch (column['dataType']) {
        case 'text':
          if (column['width'] === undefined) {
            column['width'] = 200;
          }
          break;
        case 'number':
          if (column['width'] === undefined) {
            column['width'] = 150;
          }
          break;
        default:
          break;
      }
    });

    // Lấy dữ liệu data
    var data = await (await fetch(this.props.url)).json();
    this.setState({
      columns: this.props.columns,
      data: data
    });

  }

  render() {
    var gridHeight = this.props.height ? this.props.height + 'px' : '100%';
    return (
      <div className='grid' style={{ height: `${gridHeight}` }}>
        <GridHeader columns={this.state.columns}></GridHeader>
        <GridContent columns={this.state.columns} data={this.state.data} executeEvent={this.executeEvent.bind(this)}></GridContent>
      </div>
    );
  }
}

function GridHeader(props) {
  var headerItems = props.columns.map((item, index) => {
    return (
      <div key={index} className='header-item' style={{ minWidth: `${item.width}px` }}>
        {item.title}
      </div>
    )
  })
  return (
    <div className='grid-header'>
      {headerItems}
    </div>
  )
}

function GridContent(props) {

  var rows = props.data.map((row, index) => {
    // Cell của row
    var cells = props.columns.map((column, index) => {
      return (
        <div key={index} className='grid-cell' style={{ minWidth: `${column.width}px`, maxWidth: `${column.width}px` }}>{row[column.data]}</div>
      )
    })
    // return 1 row
    var selected = row.isSelected ? 'selected' : '';
    return (
      <div id={row.id} key={index} className={`grid-row ${selected}` } onClick={event => props.executeEvent(event)} onDoubleClick={event => props.executeEvent(event)}>{cells}</div>
    )
  })
  return (
    <div className='grid-content'>
      {rows}
    </div>
  )
}

export default Grid;
