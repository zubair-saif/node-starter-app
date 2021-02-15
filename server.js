const express = require('express');
const path = require('path');
const config = require('dotenv');
const cors = require('cors');
const compression = require('compression');
const colors = require('colors');
const app = express();
const morgan = require('morgan');
const connectDB = require('./config/db');
const error = require('./middleware/error.middleware');
const { hostname } = require('os');

app.use(compression());
app.use(express.json());

//Load envirnoment variable 
config.config({ path: './.env' });

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// enable cors
app.use(cors());

// Mount routers
require('./app/media/routesDefinations/media.routesDefs')(app);
require('./app/programs/routesDefinations/programs.routeDefs')(app);
require('./app/extras/routesDefinations/extras.routeDefs')(app);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
connectDB();

app.use(error);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`.yellow
    );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
});