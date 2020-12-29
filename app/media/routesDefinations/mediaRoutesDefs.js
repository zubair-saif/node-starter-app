const mediaRoute = require('../routes/mediaRoute')

module.exports = function (app) {
    app.use('/v1/api/media', mediaRoute);
}