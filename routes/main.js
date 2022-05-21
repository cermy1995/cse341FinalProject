const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');

//Get routes
router.get('/', mainController.getAllrecipes);

//maybe search by name instead?
router.get('/:id', mainController.getSingleRecipe);

//POST routes to create a new contact
router.post('/', mainController.createRecipe);

//PUT routes to update a contact
router.put('/:id', mainController.updateRecipe);

//Delete route for removing a contact
router.delete('/:id', mainController.deleteRecipe);

module.exports = router;