const mongoose = require('mongoose');
const joi = require('joi');

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    profilePic: {
        type: String,
    },


}, { versionKey: false, timestamps: true });


function validate(users) {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        bio: joi.string().optional(),
        profilePic: joi.string().optional(),
    });
    return schema.validate(users);
}

const Users = mongoose.model('users', schema);
module.exports.validate = validate;
module.exports.Users = Users;