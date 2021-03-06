const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const {postSchema} = require('../helpers/recipeSchemaValidation');
const {putSchema} = require('../helpers/recipeSchemaValidation');


//function for getting all appetizer course recipe records from mongodb
const getAllAppetizer = async (req, res, next) => {
  try{
    const payload = await mongodb
    .getDb()
    .db()
    .collection('appetizer')
    .find();
    payload.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
    console.log(payload);
  } catch (error) {
    res.status(400).json(res.error || 'An error occured fetching appetizer course recipes.');
  }
    
};

//Possibly search for a list of recipes that match a keyword?
const getSingleAppetizer = async (req, res, next) => {
  try{
    const recordId = new ObjectId(req.params.id);
    const payload = await mongodb
    .getDb()
    .db()
    .collection('appetizer')
    //possibly find by recipe name instead.
    .find({ _id: recordId});
    payload.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(400).json(res.error || 'An error occured fetching recipe. Please check recipe Id.');
  }
    
};

//function for createing a new recipe record
const createAppetizer = async (req, res) => {
  try{
    console.log("starting db connection");
    const appetizer = await postSchema.validateAsync(req.body);
    console.log("made it here!");
    console.log(req.body);
    const response = await mongodb
        .getDb()
        .db()
        .collection('appetizer')
        .insertOne(appetizer);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An Error has occurred creating new Appetizer recipe record.');
    }
  } catch(error) {
    res.status(400).json(res.error || 'An Error has occurred creating Appetizer new recipe record. Please check required fields.');
  }
    
};

//function for updating a current cattle record
const updateAppetizer = async (req, res) => {
  try{
    const recordId = new ObjectId(req.params.id);
    const recipeRecord = await putSchema.validateAsync(req.body);
    const response = await mongodb
      .getDb()
      .db()
      .collection('appetizer')
      .replaceOne({ _id: recordId }, recipeRecord);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the Appetizer record.');
    }
  } catch (error) {
    res.status(400).json(res.error || 'An error occurred attempting to update Appetizer recipe record. Please check your Record Id, and that current date is included.');
  }
    
  };

  //function to delete a single recipe record via Id
  const deleteAppetizer = async (req, res) => {
    try{
      const recordId = new ObjectId(req.params.id);
      const response = await mongodb
          .getDb()
          .db()
          .collection('appetizer')
          .remove({ _id: recordId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'An error occured attempting to delete Appetizer recipe record.');
      }
    } catch(error) {
      res.status(400).json(res.error || 'An error occured attempting to delete Appetizer recipe record. Please check your record Id.');
    }
    
  };


module.exports = {
    getAllAppetizer, 
    getSingleAppetizer,
    createAppetizer,
    updateAppetizer,
    deleteAppetizer
};