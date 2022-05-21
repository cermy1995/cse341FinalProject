const express = require('express');
const router = express.Router();

const dessertController = require('../controllers/dessert');

//Get routes
router.get('/', dessertController.getAllrecipes);

//maybe search by name instead?
router.get('/:id', dessertController.getSingleRecipe);

//POST routes to create a new contact
router.post('/', dessertController.createRecipe);

//PUT routes to update a contact
router.put('/:id', dessertController.updateRecipe);

//Delete route for removing a contact
router.delete('/:id', dessertController.deleteRecipe);

module.exports = router;