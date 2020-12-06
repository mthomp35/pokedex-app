// wrap global variables in iife
let pokemonRepository = (function () {
  // create array of pokemon
  let pokemonList = [
    { name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] },
    { name: 'Charizard', height: 20, types: ['fire', 'flying'] },
    { name: 'Slowpoke', height: 11, types: ['water', 'psychic'] }
  ];

  // function to add pokemon to list
  function add(pokemon) {
    // checks to ensure data type of pokemon input being added matches format of pokemonList & includes all properties
    if (typeof pokemon !== 'object') {
      return "Wrong data type for Pokemon";
    } else if (!pokemon.name || !pokemon.height || !pokemon.types) {
      return "Pokemon does not have all required properties";
    } else {
      pokemonList.push(pokemon);
      return pokemonList;
    }
  }

  // function to remove pokemon from list
  function remove(pokemon) {
    pokemonList.splice(pokemon);
  }

  // function to display full list of pokemon
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    // create variable to select the pokemon-list ul from the index
      let listElement = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      listItem.appendChild(button);
      listElement.appendChild(listItem);
  }

  return {
    add: add,
    remove: remove,
    getAll: getAll,
    addListItem:  addListItem,
  };

})();

// call all objects in pokemonList and add their 'name' to a button in a list
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});


// write list of pokemon with height, calling out those over 15 as big
// for (let i=0; i < pokemonList.length; i++){
  // if (pokemonList[i].height >=15){
    // document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow! That\'s a Big Pokémon!</p>')
  // }else {
    // document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') </p>')
  // }
// }
