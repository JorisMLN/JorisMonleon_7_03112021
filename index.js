import database from './database.js';
import filteredDatabase from './filteredData.js';

//  - - - - - - - - - - - - - - - - - - - - -
// Main Algo
const inputResearch = (tagValue) => {
  let research = document.getElementById('searchBar');
  let filteredRecipe = { filterByName: [], filterByDescription: [] };

  resultDisplay(database, filteredRecipe);
  blueManager(database, filteredRecipe);
  greenManager(database, filteredRecipe);
  redManager(database, filteredRecipe);
  
  research.addEventListener('input', (bar) => {
    let targetValue = bar.target.value.removeDiacritics();

    if (targetValue.length >= 3) {
      setTimeout(() => {
        let actualInputValue = document.getElementById('searchBar').value.removeDiacritics();
        if (targetValue === actualInputValue) {

          // Display loop for the main page
          filteredDatabase.forEach(recette => {
            if (recette.name.indexOf(targetValue) > -1) {
              filteredRecipe.filterByName.push(recette.id);
            } else if (recette.description.indexOf(targetValue) > -1) {
              filteredRecipe.filterByDescription.push(recette.id);
            }
          });
        }

        resultDisplay(database, filteredRecipe);
        blueManager(database, filteredRecipe);
        greenManager(database, filteredRecipe);
        redManager(database, filteredRecipe);
      }, 500);
    }
    resultDisplay(database, filteredRecipe);
    blueManager(database, filteredRecipe);
    greenManager(database, filteredRecipe);
    redManager(database, filteredRecipe);

    filteredRecipe.filterByName.length = 0;
    filteredRecipe.filterByDescription.length = 0;
  });
}
inputResearch();

//  - - - - - - - - - - - - - - - - - - - - -
// General display
function resultDisplay(database, filteredRecipe) {
  let htmlDisplayBloc = document.getElementById('result');
  let htmlString = '';

  // template HTML du bloc vignette
  const templateHTML = (element) => {
    return `
    <div class="card" style="width: 18rem;">
      <img src="images/test.jpg" class="card-img-top" alt="chien de traineau">
      <div class="card__body">
        <h5 class="card-title">${element.name}</h5>
        <p class="body-text">${element.description}</p>
      </div>
    </div>
    `
  }

  filteredRecipe.filterByName.length === 0 && filteredRecipe.filterByDescription.length === 0
    ?
    database.forEach(element => {
      htmlString += templateHTML(element);
    })
    :
    database.forEach(element => {
      if (filteredRecipe.filterByName.includes(element.id) === true) {
        htmlString += templateHTML(element);
      }
    });
  database.forEach(element => {
    if (filteredRecipe.filterByDescription.includes(element.id) === true) {
      htmlString += templateHTML(element);
    }
  });

  htmlDisplayBloc.innerHTML = htmlString;
};

//  - - - - - - - - - - - - - - - - - - - - -
//Appel de l'algo principale + variables de tag
let tagList = document.getElementById('tagList');
let htmlTag = [];
let tagValue = [];

inputResearch(tagValue);

/*##### D R O P D O W N S ###############################################################################################################################*/
// Recupération click dropdown

function recoveryValueBlue() {
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

function recoveryValueGreen() {
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

function recoveryValueRed() {
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

      tagList.innerHTML = htmlTag;
      console.log(htmlTag);
      removeTag();
    })
  })
}

