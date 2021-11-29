import database from './database.js';

// String.prototype.removeDiacritics = function() {
//   return this.toLocaleLowerCase().normalize("NFD")
// }

// "totétèça".removeDiacritics()

// -------------------------------

// str.normalize("NFD").replace(/\p{Diacritic}/gu, "")

// -------------------------------

// const element = document.getElementById('toto')
// element.addEventListener('input', e => {
//     const currentInputValue = e.target.value
    
//     setTimeout( () => {
//         const actualInputValue = document.getElementById('toto').value
//         if (currentInputValue === actualInputValue) {
//             ...
//         }
//     }, 300)
// })


//  - - - - - - - - - - - - - - - - - - - - -
// input Listener
const inputResearch = () => {
  let research = document.getElementById('searchBar');
  research.addEventListener('input', (bar) => {
    let targetValue = JSON.stringify(bar.target.value);

    if(targetValue.length >= 5){
      console.log(targetValue)
      console.log(resultIngredients)

      if(resultIngredients.includes(targetValue) === true){
        console.log("matchFound")
      }
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
    }
  );

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
const inputIngredients = document.getElementById('inputIngredients');
const menuIngredients = document.getElementById('menuIngredients');

const intoInputIngredients = () => {
  btnIngredients.classList.add('hidden');
  inputIngredients.classList.remove('hidden');
  menuIngredients.classList.add('show');
}
const intoSwitchIngredients = () => {
  btnIngredients.classList.remove('hidden');
  inputIngredients.classList.add('hidden');
  menuIngredients.classList.remove('show');
}
btnIngredients.addEventListener('click', intoInputIngredients);
inputIngredients.addEventListener('focusout', intoSwitchIngredients)

// Ingredient Dropdown display loop
let resultIngredients = new Set([]);

const ingredientDropdownLoop = (database) => {
  database.forEach(recette => {
    recette.ingredients.forEach(elm => {
      resultIngredients.add(elm.ingredient)
      if (isValid(elm.ingredient) === true) {
        resultIngredients.add(elm.ingredient)
      }
    })
  })

  let menuIngredients = document.getElementById('menuIngredients');
  let htmlUl = '<li><input type="text></li>';
  resultIngredients.forEach(ingredient => {
    htmlUl += `<li><a class="dropdown-item" href="#">${ingredient}</a></li>`
  })
  menuIngredients.innerHTML = htmlUl;
};
ingredientDropdownLoop(database);


// - - - - - - - - - - - - - -
// Gestion dropdown APPAREILS
const btnAppareils = document.getElementById('btnAppareils');
const inputAppareils = document.getElementById('inputAppareils');
const menuAppareils = document.getElementById('menuAppareils');

const intoInputAppliances = () => {
  btnAppareils.classList.add('hidden');
  inputAppareils.classList.remove('hidden');
  menuAppareils.classList.add('show');
}
const intoButtonAppliances = () => {
  btnAppareils.classList.remove('hidden');
  inputAppareils.classList.add('hidden');
  menuAppareils.classList.remove('show');
}
btnAppareils.addEventListener('click', intoInputAppliances);
inputAppareils.addEventListener('focusout', intoButtonAppliances)


// Appareils Dropdown display loop
let resultAppareils = new Set([]);

const appareilsDropdownLoop = (database) => {
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


// - - - - - - - - - - - - - -  
// Gestion dropdown USTENSILES
const btnUstensiles = document.getElementById('btnUstensiles');
const inputUstensiles = document.getElementById('inputUstensiles');
const menuUstensiles = document.getElementById('menuUstensiles');

const intoInputUstensils = () => {
  btnUstensiles.classList.add('hidden');
  inputUstensiles.classList.remove('hidden');
  menuUstensiles.classList.add('show');
}
const intoButtonUstensils = () => {
  btnUstensiles.classList.remove('hidden');
  inputUstensiles.classList.add('hidden');
  menuUstensiles.classList.remove('show');
}
btnUstensiles.addEventListener('click', intoInputUstensils);
inputUstensiles.addEventListener('focusout', intoButtonUstensils)

// Appareils Dropdown display loop
let resultUstensils = new Set([]);

const ustensilsDropdownLoop = (database) => {
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



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


