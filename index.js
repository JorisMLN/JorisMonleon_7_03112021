import database from './database.js';
import filterDatabase from './filteredData.js';

//  - - - - - - - - - - - - - - - - - - - - -
// input Listener
const inputResearch = () => {
  let research = document.getElementById('searchBar');
  let resultArrayName = [];
  let resultArrayDescription = [];
  resultDisplay(database, resultArrayName, resultArrayDescription);

  research.addEventListener('input', (bar) => {
    let targetValue = bar.target.value.removeDiacritics();
    resultDisplay(database, resultArrayName, resultArrayDescription);

    if (targetValue.length >= 3) {
      setTimeout(() => {
        let actualInputValue = document.getElementById('searchBar').value.removeDiacritics();
        if (targetValue === actualInputValue) {
          filterDatabase.forEach(recette => {
            if (recette.name.indexOf(targetValue) != -1) {
              resultArrayName.push(recette.id)
            }
            if (recette.description.indexOf(targetValue) != -1) {
              resultArrayDescription.push(recette.id)
            }
          })
          console.log(resultArrayName);
          console.log(resultArrayDescription);
          resultDisplay(database, resultArrayName, resultArrayDescription);
        }
      }, 500);
    }
    resultArrayName.length = 0;
    resultArrayDescription.length = 0;
  });
}
inputResearch();

//  - - - - - - - - - - - - - - - - - - - - -
// Result display loop
function resultDisplay(database, resultArrayName, resultArrayDescription){
  let htmlDisplayBloc = document.getElementById('result');
  let htmlString = '';
  // Peut-etre formater les 2 Array pour éviter les doublons'id' dans l'array de description

  resultArrayName.length === 0 && resultArrayDescription.length === 0 ? 
  database.forEach(element => {
      htmlString += `
      <div class="card" style="width: 18rem;">
        <img src="images/test.jpg" class="card-img-top" alt="chien de traineau">
        <div class="card__body">
          <h5 class="card-title">${element.name}</h5>
          <p class="body-text">${element.description}</p>
        </div>
      </div>
      `
  })
  :
  database.forEach(element => {
    if (resultArrayName.includes(element.id) === true) {
      htmlString += `
      <div class="card" style="width: 18rem;">
        <img src="images/test.jpg" class="card-img-top" alt="chien de traineau">
        <div class="card__body">
          <h5 class="card-title">${element.name} ${element.id}</h5>
          <p class="body-text">${element.description}</p>
        </div>
      </div>
      `
    }
  });
  // mettre une condition pour filter les elements deja presents dans l'array de nom
  database.forEach(element => {
    if (resultArrayDescription.includes(element.id) === true) {
      htmlString += `
      <div class="card" style="width: 18rem;">
        <img src="images/test.jpg" class="card-img-top" alt="chien de traineau">
        <div class="card__body">
          <h5 class="card-title">${element.name} ${element.id}</h5>
          <p class="body-text">${element.description}</p>
        </div>
      </div>
      `
    }
  });

  htmlDisplayBloc.innerHTML = htmlString;
};


//  - - - - - - - - - - - - - - - - - - - - -
// Remove Diacritics

String.prototype.removeDiacritics = function () {
  return this.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}


/*####################################################################################################################################*/
// - - - - - - - - - - - - - -
// Gestion dropdown INGREDIENTS
const ingredientsDropdown = (database) => {
  const btnIngredients = document.getElementById('btnIngredients');
  const menuIngredients = document.getElementById('menuIngredients');

  const intoInputIngredients = () => {
    menuIngredients.classList.add('show');
    btnIngredients.classList.add('push');
  }
  const intoSwitchIngredients = () => {
    btnIngredients.classList.remove('push');
    menuIngredients.classList.remove('show');
  }
  btnIngredients.addEventListener('click', intoInputIngredients);
  menuIngredients.addEventListener('focusout', intoSwitchIngredients)

  // Ingredient Dropdown display loop
  const ingredientDropdownLoop = (database) => {
    let resultIngredients = new Set([]);
    database.forEach(recette => {
      recette.ingredients.forEach(elm => {
        if (isValid(elm.ingredient) === true) {
          resultIngredients.add(elm.ingredient)
        }
      })
    })

    let menuIngredients = document.getElementById('menuIngredients');
    let htmlUl = '<input class="inputDrop" type="text">';
    resultIngredients.forEach(ingredient => {
      htmlUl += `<li><a class="dropdown-item" href="#">${ingredient}</a></li>`
    })
    menuIngredients.innerHTML = htmlUl;
  };
  ingredientDropdownLoop(database);
}
ingredientsDropdown(database);


// - - - - - - - - - - - - - -
// Gestion dropdown APPAREILS
const appareilsDropdown = () => {
  const btnAppareils = document.getElementById('btnAppareils');
  const menuAppareils = document.getElementById('menuAppareils');

  const intoInputAppliances = () => {
    btnAppareils.classList.add('hidden');
    menuAppareils.classList.add('show');
  }
  const intoButtonAppliances = () => {
    btnAppareils.classList.remove('hidden');
    menuAppareils.classList.remove('show');
  }
  btnAppareils.addEventListener('click', intoInputAppliances);
  menuAppareils.addEventListener('focusout', intoButtonAppliances)


  // Appareils Dropdown display loop
  const appareilsDropdownLoop = (database) => {
    let resultAppareils = new Set([]);
    database.forEach(recette => {
      if (isValid(recette.appliance) === true) {
        resultAppareils.add(recette.appliance)
      }
    })

    let menuAppareils = document.getElementById('menuAppareils');
    let htmlUl = '<input class="inputDrop" type="text">';
    resultAppareils.forEach(appliance => {
      htmlUl += `<li><a class="dropdown-item" href="#">${appliance}</a></li>`
    })
    menuAppareils.innerHTML = htmlUl;
  };
  appareilsDropdownLoop(database);
}
appareilsDropdown(database);


// - - - - - - - - - - - - - -  
// Gestion dropdown USTENSILES
const ustensilsDropdown = (database) => {
  const btnUstensiles = document.getElementById('btnUstensiles');
  const menuUstensiles = document.getElementById('menuUstensiles');

  const intoInputUstensils = () => {
    btnUstensiles.classList.add('hidden');
    menuUstensiles.classList.add('show');
  }
  const intoButtonUstensils = () => {
    btnUstensiles.classList.remove('hidden');
    menuUstensiles.classList.remove('show');
  }
  btnUstensiles.addEventListener('click', intoInputUstensils);
  menuUstensiles.addEventListener('focusout', intoButtonUstensils)

  // Appareils Dropdown display loop
  const ustensilsDropdownLoop = (database) => {
    let resultUstensils = new Set([]);
    database.forEach(recette => {
      recette.ustensils.forEach(elm => {
        if (isValid(elm) === true) {
          resultUstensils.add(elm)
        }
      })
    })

    let menuUstensiles = document.getElementById('menuUstensiles');
    let htmlUl = '<input class="inputDrop" type="text">';
    resultUstensils.forEach(ustensils => {
      htmlUl += `<li><a class="dropdown-item" href="#">${ustensils}</a></li>`
    })
    menuUstensiles.innerHTML = htmlUl;
  };
  ustensilsDropdownLoop(database);
}
ustensilsDropdown(database);


//  - - - - - - - - - - - - - - - - - - - - -
// Regex de validation
function isValid(tester) {
  return !/[~`!#$%\^&*+=\-\[\]\\'.;,/{}|\\":<>\?]/g.test(tester);
}


/*####################################################################################################################################*/