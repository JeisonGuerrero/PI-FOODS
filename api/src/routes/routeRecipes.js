const { Router } = require('Express');
const { Recipe, Type } = require('../db.js')

// import all controllers
const { allInfo, getQueryRecipes, getRecipeId } = require ('../Controller/controlador.js');

const routesRecipes = Router();

// Add routes
routesRecipes.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
             const query = await getQueryRecipes (name); 
             query.length?
             res.status(200).send(query):
             res.status(404).send('Name not found');
        }else{
            const recipes = await allInfo ();
            res.status(200).send(recipes)      
        } 
    } catch (error) {
        console.log(error);
    }
});

routesRecipes.get('/:id', async (req, res) => {
    const { id } = req.params;
    const getId = await getRecipeId(id);
    if (getId) {
        res.status(200).send(getId);
    }else {
        res.status(404).send('Id Recipe is not valid');
    }
})

routesRecipes.post('/', async (req, res) => {
    try {
        const {
            id, 
            name, 
            steps, 
            imagen, 
            summary, 
            healthScore,
            type
        } = req.body;
        const newRecipe = await Recipe.create({
            id, 
            name, 
            steps, 
            imagen, 
            summary, 
            healthScore,
        });
        const newType = await Type.findAll({
            where: { name: type }
        })
    
        await newRecipe.addType(newType);
    
        res.status(200).send('Your Recipe has been created successfully');
    } catch (error) {
        console.log(error);
    }
});

module.exports = {
    routesRecipes
};