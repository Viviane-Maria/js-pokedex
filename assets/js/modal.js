let modalAlert = new ModalAlert();

//Função modal para carregar os status do pokémon clicado
function ModalAlert() {
  this.alert = function (message) {
    document.body.innerHTML =
      document.body.innerHTML +
      `<div id="overlay"></div>
        <span id="modal"> </span>
      `;

    let idParam = message;

    // Função para converter pokémon para HTML
    function convertPokemonToHtmlContent(pokemon) {
      return `
        <section id="pokemonModal" class="modal-content ${pokemon.mainType} ">
          <div id="modalClose">
            <button class="close" onclick="modalAlert.ok()">&#10229;</button>
          </div>
          <div class="header">
            <h1 class="name">${pokemon.name}</h1>
            <span class="number">#${pokemon.number}</span>
            <ol class="types">
              ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
            </ol>
          </div>

          <div class="container-details">
            <img class="pokemon-img"
            src="${pokemon.photo}"
            alt="${pokemon.name}">
            <div class="content-details">
              <div class="stats">
                <span class="stats-base">Status Base</span>
                ${pokemon.stats
                .map(
                (stat) => `
                <div class="${stat.name}">
                  <span class="stat-name">${stat.name}</span>
                  <span class="stat-number">${stat.number}</span>
                </div>
                `
                )
                .join("")}
              </div>
            </div>
          </div>
        </section>
      `;
    }

    // Ajuste da sobreposição do modal na tela 
    let overlay = document.getElementById("overlay");
    let pokemonModal = document.getElementById("modal");
    let winH = window.innerHeight;

    overlay.style.height = winH + "px";
    overlay.style.display = "block";
    pokemonModal.style.display = "block";

    pokeApi
      .getPokemonById(idParam)
      .then((pokemon) => {
        pokemonModal.innerHTML = convertPokemonToHtmlContent(pokemon);
      })
      .catch((err) => console.error(err));
  };

  // Fecha o Modal Alert e tira o esmaecimento da tela 
  this.ok = function () {
    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  };
}
