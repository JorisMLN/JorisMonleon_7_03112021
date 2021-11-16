import database from './database.js';


//  - - - - - - - - - - - - - - - - - - - - -
// Result display loop
const resultDisplay = (database) => {
  let htmlDisplayBloc = document.getElementById('result');
  let htmlString = '';

  database.forEach(element => {
    htmlString += `
      <div class="card" style="width: 18rem;">
        <img src="images/test.jpg" class="card-img-top" alt="chien de traineau">
        <div class="card-body">
          <h5 class="card-title">${element.name} ${element.id}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
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



//  - - - - - - - - - - - - - - - - - - - - -
// Gestion dropdown INGREDIENTS
const btnIngredients = document.getElementById('btnIngredients');
const inputIngredients = document.getElementById('inputIngredients');
const menuIngredients = document.getElementById('menuIngredients');

const switchToInput1 = () => {
  btnIngredients.classList.add('hidden');
  inputIngredients.classList.remove('hidden');
  menuIngredients.classList.add('show');
}
const switchTobtn1 = () => {
  btnIngredients.classList.remove('hidden');
  inputIngredients.classList.add('hidden');
  menuIngredients.classList.remove('show');
}
btnIngredients.addEventListener('click', switchToInput1);
inputIngredients.addEventListener('focusout', switchTobtn1)

// Ingredient Dropdown display loop
const ingredientDropdownLoop = (database) => {
  let resultIngredients = new Set([]);
  database.forEach(recette => {
    recette.ingredients.forEach(elm => {
      resultIngredients.add(elm.ingredient)
      if (isValid(elm.ingredient) === true) {
        resultIngredients.add(elm.ingredient)
      }
    })
  })

  let menuIngredients = document.getElementById('menuIngredients');
  let htmlUl = '';
  resultIngredients.forEach(ingredient => {
    htmlUl += `<li><a class="dropdown-item" href="#">${ingredient}</a></li>`
  })
  menuIngredients.innerHTML = htmlUl;
};
ingredientDropdownLoop(database);


//  - - - - - - - - - - - - - - - - - - - - -
// Gestion dropdown APPAREILS
const btnAppareils = document.getElementById('btnAppareils');
const inputAppareils = document.getElementById('inputAppareils');
const menuAppareils = document.getElementById('menuAppareils');

const switchToInput2 = () => {
  btnAppareils.classList.add('hidden');
  inputAppareils.classList.remove('hidden');
  menuAppareils.classList.add('show');
}
const switchTobtn2 = () => {
  btnAppareils.classList.remove('hidden');
  inputAppareils.classList.add('hidden');
  menuAppareils.classList.remove('show');
}
btnAppareils.addEventListener('click', switchToInput2);
inputAppareils.addEventListener('focusout', switchTobtn2)

// Appareils Dropdown display loop
const appareilsDropdownLoop = (database) => {
  let resultAppareils = new Set([]);
  database.forEach(recette => {
    if (isValid(recette.appliance) === true) {
      resultAppareils.add(recette.appliance)
    }
  })

  let menuAppareils = document.getElementById('menuAppareils');
  let htmlUl = '';
  resultAppareils.forEach(appliance => {
    htmlUl += `<li><a class="dropdown-item" href="#">${appliance}</a></li>`
  })
  menuAppareils.innerHTML = htmlUl;
};
appareilsDropdownLoop(database);


//  - - - - - - - - - - - - - - - - - - - - -
// Gestion dropdown INGREDIENTS
const btnUstensiles = document.getElementById('btnUstensiles');
const inputUstensiles = document.getElementById('inputUstensiles');
const menuUstensiles = document.getElementById('menuUstensiles');

const switchToInput3 = () => {
  btnUstensiles.classList.add('hidden');
  inputUstensiles.classList.remove('hidden');
  menuUstensiles.classList.add('show');
}
const switchTobtn3 = () => {
  btnUstensiles.classList.remove('hidden');
  inputUstensiles.classList.add('hidden');
  menuUstensiles.classList.remove('show');
}
btnUstensiles.addEventListener('click', switchToInput3);
inputUstensiles.addEventListener('focusout', switchTobtn3)

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
  let htmlUl = '';
  resultUstensils.forEach(ustensils => {
    htmlUl += `<li><a class="dropdown-item" href="#">${ustensils}</a></li>`
  })
  menuUstensiles.innerHTML = htmlUl;
};
ustensilsDropdownLoop(database);
