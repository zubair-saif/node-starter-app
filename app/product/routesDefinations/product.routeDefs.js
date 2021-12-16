const productRoute = require('../routes/product.route');

module.exports = function (app) {
    app.use('/api/v1/product', productRoute);

}