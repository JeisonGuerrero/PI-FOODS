const { Router } = require('express');
// Importar todos los routers;
const routeRecipes = require('./routeRecipes.js');
const routeTypes = require('./routeTypes.js');


const router = Router();

// Configurar los routers
router.use('/recipes', routeRecipes);
router.use('/diets', routeTypes);

module.exports = router;
