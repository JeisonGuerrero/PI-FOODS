const axios = require('axios');
const { Recipe, Type } = require('../db.js')

const getAllRecipes = (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const dbInfo = await Recipe.findAll({
                where: {
                    name: name,
                },
                include: {
                    model: Type
                }
            })
            if (dbInfo != 0) {
                let resDb = dbInfo.map(p => {
                    return {
                        id: p.id,
                        name: p.name,
                        steps: p.steps.map(e => e.name),
                        image: p.image,
                        summary: p.summary,
                        healtScore: p.healtScore,
                    }
                })
                res.status(200).send(resDb)

            } else {
                const foodApi = (await axios(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&maxFat=25&number=2`))
                let resApi = [{
                    id: pokeApi.data.id,
                    name: pokeApi.data.name,
                    types: pokeApi.data.types.map(t => t.type.name),
                    image: pokeApi.data.sprites.other["official-artwork"].front_default,
                    hp: pokeApi.data.stats[0].base_stat,
                    attack: pokeApi.data.stats[1].base_stat,
                    defense: pokeApi.data.stats[2].base_stat,
                    speed: pokeApi.data.stats[5].base_stat,
                    height: pokeApi.data.height,
                    weight: pokeApi.data.weight
                }]
                res.status(200).send(resApi)
            }

        } else {
            try {
                const allPokemon = await joinAllPokemon();
                res.json(allPokemon)
            } catch (error) {
                console.log(error)
            }
        }
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = {
    getAllRecipes
}