const Joi = require('@hapi/joi')
//schema for post endpoint
const postSchema = Joi.object({
    title: Joi.string().lowercase().required(),
    ingredients: Joi.string().required(),
    directions: Joi.string().required(),
    dateAdded: Joi.date().required(),
    dateModified: Joi.date().required(),
    author: Joi.string().required(),
    neededUtensils: Joi.string().required()
})

//schema for post endpoint
const putSchema = Joi.object({
    title: Joi.string().lowercase(),
    ingredients: Joi.string(),
    directions: Joi.string(),
    dateAdded: Joi.date(),
    dateModified: Joi.date().required(),
    author: Joi.string(),
    neededUtensils: Joi.string()
})

module.exports = {
    postSchema,
    putSchema
}