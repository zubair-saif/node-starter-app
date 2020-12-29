const express = require('express');
const path = require('path');
const config = require('dotenv').config({ path: './.env' });
const cors = require('cors');
const compression = require('compression');
const colors = require('colors');
const app = express();
const morgan = require('morgan');
const connectDB = require('./config/db');
const error = require('./middleware/errorHandler');

app.use(compression());
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// enable cors
app.use(cors());

// Mount routers
require('./app/media/routesDefinations/mediaRoutesDefs')(app);
require('./app/programs/routesDefinations/programsRouteDefs')(app);
require('./app/extras/routeDefinations/extrasRouteDefs')(app);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
connectDB();

app.use(error);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
});