import database from './database.js';
import filterDatabase from './filteredData.js';

main();

// Main Algo
function main() {

  let filteredRecipe = filterDatabase;
  console.log(filteredRecipe);
  let listOfResult = [];
  let research = document.getElementById('searchBar');

  displayProcess(filteredRecipe);
  console.log('1');

  research.addEventListener('input', (bar) => {
    let targetValue = bar.target.value.removeDiacritics();

    if (targetValue.length >= 3) {
      setTimeout(() => {
        let actualInputValue = document.getElementById('searchBar').value.removeDiacritics();
        if (targetValue === actualInputValue) {

          // result loop with id
          listOfResult = filteredRecipe.filter(filterOptions);

          function filterOptions(elm) {
            if (elm.name.indexOf(targetValue) > -1) {
              return true

            } else if (elm.ingredients.indexOf(targetValue) > -1) {
              return true

            } else if (elm.description.indexOf(targetValue) > -1) {
              return true
            }
          }
          console.log(listOfResult);
        }

        // display condition of result
        displayProcess(listOfResult)
        console.log('2');

      }, 200);
    }

    console.log('3');
    filteredRecipe = filterDatabase;
    displayProcess(filteredRecipe);
  });
}

// display process function
function displayProcess(elementList) {
  resultDisplay(elementList);
  blueManager(elementList);
  greenManager(elementList);
  redManager(elementList);
}

// General display
function resultDisplay(elementList) {
  let htmlDisplayBloc = document.getElementById('result');
  let htmlString = '';

  elementList.length === 0
    ?
    htmlString = ` <h1> Aucune recette ne correspond à votre critère de recherche ! </h1>`
    :
    elementList.map(templateHTML);

  //insertion du bloc HTML
  htmlDisplayBloc.innerHTML = htmlString;

  // template HTML du bloc vignette
  function templateHTML(element) {
    return htmlString += ` <div class="card" style="width: 18rem;">
        <img src="images/test.jpg" class="card-img-top" alt="chien de traineau">
        <div class="card__body">
          <h5 class="card-title">${element.name}</h5>
          <p class="body-text">${element.description}</p>
        </div>
      </div>
      `
  }
};

//  - - - - - - - - - - - - - - - - - - - - -
//Appel de l'algo principale avec variables de tag
let tagList = document.getElementById('tagList');
let htmlTag = [];
let tagValue = [];


/*##### D R O P D O W N S ###############################################################################################################################*/
// Recupération click dropdown

function isPushingBlueTag() {
  let dropItemsBlue = document.getElementsByClassName('itemBlue');

  Array.from(dropItemsBlue).forEach((item) => {
    item.addEventListener('click', function (event) {

      tagValue.push(event.target.textContent);
      console.log(tagValue);

      htmlTag.push(`<div class="tag Blue">${event.target.textContent}<div class="closeBtn">x</div></div>`);
      console.log(htmlTag);

      tagList.innerHTML = htmlTag;
      removeTag();
    });
  })
};

function isPushingGreenTag() {
  let dropItemsGreen = document.getElementsByClassName('itemGreen');

  Array.from(dropItemsGreen).forEach((item) => {
    item.addEventListener('click', function (event) {

      tagValue.push(event.target.textContent);
      console.log(tagValue);

      htmlTag.push(`<div class="tag Green">${event.target.textContent}<div class="closeBtn">x</div></div>`);
      console.log(htmlTag);

      tagList.innerHTML = htmlTag;
      removeTag();
    });
  })
};

function isPushingRedTag() {
  let dropItemsRed = document.getElementsByClassName('itemRed');

  Array.from(dropItemsRed).forEach((item) => {
    item.addEventListener('click', function (event) {

      tagValue.push(event.target.textContent);
      console.log(tagValue);

      htmlTag.push(`<div class="tag Red">${event.target.textContent}<div class="closeBtn">x</div></div>`);
      console.log(htmlTag)

      tagList.innerHTML = htmlTag;
      removeTag();
    });
  })
}

function removeTag() {
  let closeBtn = document.getElementsByClassName('closeBtn');
  Array.from(closeBtn).forEach((button) => {
    button.addEventListener('click', function (event) {

      console.log(event.target.parentElement.outerHTML);
      console.log(htmlTag.length)

      let indexFound = htmlTag.findIndex(tag => tag === event.target.parentElement.outerHTML);
      console.log(indexFound);
      htmlTag.splice(indexFound, 1);
      tagValue.splice(indexFound, 1);

      tagList.innerHTML = htmlTag;
      console.log(htmlTag);
      console.log(tagValue);
      removeTag();
    })
  })
}

