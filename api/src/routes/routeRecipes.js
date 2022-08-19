const { Router } = require('Express');

// import all controllers
const { getAllRecipes } = require ('../Controller/controlador.js');

const routesRecipes = Router();

// Add routes
routesRecipes.get('/', async (req, res) => {
    const recipes = await getAllRecipes ();
    res.status(200).send(recipes)
});


module.exports = {
    routesRecipes
};