// - - - - - - - - - - - - - - - - - - - - -
// Dropdown display
function blueManager(database, filteredRecipe) {

  let blueResult = new Set([]);

  database.forEach(recette => {
    recette.ingredients.forEach(elm => {
      let ingredientWithoutDiacritics = elm.ingredient.removeDiacritics();
      if (isValid(ingredientWithoutDiacritics) === true) {
        blueResult.add(ingredientWithoutDiacritics)
      };
    });
  })
  blueDisplay(blueResult, filteredRecipe, database);
  recoveryValueBlue();

  function blueDisplay(blueResult, filteredRecipe, database) {

    const templateHTML = (ingredient) => {
      return `<li><a class="dropdown-item itemBlue" href="#">${ingredient}</a></li>`
    }
    let blueMenu = document.getElementById('blueMenu');
    let htmlUl = '<input id="blueInput" class="inputDrop" type="text">';

    console.log(filteredRecipe)

    if (filteredRecipe.filterByName.length === 0 && filteredRecipe.filterByDescription.length === 0) {
      blueResult.forEach(ingredient => {
        htmlUl += templateHTML(ingredient);
      })
    } else {
      database.forEach(recette => {
        if (filteredRecipe.filterByName.includes(recette.id) === true) {
          recette.ingredients.forEach(elm => {
            let ingredientWithoutDiacritics = elm.ingredient.removeDiacritics();
            htmlUl += templateHTML(ingredientWithoutDiacritics);
          })
        }
      })
    }

    blueMenu.innerHTML = htmlUl;
  }
}

function greenManager(database, filteredRecipe) {

  let greenResult = new Set([]);

  database.forEach(recette => {
    let applianceWithoutDiacritics = recette.appliance.removeDiacritics();
    if (isValid(applianceWithoutDiacritics) === true) {
      greenResult.add(applianceWithoutDiacritics)
    }
  })
  greenDisplay(greenResult, filteredRecipe, database);
  recoveryValueGreen();

  function greenDisplay(greenResult, filteredRecipe, database) {

    const templateHTML = (appliance) => {
      return `<li><a class="dropdown-item itemGreen" href="#">${appliance}</a></li>`
    }
    let greenMenu = document.getElementById('greenMenu');
    let htmlUl = '<input id="greenInput" class="inputDrop" type="text">';

    console.log(filteredRecipe)

    if (filteredRecipe.filterByName.length === 0 && filteredRecipe.filterByDescription.length === 0) {
      greenResult.forEach(appliance => {
        htmlUl += templateHTML(appliance);
      })
    } else {
      database.forEach(recette => {
        if (filteredRecipe.filterByName.includes(recette.id) === true) {
          let applianceWithoutDiacritics = recette.appliance.removeDiacritics();
          htmlUl += templateHTML(applianceWithoutDiacritics);
        }
      })
    }

    greenMenu.innerHTML = htmlUl;
  }
}

function redManager(database, filteredRecipe) {

  let redResult = new Set([]);

  database.forEach(recette => {
    recette.ustensils.forEach(elm => {
      if (isValid(elm) === true) {
        redResult.add(elm)
      }
    })
  })
  redDisplay(redResult, filteredRecipe, database);
  recoveryValueRed();

  function redDisplay(redResult, filteredRecipe, database) {

    const templateHTML = (ustensils) => {
      return `<li><a class="dropdown-item itemRed" href="#">${ustensils}</a></li>`
    }
    let redMenu = document.getElementById('redMenu');
    let htmlUl = '<input id="redInput" class="inputDrop" type="text">';

    if (filteredRecipe.filterByName.length === 0 && filteredRecipe.filterByDescription.length === 0) {
      redResult.forEach(ustensils => {
        htmlUl += templateHTML(ustensils);
      })
    }
    else {
      database.forEach(recette => {
        if (filteredRecipe.filterByName.includes(recette.id) === true) {
          recette.ustensils.forEach(elm => {
            let ustensilsWithoutDiacritics = elm.removeDiacritics();
            htmlUl += templateHTML(ustensilsWithoutDiacritics);
          })
        }
      })
    }

  redMenu.innerHTML = htmlUl;
  }
}

// - - - - - - - - - - - - - - - - - - - - -
// Gestion DOM dropdown 
const ingredientsDropdown = (database) => {
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

const appareilsDropdown = () => {
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

const ustensilsDropdown = () => {
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