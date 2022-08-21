const axios = require('axios');
const { Type } = require('../db.js')

const getAllRecipes = async (req, res) => {
    const { name }  = req.query;
    if (name) {
        try {
            const recipes = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ec3d0eca99694ecca912abe7d08d2f18&query=${name}&number=2`)
            let resApi = [{
                    id: recipes.data.result.id,
                    name: recipes.data.result.title,
                    steps: recipes.data.result.analyzedInstructions[0] &&
                            recipes.data.result.analyzedInstructions[0].steps ? 
                            recipes.data.result.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):'',
                    image: recipes.data.result.image,
                    summary: recipes.data.result.summary.replace(/(<([^>]+)>)/gi, ""),
                    healtScore: recipes.data.result.healthScore,
            }]
            return resApi
        }
        catch (error) {
            console.log(error);
        }
    }else{
        try {
            const response = await axios('https://api.spoonacular.com/recipes/complexSearch?apiKey=ec3d0eca99694ecca912abe7d08d2f18&addRecipeInformation=true&number=2')        
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
                }
            })
            return promise
        }
        catch (err) {
            console.log(err)
        }
    }
}

// const getAllRecipes = (req, res) => {
//     const { name } = req.query;
//     try {
//         if (name) {
//             const dbInfo = await Recipe.findAll({
//                 where: {
//                     name: name,
//                 },
//                 include: {
//                     model: Type
//                 }
//             })
//             if (dbInfo != 0) {
//                 let resDb = dbInfo.map(p => {
//                     return {
//                         id: p.id,
//                         name: p.name,
//                         steps: p.steps.map(e => e.name),
//                         image: p.image,
//                         summary: p.summary,
//                         healtScore: p.healtScore,
//                     }
//                 })
//                 res.status(200).send(resDb)

//             } else {
//                 const foodApi = (await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ec3d0eca99694ecca912abe7d08d2f18&query=${name}&number=2`))
//                 let resApi = [{
//                     id: data.result.id,
//                     name: data.result.title,
//                     steps: data.result.analyzedInstructions[0] &&
//                             data.result.analyzedInstructions[0].steps ? 
//                             data.result.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):'',
//                     image: data.result.image,
//                     summary: data.result.summary.replace(/(<([^>]+)>)/gi, ""),
//                     healtScore: data.result.healthScore,
//                 }]
//                 res.status(200).send(resApi)
//             }

//         } else {
//             try {
//                 const allPokemon = await joinAllRecipes();
//                 res.json(allPokemon)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     }
//     catch (error) {
//         console.log(error)
//     }
// };

// const joinAllRecipes = async () => {
//     let apiInfo = await getPokeAPi();
//     let dbInfo = await getDbInfo();
//     let infoTotal = dbInfo.concat(apiInfo);
//     return infoTotal;
// }

module.exports = {
    getAllRecipes
}