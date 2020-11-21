let pokemonList = [
  { name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] },
  { name: 'Charizard', height: 20, types: ['fire', 'flying'] },
  { name: 'Slowpoke', height: 11, types: ['water', 'psychic'] }
]

for (let i=0; i < pokemonList.length; i++){
  document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') </p>')
}
