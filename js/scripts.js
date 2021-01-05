// wrap global variables in iife
let pokemonRepository = (function () {
  // create array of pokemon
  let pokemonList = [];
  // add api link to pull pokemonList from
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // function to add pokemon to list
  function add(pokemon) {
    // checks to ensure data type of pokemon input being added matches format of pokemonList & includes all properties
    if (typeof pokemon !== 'object') {
      return "Wrong data type for Pokemon";
    } else if (!pokemon.name || !pokemon.detailsUrl) {
      return "Pokemon does not have all required properties";
    } else {
      pokemonList.push(pokemon);
      return pokemonList;
    }
  }

  // function to remove pokemon from list
  function remove(name) {
    // loop through array and find object containing defined name, then remove that object (would use map normally to loop through array)
    for(let i=0; i<pokemonList.length; i++) {
      console.log(pokemonList[i], " contains ", name, "?");
      if(name === pokemonList[i].name) {
        pokemonList.splice(i, 1);
        break;
      }
    }
    return pokemonList;
  }

  // function to display full list of pokemon
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    // create variable to select the pokemon-list ul from the index
      let listElement = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      // create a button to display each pokemon name
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      // add button class for formatting and Bootstrap
      button.classList.add('pokemon-button', 'btn', 'btn-primary');
      button.setAttribute('type', 'button');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#modal-container');
      // add Bootstrap li class
      listItem.classList.add('group-list-item');
      listItem.appendChild(button);
      listElement.appendChild(listItem);
      button.addEventListener('click', function (event) {
        // show modal with details of the pokemon selected when button is clicked
        showDetails(pokemon);
      });
  }

  // show details of the pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function loadList(){
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // Pull the pokemon details from the api (fetch them) and load the ones listed below
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.masterImage = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = [];
      // Find the name of the types and list them in the item types array
      for (let j = 0; j < details.types.length; j++) {
        item.types.push(' ' + details.types[j].type.name);
      }

      // Find the name of the abilities and list them in the item abilities array
      item.abilities = [];
      details.abilities.forEach((abilities, i) => {
        item.abilities.push(' ' + details.abilities[i].ability.name);
      });

    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(pokemon) {
    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    // Clear all existing modal content
    modalTitle.empty();
    modalBody.empty();

    // Information about the pokemon selected
    // Creating an element to title the modal
    let titleElement = $('<h1>' + pokemon.name + '</h1>');
    // Creating an element to show the pokemon's height
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    // Creating an element to show the pokemon's types
    let typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');
    // Creating an element to show the pokemon's abilities
    let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');
    // Creating an element to show an image of the pokemon
    let imageElement = $('<img class="modal-img" />');
    imageElement.attr('src', pokemon.masterImage);

    modalTitle.append(titleElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    modalBody.append(imageElement);

//    modalContainer.classList.add('is-visible');
 }

// function hideModal() {
//   modalContainer.classList.remove('is-visible');
// }
//
// // Close the modal if the escape key is pressed but only if the modal is visible
// window.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
//     hideModal();
//   }
// });
//
// // Close the modal if & only if the modal container (outer area) is clicked
// modalContainer.addEventListener('click', (e) => {
//     let target = e.target;
//     if (target === modalContainer) {
//       hideModal();
//     }
// });

  return {
    add: add,
    remove: remove,
    getAll: getAll,
    addListItem:  addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };

})();

// load the data from the pokemon api
pokemonRepository.loadList().then(function() {
  // call all objects in pokemonList and add their 'name' to a button in a list
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
