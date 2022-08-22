const { Router } = require('Express');
const { Type } = require('../db.js')

// import all controllers
const { getType } = require ('../Controller/controlador.js');


const routesType = new Router();

// Add routes
routesType.get('/', async (req, res) => {
    try {
        const dbType = await Type.findAll()
        if(!dbType.length){
            const diets = await getType();
            await Type.bulkCreate(diets);
            let newTypeDb = await Type.findAll();
            res.status(200).send(newTypeDb);
        }else{
        res.status(200).send(dbType);
        }        
    } catch (error) {
        console.log(error);
    }
});

module.exports = routesType;
