const mongoose = require('mongoose');
const joi = require('joi');

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    masterPlan: {
        type: Boolean,
    },
    parentProgram: {
        type: String, ref: 'programs'
    },
    description: {
        type: String,
    },
    mealFlavor: {
        type: String,
    },
    meals: {
        type: String,
    },
    mealVariety: {
        type: String,
    },
    calories: {
        type: String,
    },
    mealPlan: {
        type: String,
    },
    images: [{
        filePath: String,
        fieldName: String
    }],
    imagesDescription: {},
    mealCredits: [{
        credits: Number,
        name: String,
        breakfast: Number,
        lunch: Number,
        dinner: Number,
        snack: Number,
        dessert: Number,
        price: Number,
    }]

}, { versionKey: false, timestamps: true });


function validate(programs) {
    const schema = joi.object({
        name: joi.string().required(),
        masterPlan: joi.string().optional(),
        parentProgram: joi.string(),
        description: joi.string().optional(),
        mealFlavor: joi.string().optional(),
        meals: joi.string().optional(),
        mealVariety: joi.string().optional(),
        calories: joi.string().optional(),
        mealPlan: joi.string().optional(),
        imagesDescription: joi.string().optional(),
        mealCredits: joi.string().optional(),
    });
    return schema.validate(programs);
}

const Programs = mongoose.model('programs', schema);
module.exports.validate = validate;
module.exports.Programs = Programs;