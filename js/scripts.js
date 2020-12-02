// wrap pokemon repository in iife
let pokemonRepository = (function () {
  // create array of pokemon
  let pokemonList = [
    { name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] },
    { name: 'Charizard', height: 20, types: ['fire', 'flying'] },
    { name: 'Slowpoke', height: 11, types: ['water', 'psychic'] }
  ];

  function add(pokemon) {
    // checks to ensure data type of pokemon input being added matches format of pokemonList
    if (typeof pokemon === ('name' && 'object') || ('height' && 'number') || ('types' && 'object')) {
      pokemonList.push(pokemon);
    } else {
      alert("Pokemon value is not correct");
    }
  }

  function remove(pokemon) {
    pokemonList.splice(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    remove: remove,
    getAll: getAll
  };

})();

//write list of pokemon using forEach
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(pokemon.name + ', height: ' + pokemon.height + ', ' + pokemon.types[0] + ', ' + pokemon.types[1] + '<br>');
});


// write list of pokemon with height, calling out those over 15 as big
// for (let i=0; i < pokemonList.length; i++){
  // if (pokemonList[i].height >=15){
    // document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow! That\'s a Big Pokémon!</p>')
  // }else {
    // document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') </p>')
  // }
// }
