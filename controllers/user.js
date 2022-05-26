const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const {postSchema} = require('../helpers/userSchemaValidation');
const {putSchema} = require('../helpers/userSchemaValidation');


//Possibly search for a list of recipes that match a keyword?
const getSingleUser = async (req, res, next) => {
  try{
    const recordId = new ObjectId(req.params.id);
    const payload = await mongodb
    .getDb()
    .db()
    .collection('user')
    //possibly find by recipe name instead.
    .find({ _id: recordId});
    payload.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(400).json(res.error || 'An error occured fetching user. Please check user Id.');
  }
    
};

//function for createing a new recipe record
const createUser = async (req, res) => {
  try{
    console.log("starting db connection");
    const user = await postSchema.validateAsync(req.body);
    console.log("made it here!");
    console.log(req.body);
    const response = await mongodb
        .getDb()
        .db()
        .collection('user')
        .insertOne(user);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An Error has occurred creating new User record.');
    }
  } catch(error) {
    res.status(400).json(res.error || 'An Error has occurred creating User record. Please check required fields.');
  }
    
};

//function for updating a current cattle record
const updateContact = async (req, res) => {
  try{
    const recordId = new ObjectId(req.params.id);
    const userRecord = await putSchema.validateAsync(req.body);
    const response = await mongodb
      .getDb()
      .db()
      .collection('user')
      .replaceOne({ _id: recordId }, userRecord);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occurred while updating the User record.');
    }
  } catch (error) {
    res.status(400).json(res.error || 'An error occurred attempting to update User record. Please check your Record Id');
  }
    
  };

  //function to delete a single recipe record via Id
  const deleteUser = async (req, res) => {
    try{
      const recordId = new ObjectId(req.params.id);
      const response = await mongodb
          .getDb()
          .db()
          .collection('user')
          .remove({ _id: recordId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'An error occured attempting to delete User record.');
      }
    } catch(error) {
      res.status(400).json(res.error || 'An error occured attempting to delete User record. Please check your record Id.');
    }
    
  };


module.exports = {
    getSingleUser,
    createUser,
    updateContact,
    deleteUser
};