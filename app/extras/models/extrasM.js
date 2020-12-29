const mongoose = require('mongoose');
const joi = require('joi');

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    extrasIcon: {
        type: String
    },
    description: {
        type: String
    }
}, {
    versionKey: false,
});

function validate(extras) {
    const schema = joi.object({
        name: joi.string().required(),
        price: joi.string().required(),
        extrasIcon: joi.string(),
        description: joi.string().optional(),
    });
    return schema.validate(extras);
}
module.exports.validate = validate;
const Extras = mongoose.model('extras', schema);
module.exports.Extras = Extras;