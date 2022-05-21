const express = require('express');
const router = express.Router();

const appetizerController = require('../controllers/main');

//Get routes
router.get('/', appetizerController.getAllRecipes);

//maybe search by name instead?
router.get('/:id', appetizerController.getSingleRecipe);

//POST routes to create a new contact
router.post('/', appetizerController.createRecipe);

//PUT routes to update a contact
router.put('/:id', appetizerController.updateRecipe);

//Delete route for removing a contact
router.delete('/:id', appetizerController.deleteRecipe);

module.exports = router;

//TODO Change names to match appetizer api