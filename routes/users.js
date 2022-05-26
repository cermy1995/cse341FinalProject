const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

//Get routes
router.get('/:id', userController.getSingleUser);

//POST routes to create a new contact
router.post('/', userController.createUser);

//PUT routes to update a contact
router.put('/:id', userController.updateContact);  

//Delete route for removing a contact
router.delete('/:id', userController.deleteUser);

module.exports = router;