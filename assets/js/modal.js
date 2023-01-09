let customAlert = new CustomAlert();

function CustomAlert() {
  this.alert = function (message) {
    document.body.innerHTML =
      document.body.innerHTML +
      `<div id="dialogoverlay"></div>
        <span id="wrap"> </span>
      `;

    let idParam = message;

    function uppercaseFirstLetter(str) {
      return str[0].toUpperCase() + str.substring(1);
    }

    function replaceHyphenAndUppercaseFirstLetter(str) {
      return uppercaseFirstLetter(str).replace("-", " ");
    }

    function convertPokemonToHtmlContent(pokemon) {
      return `
        <section id="pokemonModal" class="modal-content slit-in-vertical ${
          pokemon.mainType
        } ">
        <div id="modalClose">
          <button class="close" onclick="customAlert.ok()">&#10229;</button>
        </div>
        <div class="header">
        <h1>${uppercaseFirstLetter(pokemon.name)}</h1>
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
                    <span class="title-3">Status Base</span>
                    ${pokemon.stats.map((stat) => `
                       <div class="${stat.name}">
                          <span class="stats-name">${replaceHyphenAndUppercaseFirstLetter(stat.name)}</span>
                          <span class="stat-number">${stat.number}</span>
                       </div>
                    `).join("")}
                    </div>
                </div>
        </div>
        </section>
      `;
    }

    let dialogoverlay = document.getElementById("dialogoverlay");
    let pokemonModal = document.getElementById("wrap");
    let winH = window.innerHeight;

    dialogoverlay.style.height = winH + "px";
    dialogoverlay.style.display = "block";
    pokemonModal.style.display = "block";

    pokeApi
      .getPokemonById(idParam)
      .then((pokemon) => {
        pokemonModal.innerHTML = convertPokemonToHtmlContent(pokemon);
      })
      .catch((err) => console.error(err));
  };

  this.ok = function () {
    document.getElementById("wrap").style.display = "none";
    document.getElementById("dialogoverlay").style.display = "none";
  };
}


