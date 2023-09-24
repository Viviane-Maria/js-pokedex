const pokeApi = {}

// Card pequeno (li)
// Função que transforma o id, nome, tipos e imagem do pokémon recebidos da PokéAPI para a nomenclatura utilizada no projeto
function convertPokeApiDetailToPokemon(pokemonDetails){
    const pokemon = new Pokemon()
    pokemon.number = pokemonDetails.id
    pokemon.name = pokemonDetails.name

    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;

    pokemon.mainType = type;
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`;

    return pokemon;
}

// Card com os status (modal)
// Função que transforma o nome, id, tipos e status do pokémon da PokéAPI para a nomenclatura utilizada no projeto
function convertPokemonByIdToPokemon(pokemonDetails) {
    const pokemon = new Pokemon();
    pokemon.name = pokemonDetails.name;
    pokemon.number = pokemonDetails.id;

    const types = pokemonDetails.types.map((types) => types.type.name);
    const [type] = types;

    pokemon.mainType = type;
    pokemon.types = types;
    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`;
    

    const stats = pokemonDetails.stats.map((stats) => {
        return {
            name: stats.stat.name,
            number: stats.base_stat,
        };
    });

    pokemon.stats = stats;

    return pokemon;
}

// Função que obtém os status da PokéAPI, transforma para JSON para depois serem utilizados na função que tranforma para a nomeclatura utilizada no projeto
pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

// Função que obtém a lista de pokémon da PokéAPI, transforma a resposta em JSON, depois seleciona quais status pegar, mapeia a lista e retorna uma promessa que resolve com a lista de detalhes dos Pokémon
pokeApi.getPokemonLista = (offset = 0, limit = 5) => {
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

return fetch(url)
.then((response) =>  response.json())
.then((jsonBody) => jsonBody.results)
.then((pokemonLista) => pokemonLista.map(pokeApi.getPokemonDetails))
.then ((detailRequests) => Promise.all(detailRequests))
.then ((pokemonDetails) => pokemonDetails)
}

// Função que obtém o pokémon da PokéAPI pelo seu id, converte a resposta para JSON, em seguida chama a função convertPokemonByIdToPokemon para converter os detalhes do Pokémon para a nomenclatura utilizada no projeto
pokeApi.getPokemonById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch(url)
        .then((res) => res.json())
        .then((responseBody) => convertPokemonByIdToPokemon(responseBody))
        .then((pokemonDetails) => pokemonDetails);
};