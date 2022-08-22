const { Router } = require('express');
// Importar todos los routers;
const { routesRecipes } = require('./routeRecipes.js');
const routeTypes = require('./routeTypes.js');


const router = Router();

// Configurar los routers
router.use('/recipes', routesRecipes);
router.use('/diets', routeTypes);

module.exports = router;
