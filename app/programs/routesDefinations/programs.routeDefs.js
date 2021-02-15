const porgramsRoute = require('../routes/programs.routes');

module.exports = function (app) {
    app.use('/api/v1/programs', porgramsRoute);

}