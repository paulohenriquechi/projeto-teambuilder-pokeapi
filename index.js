class Pokemon{
    constructor(id, sprite, name, ...type){
        this.id = id
        this.sprite = sprite
        this.type = []
        this.name = name
    }
}


async function getPokemon(pokemonID){
    //faz a requisição das informações da api
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    //converte para um objeto javascript
    const result = await response.json()
    return result
}

async function addPokemon(){

    try {
        let pokemonIdentifier = document.querySelector('#search-input').value.toLowerCase()
        let result = await getPokemon(pokemonIdentifier)
        let pokemon = new Pokemon(result.id, result.sprites.other.home.front_default)
    
        let pokemonToCaptalize = result.name
        const pokemonCaptalized = pokemonToCaptalize.charAt(0).toUpperCase()+ pokemonToCaptalize.slice(1)
        pokemon.name = pokemonCaptalized

        result.types.forEach(element => {
        const type = element.type.name
        const typeCaptitalize = type.charAt(0).toUpperCase() + type.slice(1)
        if(pokemon.type==0){
            pokemon.type += typeCaptitalize
        }else{
            pokemon.type += `/${typeCaptitalize}`
        }
    });
        createPokemonCard(pokemon)
    } catch (error) {
        error = `Nome ou ID inválido, tente novamente`
        alert(error)
    }
}

function createPokemonCard(pokemon){
    let pokemonCard = document.createElement('figure')
    let pokemonSprite = document.createElement('img')
    let pokemonInfo = document.createElement('figcaption')

    pokemonInfo.innerHTML = `<span>${pokemon.name}</span>
                            <span>#${pokemon.id}</span>
                            <span>${pokemon.type}</span>
                            <span><button id="remove-button" onclick="removePokemon(this)">Remover Pokemon</button></span>`

    pokemonCard.classList.add("pokemon-card")
    pokemonSprite.classList.add("pokemon-image")
    pokemonSprite.src = `${pokemon.sprite}`
    pokemonInfo.classList.add("pokemon-info")

    pokemonCard.append(pokemonSprite, pokemonInfo)
    
    let container = document.querySelector('#container')
    container.append(pokemonCard)
}

function removePokemon(pokemon){
    let pokemonToRemove = pokemon.closest('.pokemon-card')
    pokemonToRemove.classList.add('remove')
    setTimeout(()=>{
        pokemonToRemove.remove()
    }, 700)
}