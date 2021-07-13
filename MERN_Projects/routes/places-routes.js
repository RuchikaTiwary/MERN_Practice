const express = require('express');
const { check } = require('express-validator');

const placesController = require('../controllers/places-controllers');

const router = express.Router();


router.get('/:pid', placesController.placesById);

router.get('/user/:uid', placesController.placesByUserId);

router.patch('/:pid', placesController.updatePlaces);
router.delete('/:pid', placesController.deletePlaces);

router.post('/', check('title').not().isEmpty(),
 placesController.createPlace);

module.exports = router;
