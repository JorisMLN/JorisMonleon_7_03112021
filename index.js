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
