const { Router } = require('Express');

// import all controllers
import getAllRecipes from '../Controller/index.js';

const routes = new Router();

// Add routes
routes.get('/', getAllRecipes);


module.exports = routes;