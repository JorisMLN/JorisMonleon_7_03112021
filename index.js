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


<<<<<<< HEAD
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
=======
//  - - - - - - - - - - - - - - - - - - - - -
// Regex de validation
function isValid(tester) {
  return !/[~`!#$%\^&*+=\-\[\]\\'.;,/{}|\\":<>\?]/g.test(tester);
}



//  - - - - - - - - - - - - - - - - - - - - -
>>>>>>> f1104cfa0fbcfc5aaa1e5c4a1252dff83d697875
// Gestion dropdown INGREDIENTS
const btnIngredients = document.getElementById('btnIngredients');
const inputIngredients = document.getElementById('inputIngredients');
const menuIngredients = document.getElementById('menuIngredients');

const intoInputIngredients = () => {
  btnIngredients.classList.add('hidden');
  inputIngredients.classList.remove('hidden');
  menuIngredients.classList.add('show');
}
<<<<<<< HEAD

const intoButtonIngredients = () => {
=======
const switchTobtn1 = () => {
>>>>>>> f1104cfa0fbcfc5aaa1e5c4a1252dff83d697875
  btnIngredients.classList.remove('hidden');
  inputIngredients.classList.add('hidden');
  menuIngredients.classList.remove('show');
}
<<<<<<< HEAD

btnIngredients.addEventListener('click', intoInputIngredients);
inputIngredients.addEventListener('focusout', intoButtonIngredients)

// loop display components
// const displayComponents = (database) => {
//   let htmlDisplayBloc = document.getElementById('menuIngredients');
//   let htmlString = '';
=======
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

>>>>>>> f1104cfa0fbcfc5aaa1e5c4a1252dff83d697875

//   database.forEach(element => {
//     htmlString += `
//     <li><a class="dropdown-item" href="#">${element.ingredients}</a></li>
//       `
//   });
//   htmlDisplayBloc.innerHTML = htmlString;
// };
// displayComponents(database);


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Gestion dropdown APPAREILS
const btnAppareils = document.getElementById('btnAppareils');
const inputAppareils = document.getElementById('inputAppareils');
const menuAppareils = document.getElementById('menuAppareils');

const intoInputAppliances = () => {
  btnAppareils.classList.add('hidden');
  inputAppareils.classList.remove('hidden');
  menuAppareils.classList.add('show');
}
<<<<<<< HEAD

const intoButtonAppliances = () => {
=======
const switchTobtn2 = () => {
>>>>>>> f1104cfa0fbcfc5aaa1e5c4a1252dff83d697875
  btnAppareils.classList.remove('hidden');
  inputAppareils.classList.add('hidden');
  menuAppareils.classList.remove('show');
}
<<<<<<< HEAD

btnAppareils.addEventListener('click', intoInputAppliances);
inputAppareils.addEventListener('focusout', intoButtonAppliances)

// Loop Display Appliance
// const displayAppliances = (database) => {
//   let htmlDisplayBloc = document.getElementById('menuAppareils');
//   let htmlString = '';
=======
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

>>>>>>> f1104cfa0fbcfc5aaa1e5c4a1252dff83d697875

//   database.forEach(element => {
//     htmlString += `
//     <li><a class="dropdown-item" href="#">${element.appliance}</a></li>
//       `
//   });
//   console.log(htmlString);
//   htmlDisplayBloc.innerHTML = htmlString;
// };
// displayAppliances(database);


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Gestion dropdown USTENSILES
const btnUstensiles = document.getElementById('btnUstensiles');
const inputUstensiles = document.getElementById('inputUstensiles');
const menuUstensiles = document.getElementById('menuUstensiles');

const intoInputUstensils = () => {
  btnUstensiles.classList.add('hidden');
  inputUstensiles.classList.remove('hidden');
  menuUstensiles.classList.add('show');
}
<<<<<<< HEAD

const intoButtonUstensils = () => {
=======
const switchTobtn3 = () => {
>>>>>>> f1104cfa0fbcfc5aaa1e5c4a1252dff83d697875
  btnUstensiles.classList.remove('hidden');
  inputUstensiles.classList.add('hidden');
  menuUstensiles.classList.remove('show');
}
<<<<<<< HEAD

btnUstensiles.addEventListener('click', intoInputUstensils);
inputUstensiles.addEventListener('focusout', intoButtonUstensils)

// Loop Display Ustensils
// const displayUstensils = (database) => {
//   let htmlDisplayBloc = document.getElementById('menuAppareils');
//   let htmlString = '';

//   database.forEach(element => {
//     htmlString += `
//     <li><a class="dropdown-item" href="#">${element.ustensils}</a></li>
//       `
//   });
//   htmlDisplayBloc.innerHTML = htmlString;
// };
// displayUstensils(database);
=======
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
>>>>>>> f1104cfa0fbcfc5aaa1e5c4a1252dff83d697875
