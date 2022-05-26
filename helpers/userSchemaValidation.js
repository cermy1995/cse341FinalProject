const Joi = require('@hapi/joi')
//schema for post endpoint
const postSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    thirdPartyLink: Joi.string().uri()
})

//schema for post endpoint
const putSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    thirdPartyLink: Joi.string().uri()
})

module.exports = {
    postSchema,
    putSchema
}