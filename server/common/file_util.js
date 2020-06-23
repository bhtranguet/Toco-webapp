var fs = require('fs')

class FileUtil {
  rename(oldPath, newPath) {
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err
      console.log('Successfully move')
    })
  }
}
module.exports = FileUtil;
