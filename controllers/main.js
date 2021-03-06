const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const {postSchema} = require('../helpers/recipeSchemaValidation');
const {putSchema} = require('../helpers/recipeSchemaValidation');


//function for getting all main course recipe records from mongodb
const getAllRecipes = async (req, res, next) => {
  try{
    const payload = await mongodb
    .getDb()
    .db()
    .collection('main')
    .find();
    payload.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
    console.log(payload);
  } catch (error) {
    res.status(400).json(res.error || 'An error occured fetching main course recipes.');
  }
    
};

//Possibly search for a list of recipes that match a keyword?
const getSingleRecipe = async (req, res, next) => {
  try{
    const recordId = new ObjectId(req.params.id);
    const payload = await mongodb
    .getDb()
    .db()
    .collection('main')
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
const createRecipe = async (req, res) => {
  try{
    const recipe = await postSchema.validateAsync(req.body);
    console.log("made it here!");
    console.log(req.body);
    const response = await mongodb
        .getDb()
        .db()
        .collection('main')
        .insertOne(recipe);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An Error has occurred creating new recipe record.');
    }
  } catch(error) {
    res.status(400).json(res.error || 'An Error has occurred creating new recipe record. Please check required fields.');
  }
    
};

//function for updating a current cattle record
const updateRecipe = async (req, res) => {
  try{
    const recordId = new ObjectId(req.params.id);
    const recipeRecord = await putSchema.validateAsync(req.body);
    const response = await mongodb
      .getDb()
      .db()
      .collection('main')
      .replaceOne({ _id: recordId }, recipeRecord);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the record.');
    }
  } catch (error) {
    res.status(400).json(res.error || 'An error occurred attempting to update recipe record. Please check your Record Id, and that current date is included.');
  }
    
  };

  //function to delete a single recipe record via Id
  const deleteRecipe = async (req, res) => {
    try{
      const recordId = new ObjectId(req.params.id);
      const response = await mongodb
          .getDb()
          .db()
          .collection('main')
          .remove({ _id: recordId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'An error occured attempting to delete recipe record.');
      }
    } catch(error) {
      res.status(400).json(res.error || 'An error occured attempting to delete recipe record. Please check your record Id.');
    }
    
  };


module.exports = {
    getAllRecipes, 
    getSingleRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
};