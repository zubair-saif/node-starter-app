const express = require('express');
const router = express.Router();
const programsController = require('../controller/programsController');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, + Date.now() + '.' + file.originalname
        .split('.')[file.originalname.split('.').length - 1]);
    }
})

let upload = multer({ storage: storage });

let uploadFiles = upload.fields([{
    name: 'mainImage',
    maxCount: 1
}, {
    name: 'icon',
    maxCount: 1
}, {
    name: 'breakfastImage',
    maxCount: 1
},
{
    name: 'lunchImage',
    maxCount: 1
},
{
    name: 'dinnerImage',
    maxCount: 1
}, {
    name: 'snackImage',
    maxCount: 1
}, {
    name: 'dessertImage',
    maxCount: 1
}]);

router.post('/create', uploadFiles, programsController.create);

router.put('/:id', uploadFiles, programsController.update);

router.get('/:id', programsController.getOne);

router.get('/', programsController.list);

router.delete('/:id', programsController.delete);


module.exports = router;    
