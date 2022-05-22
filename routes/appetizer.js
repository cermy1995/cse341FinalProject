const express = require('express');
const router = express.Router();

const appetizerController = require('../controllers/appetizer');

//Get routes
router.get('/', appetizerController.getAllAppetizer);

//maybe search by name instead?
router.get('/:id', appetizerController.getSingleAppetizer);

//POST routes to create a new contact
router.post('/', appetizerController.createAppetizer);

//PUT routes to update a contact
router.put('/:id', appetizerController.updateAppetizer);

//Delete route for removing a contact
router.delete('/:id', appetizerController.deleteAppetizer);

module.exports = router;

//TODO Change names to match appetizer api