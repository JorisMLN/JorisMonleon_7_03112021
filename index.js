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


//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Gestion dropdown INGREDIENTS
const btnIngredients = document.getElementById('btnIngredients');
const inputIngredients = document.getElementById('inputIngredients');
const menuIngredients = document.getElementById('menuIngredients');

const intoInputIngredients = () => {
  btnIngredients.classList.add('hidden');
  inputIngredients.classList.remove('hidden');
  menuIngredients.classList.add('show');
}

const intoButtonIngredients = () => {
  btnIngredients.classList.remove('hidden');
  inputIngredients.classList.add('hidden');
  menuIngredients.classList.remove('show');
}

btnIngredients.addEventListener('click', intoInputIngredients);
inputIngredients.addEventListener('focusout', intoButtonIngredients)

// loop display components
// const displayComponents = (database) => {
//   let htmlDisplayBloc = document.getElementById('menuIngredients');
//   let htmlString = '';

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

const intoButtonAppliances = () => {
  btnAppareils.classList.remove('hidden');
  inputAppareils.classList.add('hidden');
  menuAppareils.classList.remove('show');
}

btnAppareils.addEventListener('click', intoInputAppliances);
inputAppareils.addEventListener('focusout', intoButtonAppliances)

// Loop Display Appliance
// const displayAppliances = (database) => {
//   let htmlDisplayBloc = document.getElementById('menuAppareils');
//   let htmlString = '';

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

const intoButtonUstensils = () => {
  btnUstensiles.classList.remove('hidden');
  inputUstensiles.classList.add('hidden');
  menuUstensiles.classList.remove('show');
}

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
