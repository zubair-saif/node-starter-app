const express = require('express');
const router = express.Router();
const extrasController = require('../controller/extras.controller');

// router.post('/create', uploadFiles, extrasController.create);

// router.put('/:id', uploadFiles, extrasController.update);

// router.get('/:id', extrasController.getOne);

// router.get('/', extrasController.list);

router.delete('/:id', extrasController.delete);

module.exports = router;  