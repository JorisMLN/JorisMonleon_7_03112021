import database from './database.js';
import filterDatabase from './filteredData.js';

// String.prototype.removeDiacritics = function() {
//   return this.toLocaleLowerCase().normalize("NFD")
// }

// "totétèça".removeDiacritics()

// // -------------------------------

// str.normalize("NFD").replace(/\p{Diacritic}/gu, "")


//  - - - - - - - - - - - - - - - - - - - - -
// input Listener
const inputResearch = () => {
  let research = document.getElementById('searchBar');
  research.addEventListener('input', (bar) => {
    let targetValue = bar.target.value;

    if (targetValue.length >= 3) {
      setTimeout(() => {
        let actualInputValue = document.getElementById('searchBar').value;

        if (targetValue === actualInputValue) {

          console.log(filterDatabase);
          let result = filterDatabase.filter(word => word.name === targetValue);
          console.log(result);

        }
      }, 500);
    }
  });
}

inputResearch();

//  - - - - - - - - - - - - - - - - - - - - -
// Result display loop
const resultDisplay = (database) => {
  let htmlDisplayBloc = document.getElementById('result');
  let htmlString = '';

  database.forEach(element => {
    htmlString += `
      <div class="card" style="width: 18rem;">
        <img src="images/test.jpg" class="card-img-top" alt="chien de traineau">
        <div class="card__body">
          <h5 class="card-title">${element.name} ${element.id}</h5>
          <p class="body-text">${element.description}</p>
        </div>
      </div>
      `
  });

  htmlDisplayBloc.innerHTML = htmlString;
};
resultDisplay(database);

//  - - - - - - - - - - - - - - - - - - - - -
// Regex de validation
function isValid(tester) {
  return !/[~`!#$%\^&*+=\-\[\]\\'.;,/{}|\\":<>\?]/g.test(tester);
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Gestion dropdown INGREDIENTS
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


// - - - - - - - - - - - - - -
// Gestion dropdown APPAREILS
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


// - - - - - - - - - - - - - -  
// Gestion dropdown USTENSILES
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



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


