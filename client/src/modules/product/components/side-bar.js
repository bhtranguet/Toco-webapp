import React from 'react';
class SideBar extends React.Component {
  render() {
    var menuItems = this.props.categories.map((category) => {
      return (
        <div key={category.id} className='item'>
          <div className='item'>{category.name}</div>
        </div>
      );
    })
    return (
      <div>
        <div className='menu'>MENU</div>
        {menuItems}
      </div>
    );
  }
}

export default SideBar;
