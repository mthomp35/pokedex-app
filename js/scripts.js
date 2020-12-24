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
      button.classList.add('pokemon-button');
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
      showModal(pokemon.name, pokemon.height);
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

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(title, text) {
    let modalContainer = document.querySelector('.modal-container');

    // Clear all existing modal content
    modalContainer.innerText = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }



  return {
    add: add,
    remove: remove,
    getAll: getAll,
    addListItem:  addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();

// load the data from the pokemon api
pokemonRepository.loadList().then(function() {
  // call all objects in pokemonList and add their 'name' to a button in a list
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
