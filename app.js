//jshint esversion:6
require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const logger = require('./helpers/logger');
const indexRoutes = require('./routes');
const { sendResponse } = require('./helpers/local.helper');

const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

// Middleware
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Specify the allowed origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use('/api/', indexRoutes);

// Example route to actuator health 
app.get('/actuator/health', (req, res) => {
  logger.info("Actuator health");
  return sendResponse(res, 200, 200, "Up");
});

app.all("*", function (req, res) { 
  const requestedUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  logger.info(`Page Not Found: ${requestedUrl}`);
  return sendResponse(res, 200, 200, "Page Not Found"); 
});

// // Error handling middleware
// app.use((err, req, res, next) => {
//   logger.error(err.message);
//   res.status(500).send('Something went wrong!');
// });

// Function to print all endpoints
function printEndpoints(router, basePath = '') {
  router.stack.forEach((middleware) => {
      if (middleware.route) {
          // Route middleware
          console.log(`${Object.keys(middleware.route.methods).join(', ')} -> ${basePath}${middleware.route.path}`);
      } else if (middleware.name === 'router') {
          // Sub-router middleware
          const routerPath = basePath + middleware.regexp;
          printEndpoints(middleware.handle, routerPath);
      }
  });
}

// Print all endpoints
printEndpoints(app._router);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
