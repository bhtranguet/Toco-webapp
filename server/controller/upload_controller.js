var express = require('express');
var router = express.Router();
var multer = require('multer');

// Hàm sinh id ngẫu nhiên
var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

// image id name
var imgIDName = '';

// cấu hình vị trí lưu file
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './upload/real');
  },
  filename: function (req, file, callback) {
    imgIDName = ID() + '.' + file.originalname.split('.').pop();
    callback(null, imgIDName);
  }
})

// Định nghĩa hàm dùng để upload file
var upload = multer({ storage: storage }).single('myfile');

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err: err });
    }
    res.json({ success: true, data: imgIDName });
  })
})

module.exports = router;
