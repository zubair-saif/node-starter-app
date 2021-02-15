const { required } = require("joi");

const Extras = require('../models/extras.model');


/**
 * delete programs
*/
module.exports.delete = async (req, res) => {
    try {

        const deleteExtras = await Extras.findByIdAndRemove(req.params.id);
        if (!deleteExtras) {
            return res.json({ message: "programs not found " });
        }
        res.json({ message: 'Porgrams Deleted' });
    }
    catch (e) {
        res.json({ message: 'something went wrong ' + e });
    }
};