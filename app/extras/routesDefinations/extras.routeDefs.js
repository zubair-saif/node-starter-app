const extrasRoute = require('../routes/extras.route')

module.exports = function (app) {
    app.use('/api/v1/extras', extrasRoute);
}