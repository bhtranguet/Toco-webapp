import React from 'react';
import '../styles/home.scss';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <div className='home-main-slider'>
          <OwlCarousel
            className="owl-theme"
            loop
            dots={false}
            items={1}
            autoplay
            autoplayTimeout={3000}>
            <div className="item slide-1">
              <div className='text-one'>
                ToCoToCo Tea
						  </div>
              <div className="slide-bold-text">
                Trà sữa của hạnh phúc
						  </div>
              <div className="slide-light-text">
                Với sứ mệnh mang tới niềm vui và hạnh phúc, TocoToco hy vọng sẽ tạo nên một nét văn hóa giải trí bên cạnh ly trà sữa Ngon – sạch – tươi.
						  </div>
              <div className="slide-btn">
                <a href="/collections/all" className="slide-btn2">Đặt hàng ngay</a>
              </div>
            </div>
            <div className="item slide-2"></div>
            <div className="item slide-3"></div>
          </OwlCarousel>
        </div>
        
      </div>
    );
  }
}

export default Home;
