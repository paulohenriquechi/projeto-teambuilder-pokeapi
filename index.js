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
    let pokemonCard = document.createElement('figure')
    let pokemonSprite = document.createElement('img')
    let pokemonInfo = document.createElement('figcaption')

    pokemonInfo.innerHTML = `<span>${pokemon.name}</span><span>#${pokemon.id}</span><span>${pokemon.type}</span>`

    pokemonCard.classList.add("pokemon-card")
    pokemonSprite.classList.add("pokemon-image")
    pokemonSprite.src = `${pokemon.sprite}`
    pokemonInfo.classList.add("pokemon-info")

    pokemonCard.append(pokemonSprite, pokemonInfo)
    
    let container = document.querySelector('#container')
    container.append(pokemonCard)


    



    // let item = document.createElement('li')
    // item.innerHTML = `ID: ${pokemon.id} | Nome: ${pokemon.name} | Tipo: ${pokemon.type}`
    // let itemSprite = document.createElement('img')
    // itemSprite.src = `${pokemon.sprite}`
    // item.append(itemSprite)
    // let pokemonList = document.querySelector('#pokemonList')
    // pokemonList.append(item)
}

// let pokemonName = document.createElement('SPAN').innerHTML = pokemon.name
//     let pokemonID = document.createElement('SPAN').innerHTML = `#${pokemon.id}`
//     let pokemonType = document.createElement('SPAN').innerHTML = pokemon.type






// console.log(`ID: ${pokemon.id}\nNome: ${pokemon.name}\nTipo: ${pokemon.type}`)


// class Pokemon{
//     constructor(id, sprite, name, ...type){
//         this.id = id
//         this.sprite = sprite
//         this.type = []
//         this.name = name
//     }
// }


// async function getPokemon(pokemonID){
//     //faz a requisição das informações da api
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
//     //converte para um objeto javascript
//     const result = await response.json()
//     return result
// }

// async function addPokemon(pokemonID){
//     let result = await getPokemon(pokemonID)
//     let pokemon = new Pokemon(result.id, result.sprites.other.home.front_default)
    
//     let pokemonName = result.name
//     const pokemonNameCaptalize = pokemonName.charAt(0).toUpperCase()+ pokemonName.slice(1)
//     pokemon.name = pokemonNameCaptalize

//     result.types.forEach(element => {
//         const type = element.type.name
//         const typeCaptitalize = type.charAt(0).toUpperCase() + type.slice(1)
//         if(pokemon.type==0){
//             pokemon.type += typeCaptitalize
//         }else{
//             pokemon.type += `/${typeCaptitalize}`
//         }
//     });

//     let item = document.createElement('li')
//     item.innerHTML = `ID: ${pokemon.id} | Nome: ${pokemon.name} | Tipo: ${pokemon.type}`
//     let itemSprite = document.createElement('img')
//     itemSprite.src = `${pokemon.sprite}`
//     item.append(itemSprite)
//     let pokemonList = document.querySelector('#pokemonList')
//     pokemonList.append(item)
// }

// addPokemon("gallade")