import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
function AppHeader(props) {
    return (
        <div className='app-header'>
            <div className='wrapper'>
                <div className='logo'>
                    <img src='/images/logo.webp' alt='logo'></img>
                </div>
                <div className='menu'>
                    <Link className='menu-item' to="/webpage">TRANG CHỦ</Link>
                    <Link className='menu-item' to="/webpage/about">GIỚI THIỆU</Link>
                    <Link className='menu-item' to="/webpage/product">SẢN PHẨM</Link>
                    <Link className='menu-item' to="/webpage/blog">TIN TỨC</Link>
                    <Link className='menu-item' to="/webpage/store">CỬA HÀNG</Link>
                    <Link className='menu-item' to="/webpage/tuyen-dung">TUYỂN DỤNG</Link>
                    <Link className='menu-item' to="/webpage/nhuong-quyen">NHƯỢNG QUYỀN</Link>
                </div>
                <div className='btn-search'>
                </div>
            </div>
        </div>
    );
}

export default AppHeader;
