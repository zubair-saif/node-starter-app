const mediaRoute = require('../routes/media.route')

module.exports = function (app) {
    app.use('/v1/api/media', mediaRoute);
}