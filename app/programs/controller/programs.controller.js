'use strict';
const fs = require('fs');
const { Programs, validate } = require('../models/programs.model');

/**
 * @create new program with file upload
 * @validation joi validation for validating the data  
*/
exports.create = async (req, res) => {

    try {
        const result = validate(req.body);
        if (result.error) {
            res.status(400).json({
                message: result.error.details[0].message
            });
            return;
        }

        let images = [];
        if (Object.keys(req.files).length > 0) {
            Object.keys(req.files).forEach((value) => {
                req.files[value].forEach((v) => {
                    const url = req.protocol + '://' + req.get('host');
                    let imagePOJO = {
                        filePath: (url + '/upload/' + v.filename),
                        fieldName: v.fieldname
                    }
                    images.push(imagePOJO);
                })
            });

        }

        const create = await Programs.create({
            name: req.body.name,
            masterPlan: req.body.masterPlan,
            parentProgram: req.body.parentProgram,
            description: req.body.description,
            mealFlavor: req.body.mealFlavor,
            meals: req.body.meals,
            mealVariety: req.body.mealVariety,
            calories: req.body.calories,
            mealPlan: req.body.mealPlan,
            images: images,
            imagesDescription: JSON.parse(req.body.imagesDescription),
            mealCredits: JSON.parse(req.body.mealCredits)
        });
        await create.save();
        res.json({ message: 'Successfully programs created' });
    }
    catch (e) {
        res.json({ message: 'Something went wrong ' + e });
    }
}

/**
 * update programs
*/
exports.update = async (req, res) => {
    try {
        const result = validate(req.body);
        if (result.error) {
            res.status(400).json({ message: result.error.details[0].message });
            return;
        }
        let images = [];
        if (Object.keys(req.files).length > 0) {
            Object.keys(req.files).forEach((value) => {
                req.files[value].forEach((v) => {
                    const url = req.protocol + '://' + req.get('host');
                    let imagePOJO = {
                        filePath: (url + '/upload/' + v.filename),
                        fieldName: v.fieldname
                    }
                    images.push(imagePOJO);
                })
            });

        }
        const update = {
            name: req.body.name,
            masterPlan: req.body.masterPlan,
            parentProgram: req.body.parentProgram,
            description: req.body.description,
            mealFlavor: req.body.mealFlavor,
            meals: req.body.meals,
            mealVariety: req.body.mealVariety,
            calories: req.body.calories,
            mealPlan: req.body.mealPlan,
            images: images,
            imagesDescription: JSON.parse(req.body.imagesDescription),
            mealCredits: JSON.parse(req.body.mealCredits)
        };
        const updatePorgram = await Programs.findByIdAndUpdate(req.params.id, {
            $set: update
        }, { new: true });

        res.status(200).json({
            updateData: updatePorgram,
            message: 'Programs updated successfully'
        });
    }
    catch (e) {
        res.json({ message: 'Something went wrong ' + e });
    }
}

/**
 * getOne programs
*/
exports.getOne = async (req, res) => {
    try {
        const singlePrograms = await Programs.findOne({ _id: req.params.id })
            .populate('parentProgram', 'name').lean();

        if (!singlePrograms) {
            return res.json({ message: "Programs not found" });
        }
        return res.status(200).json(singlePrograms);
    } catch (e) {
        res.json({ message: 'Something went wrong ' + e });
    }

}

/**
 * list programs
*/
exports.list = async (req, res) => {
    try {
        const list = await Programs.find({}).populate('parentProgram');
        if (!list) {
            res.json({ message: "Programs not found" });
        }
        res.json({ programList: list });
    }
    catch (e) {
        res.json({ message: 'Something went wrong ' + e });
    }

}

/**
 * delete programs
*/
exports.delete = async (req, res) => {
    try {
        const record = await Programs.findOne({ _id: req.params.id }).lean();
        if (record) {
            for await (const iterator of record.images) {
                let filename = iterator.filePath.split('/');
                filename = filename[filename.length - 1];
                filename = 'uploads/' + filename;
                await fs.unlinkSync(filename);
            }
        }
        const deletePorgrams = await Programs.findByIdAndRemove(req.params.id);
        if (!deletePorgrams) {
            return res.json({ message: "programs not found " });
        }
        res.json({ message: 'Porgrams Deleted' });
    }
    catch (e) {
        res.json({ message: 'something went wrong ' + e });
    }
};