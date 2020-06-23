import React from 'react';
import '../styles/imge-field.scss';
import $ from 'jquery';
class ImageField extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      imgName: 'milk-tea.jpg'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imgName !== null && nextProps.imgName !== 'null' && nextProps.imgName !== this.state.imgName) {
      this.setState({ imgName: nextProps.imgName });
    }
  }

  handleClickBtnEdit(e) {
    var input = $(this.input.current);
    input.click();
  }

  onFileSelected(e) {
    var selectedFile = e.target.files[0];
    var formData = new FormData();
    formData.append('myfile', selectedFile);
    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData
    })
    .then((response) => response.json())
    .then(response => {
      this.setState({
        imgName: response.data
      })
      this.props.changeImage(response.data);
    })
  }

  render() {
    return (
      <div className={`image-field ${this.props.disable}`}>
        <img src={`http://localhost:8000/upload/real/${this.state.imgName}`} />
        <div className='btn-edit' onClick={this.handleClickBtnEdit.bind(this)}>Thay đổi</div>
        <input ref={this.input} type="file" id="img" name="img" accept="image/*" onChange={this.onFileSelected.bind(this)} />
      </div>
    );
  }
}

export default ImageField;
