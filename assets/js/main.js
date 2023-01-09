
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
    
    function convertPokemonToLi(pokemon) {
        return `
        <li class="pokemon ${pokemon.mainType}" 
        onclick="customAlert.alert(${pokemon.number})">
           <span class="number">#${pokemon.number}</span>
           <span class="name">${pokemon.name}</span>
      
           <div class="details">
              <ol class="types">
                 ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join('')}
              </ol>
      
              <img src="${pokemon.photo}" alt="${pokemon.name}">
           </div>
        </li>
        
      `;
    }

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemonLista(offset, limit).then((pokemonLista = []) => {
        const newHtml = pokemonLista.map(convertPokemonToLi).join(' ')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
