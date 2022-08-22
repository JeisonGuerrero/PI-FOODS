const axios = require('axios');
const { Recipe, Type } = require('../db.js')
const { END_GENE } = process.env;

const cantidadPedidos = 2;

const getAllRecipes = async () => {
         try {
            const response = await axios(END_GENE)        
            const promise = await response.data.results.map(ele => {
                return {
                    id: ele.id,
                    name: ele.title,
                    steps: ele.analyzedInstructions[0] &&
                            ele.analyzedInstructions[0].steps ? 
                            ele.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):'',
                    image: ele.image,
                    summary: ele.summary.replace(/(<([^>]+)>)/gi, ""),
                    healtScore: ele.healthScore,
                    diets: ele.diets
                }
            })
            return promise
        }
        catch (err) {
            console.log(err)
        }
    }

const getQueryRecipes = async (name) => {
    try {
        const recipes = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ec3d0eca99694ecca912abe7d08d2f18&query=${name}&addRecipeInformation=true&number=${cantidadPedidos}`)
        const promiseRecipes = await recipes.data.results.map(ele => {
            return {
                id: ele.id,
                name: ele.title,
                steps: ele.analyzedInstructions[0] &&
                        ele.analyzedInstructions[0].steps ? 
                        ele.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):'',
                image: ele.image,
                summary: ele.summary.replace(/(<([^>]+)>)/gi, ""),
                healtScore: ele.healthScore,
                diets: ele.diets
                     }
                })
            return promiseRecipes
    } catch (error) {
        console.log(error)
    }
}

const dbInfo = async () => {
    try {
        const db = await Recipe.findAll({
            includes: [ { model: Type, 
                attributes: ['name'] }],
            throught: {
                attributes: []
            },
        })
        return db
    } catch (error) {
        console.log(error)
    }
}

const allInfo = async () => {
    const infoDb = await dbInfo();
    const infoApi = await getAllRecipes();
    const infoAll = [...infoDb, ...infoApi];
    return infoAll
}

const getRecipeId = async (id) =>{
    try {
        const resId = await allInfo();
        const result = resId.find((ele)=> ele.id == id);
        return result;
    } catch (error) {
        console.log(error);
    }
}

const getType = async () => {

    const recetas = await allInfo();
    let dieta = recetas.map((receta) => receta.diets);
    let juntarDietas = dieta.join(',').split(',');
  
    let todasLasDietas = [];
  
    for (let i = 0; i < juntarDietas.length; i++) {
      if(!todasLasDietas.includes(juntarDietas[i]) && juntarDietas[i]) {
        todasLasDietas.push(juntarDietas[i])
      }
    }
  
  let resultType = todasLasDietas.map((dieta) => ({name: dieta})) 
  
    return resultType;
  }

module.exports = {
    allInfo,
    getQueryRecipes,
    getRecipeId,
    getType
}