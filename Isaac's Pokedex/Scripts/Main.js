function onIndexPageLoad(){
    initUserPreferredTheme();
    for (let i = 1; i < 906; i++) {
        getPokemon(i);
    }
}

function filterPokemonCards(searchKeyword) {
    const pokeContainer = document.getElementById('PokeContainer');
    const pokemonCards = pokeContainer.getElementsByClassName('pokemon-card');
    for (let i = 0; i < pokemonCards.length; i++) {
        let pokemonCard = pokemonCards[i];
        let innerText = pokemonCard.innerText.toLowerCase();
        if (innerText.includes(searchKeyword.toLowerCase()))
        {
            pokemonCard.style.display = 'inline-block';
        }
        else
        {
            pokemonCard.style.display = 'none';
        }
    }
}

async function getPokemon(pokemonNumber) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    const response = await fetch(url);
    const pokemon = await response.json();
    console.log(pokemon);
    createPokemonCard(pokemon, pokemonNumber);
}

function createPokemonCard(pokemon, pokemonNumber) {
    const pokemonElement = document.createElement('div');
    pokemonElement.onclick = function () {
        window.location = `detail.html?pokemonNumber=${pokemonNumber}`;
    };
    pokemonElement.classList.add('pokemon-card');
    let pokemonTypeString = `<div style="display: inline;">${pokemon.types[0].type.name}</div>`;
    if (pokemon.types.length > 1) {
        pokemonTypeString = pokemonTypeString + `/<div style="display: inline;">${pokemon.types[1].type.name}</div>`;
    }
    const pokemonInnerHTML = `
        <img src="${pokemon.sprites.front_default}">
        
        <div style="font-weight: bold;"><a href="detail.html?pokemonNumber=${pokemonNumber}">${pokemon.name}</a></div>
        ${pokemonTypeString}`;
    pokemonElement.innerHTML = pokemonInnerHTML;
    const pokeContainer = document.getElementById('PokeContainer');
    pokeContainer.appendChild(pokemonElement);
}