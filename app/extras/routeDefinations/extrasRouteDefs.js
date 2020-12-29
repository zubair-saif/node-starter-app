const extrasRoute = require('../routes/extrasRoute')

module.exports = function (app) {
    app.use('/api/v1/extras', extrasRoute);
}