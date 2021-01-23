const multer = require('multer');

module.exports.programs = function (req, res, next) {
    try {
        let storage = multer.diskStorage({
            destination: 'uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
            }
        })
        let upload = multer({ storage: storage }).any('media');
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}