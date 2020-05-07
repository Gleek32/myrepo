const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
//used to create a custom logger
//const logger = require('./middleware/logger')

//load env var
dotenv.config({path: './config/config.env'});


// Connect to a database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//body Parser
app.use(express.json);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//used to create a custom logger
//app.use(logger);

// Mount Routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

  
// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server & exit process
server.close(() => process.exit(1));


});

