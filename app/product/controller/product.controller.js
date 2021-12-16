const { Product, validate } = require('../models/product.model');

exports.create = async (req, res) => {

    try {

        const create = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            inventory: req.body.inventory,
            category: req.body.category,
            itemImage: req.body.itemImage,
            // discount:req.body.discount
        });
        await create.save();
        res.json({ message: 'Successfully created'});
    }
    catch (e) {
        res.json({ message: 'Something went wrong ' + e });
    }
}