// - - - - - - - - - - - - - - - - - - - - -
// Dropdown display
function blueManager(elementList) {

  let blueResult = new Set([]);

  elementList.forEach(recette => {
    recette.ingredients.forEach(elm => {
      let ingredientWithoutDiacritics = elm.removeDiacritics();
      if (isValid(ingredientWithoutDiacritics) === true) {
        blueResult.add(ingredientWithoutDiacritics)
      };
    });
  })
  blueDisplay(blueResult);
  isPushingBlueTag();

  function blueDisplay(blueResult) {

    const templateHTML = (ingredient) => {
      return `<li><a class="dropdown-item itemBlue" href="#">${ingredient}</a></li>`
    }

    let blueMenu = document.getElementById('blueMenu');
    let htmlUl = '<input id="blueInput" class="inputDrop" type="text">';

    blueResult.forEach(ingredient => {
      htmlUl += templateHTML(ingredient);
    });

    blueMenu.innerHTML = htmlUl;
  }
}

function greenManager(elementList) {

  let greenResult = new Set([]);

  elementList.forEach(recette => {
    let applianceWithoutDiacritics = recette.appareils;
    if (isValid(applianceWithoutDiacritics) === true) {
      greenResult.add(applianceWithoutDiacritics)
    }
  })
  greenDisplay(greenResult);
  isPushingGreenTag();

  function greenDisplay(greenResult) {

    const templateHTML = (appliance) => {
      return `<li><a class="dropdown-item itemGreen" href="#">${appliance}</a></li>`
    }
    let greenMenu = document.getElementById('greenMenu');
    let htmlUl = '<input id="greenInput" class="inputDrop" type="text">';

    greenResult.forEach(appareils => {
      htmlUl += templateHTML(appareils);
    });

    greenMenu.innerHTML = htmlUl;
  }
}

function redManager(elementList) {

  let redResult = new Set([]);

  elementList.forEach(recette => {
    recette.ustensils.forEach(elm => {
      if (isValid(elm) === true) {
        redResult.add(elm)
      }
    })
  })
  redDisplay(redResult);
  isPushingRedTag();

  function redDisplay(redResult) {

    const templateHTML = (ustensils) => {
      return `<li><a class="dropdown-item itemRed" href="#">${ustensils}</a></li>`
    }
    let redMenu = document.getElementById('redMenu');
    let htmlUl = '<input id="redInput" class="inputDrop" type="text">';

    redResult.forEach(appareils => {
      htmlUl += templateHTML(appareils);
    });

    redMenu.innerHTML = htmlUl;
  }
}

// - - - - - - - - - - - - - - - - - - - - -
// Gestion DOM dropdown 
function ingredientsDropdown(database) {
  const blueBtn = document.getElementById('blueBtn');
  const blueMenu = document.getElementById('blueMenu');

  const intoInputIngredients = () => {
    blueMenu.classList.add('show');
    blueBtn.classList.add('bluePush');
  }
  const intoSwitchIngredients = () => {
    blueBtn.classList.remove('bluePush');
    blueMenu.classList.remove('show');
  }
  blueBtn.addEventListener('click', intoInputIngredients);
  blueMenu.addEventListener('focusout', intoSwitchIngredients)
}
ingredientsDropdown(database);

function appareilsDropdown() {
  const greenBtn = document.getElementById('greenBtn');
  const greenMenu = document.getElementById('greenMenu');

  const intoInputAppliances = () => {
    greenBtn.classList.add('greenPush');
    greenMenu.classList.add('show');
  }
  const intoButtonAppliances = () => {
    greenBtn.classList.remove('greenPush');
    greenMenu.classList.remove('show');
  }
  greenBtn.addEventListener('click', intoInputAppliances);
  greenMenu.addEventListener('focusout', intoButtonAppliances)
}
appareilsDropdown(database);

function ustensilsDropdown() {
  const redBtn = document.getElementById('redBtn');
  const redMenu = document.getElementById('redMenu');

  const intoInputUstensils = () => {
    redBtn.classList.add('hidden');
    redMenu.classList.add('show');
  }
  const intoButtonUstensils = () => {
    redBtn.classList.remove('hidden');
    redMenu.classList.remove('show');
  }
  redBtn.addEventListener('click', intoInputUstensils);
  redMenu.addEventListener('focusout', intoButtonUstensils)
}
ustensilsDropdown();


/*##### S E R V I C E S ###############################################################################################################################*/
//  - - - - - - - - - - - - - - - - - - - - -
// Regex de validation
function isValid(tester) {
  return !/[~`!#$%\^&*+=\-\[\]\\'.;,/{}|\\":<>\?]/g.test(tester);
}

//  - - - - - - - - - - - - - - - - - - - - -
// Remove Diacritics

String.prototype.removeDiacritics = function () {
  return this.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}