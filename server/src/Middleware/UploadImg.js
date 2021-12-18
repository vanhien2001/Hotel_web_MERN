const multer = require('multer');
var path = require('path')

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
        callback(null, './public/images');
    },

    //add back the extension
    filename: function (req, file, callback) {
        callback(null, req.body.name + '-' + Date.now() + path.extname(file.originalname));
    },
});

module.exports = multer({ storage: storage })