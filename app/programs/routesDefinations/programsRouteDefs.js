const porgramsRoute = require('../routes/programsRoutes');

module.exports = function (app) {
    app.use('/api/v1/programs', porgramsRoute);

}