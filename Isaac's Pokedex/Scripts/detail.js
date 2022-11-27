"use strict";

async function getPokemonForDetailPage(pokemonNumber) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    const response = await fetch(url);
    const pokemon = await response.json();
    console.log(pokemon);
    await createDetailPage(pokemon);
}

function createDetailPage(pokemon) {
    //TODO: Look at object being returned from pokemon api, Create Detail Page HTML
    let nameContainer = document.getElementById('Name');
    nameContainer.style.fontWeight = 'bold';
    nameContainer.innerText = pokemon.name;
    let pokeImageContainer = document.getElementById('poke-images');

    let frontImg = document.createElement('img');
    frontImg.src = pokemon.sprites.front_default;
    pokeImageContainer.appendChild(frontImg)

    let frontShinyImg = document.createElement('img');
    frontShinyImg.src = pokemon.sprites.front_shiny;
    pokeImageContainer.appendChild(frontShinyImg)

    let typesContainer = document.getElementById('Type');
    pokemon.types.forEach(type => {
        let typeDiv = document.createElement('div');
        typeDiv.style.display = 'inline-block';
        typeDiv.style.marginLeft = '5px'
        typeDiv.innerText = type.type.name + ' ';
        typesContainer.appendChild(typeDiv);
    });
    document.getElementById('Height').innerText = 'Height: ' + pokemon.height;
    document.getElementById('Weight').innerText = 'Weight: ' + pokemon.weight;
    let abilitiesContainer = document.getElementById('Ability');
    pokemon.abilities.forEach(ability => {
        let abilityDiv = document.createElement('div')
        abilityDiv.style.display = 'inline-block';
        abilityDiv.style.marginLeft = '5px'
        abilityDiv.innerText = ability.ability.name;
        abilitiesContainer.appendChild(abilityDiv);
    });
    let statsTable = document.getElementById('StatsTable');
    let statsTableBody = statsTable.getElementsByTagName('tbody')[0];
    let statsRow = statsTableBody.getElementsByTagName('tr')[0];
    pokemon.stats.forEach(stat => {
        let statTD = document.createElement('td');
        statTD.innerText = stat.base_stat;
        statsRow.appendChild(statTD);
    });
    let movesTable = document.getElementById('MovesTable');
    let movesTableBody = movesTable.getElementsByTagName('tbody')[0];

    pokemon.moves.forEach(move => {
        let response = getMoveData(move.move.url);
        response.then((result) => {
            let replacedEffect = '';

            if (result.effect_entries) {
                replacedEffect = result.effect_entries[0].effect;
                if (replacedEffect && replacedEffect.includes("$effect_chance%")) {
                    replacedEffect = replacedEffect.replace('$effect_chance%', result.effect_chance.toString().includes('/') ? result.effect_chance : result.effect_chance + '%');
                }
            }

            movesTableBody.innerHTML += `
            <tr>
                <td>${result.name}</td>
                <td>${result.accuracy ? result.accuracy : 'n/a'}</td>
                <td>${result.type.name}</td>
                <td>${result.damage_class.name}</td>
                <td>${replacedEffect != '' ? replacedEffect : 'n/a'}</td>
            </tr>
            `
        }).catch(err => console.log(err))
    });
}

function onDetailPageLoad() {
    initUserPreferredTheme();
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    getPokemonForDetailPage(params.pokemonNumber);
}

async function getMoveData(moveUrl) {
    const response = await fetch(moveUrl);
    const json = await response.json();
    return json;
}
