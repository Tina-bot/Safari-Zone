const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const fetchData = async () => {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + getRandomInt(1, 151));
        const data = await res.json();
        console.log(data);
        printCard(data);
        printBox(pokemonList);
    }
    catch (e) {
        console.log(e);
    }
}

const printCard = (pokemon) => {
    const card = document.getElementById("card")
    card.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
    <p> ID: #${pokemon.id}</p>
    <p>${pokemon.types.map(type => `<span style="background-color: ${colorByType(type.type.name)}">${type.type.name}</span>`).join(' ')}</p>
        <button onClick={addPokemon(${JSON.stringify(pokemon)})}>Catch Pokemon <img src="https://img.icons8.com/officexs/16/000000/pokeball.png"/ style="width:16px;height:16px;border:none;background-color:transparent"></button>
        <button onClick={fetchData()}>Keep looking for another</button>
        `;
    card.style.backgroundColor = colorByType(pokemon.types[0].type.name);

    const types = document.getElementById("types")
    types.innerHTML = `
    <ul>
    ${pokemon.types.map(type => `<li style="background-color: ${colorByType(type.type.name)}">${type.type.name} </li>`).join('')}
    </ul>
    `;
}

const pokemonList = [];
const addPokemon = (pokemon) => {
    pokemonList.push(pokemon);
    printBox(pokemonList);
}

const printBox = (pokemonList) => {
    const box = document.getElementById("box-poke")
    box.classList.add('box')
    if (pokemonList.length) {
        box.innerHTML = `
        <h2>List of pokemon obtained</h2>
        <ul>
        ${pokemonList.map(pokemon => `<li>
        <img class="listPoke" src="${pokemon.sprites.front_default}">
        <button id="btn-remove" onClick={removePokemon(${pokemon.id})}>Release Pokemon</button>
        </li>`).join('')}
        </ul>
        `;
    } else {
        box.innerHTML = `
        <h2>List of pokemon obtained</h2>
        <p>empty list, catch a pokemon! ❤</p>
        `;
    }
}

const removePokemon = (id) => {
    pokemonList.splice(pokemonList.findIndex(pokemon => pokemon.id === id), 1);
    printBox(pokemonList)
}

const colorByType = (type) => {
    switch (type) {
        case 'normal':
            return '#A8A878';
        case 'fighting':
            return '#C03028';
        case 'flying':
            return '#A890F0';
        case 'poison':
            return '#A040A0';
        case 'ground':
            return '#E0C068';
        case 'rock':
            return '#B8A038';
        case 'bug':
            return '#A8B820';
        case 'ghost':
            return '#705898';
        case 'steel':
            return '#B8B8D0';
        case 'fire':
            return '#F08030';
        case 'water':
            return '#6890F0';
        case 'grass':
            return '#78C850';
        case 'electric':
            return '#F8D030';
        case 'psychic':
            return '#F85888';
        case 'ice':
            return '#98D8D8';
        case 'dragon':
            return '#7038F8';
        case 'dark':
            return '#705848';
        case 'fairy':
            return '#EE99AC';
        default:
            return '#000000';
    }
}


fetchData();