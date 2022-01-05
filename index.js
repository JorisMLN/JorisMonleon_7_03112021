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

          let beforeFilterDescriptionArray = [];

          filterDatabase.forEach(recette => {
            if (recette.name.indexOf(targetValue) != -1) {
              resultArrayName.push(recette.id)
            }
            if (recette.description.indexOf(targetValue) != -1) {
              beforeFilterDescriptionArray.push(recette.id)
            }
          })

          // filtre pour enlever les doublons de recherche
          resultArrayDescription = beforeFilterDescriptionArray.filter(id => !resultArrayName.includes(id));

          // ordre alphabétique
          resultArrayDescription.sort();
          resultArrayName.sort();

          // logs de vérification
          console.log("resultArrayName");
          console.log(resultArrayName);
          console.log("resultArrayDescription");
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
/**
 * Result display loop
 * @param {Array<string>} database 
 * @param {Array<string>} resultArrayName 
 * @param {Array<string>} resultArrayDescription 
 */
function resultDisplay(database, resultArrayName, resultArrayDescription){
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

  resultArrayName.length === 0 && resultArrayDescription.length === 0 
  ? 
  database.forEach(element => {
      htmlString += templateHTML(element);
  })
  :
  database.forEach(element => {
    if (resultArrayName.includes(element.id) === true) {
      htmlString += templateHTML(element);
    }
  });
  database.forEach(element => {
    if (resultArrayDescription.includes(element.id) === true) {
      htmlString += templateHTML(element);
    }
  });

  htmlDisplayBloc.innerHTML = htmlString;
};


/*####################################################################################################################################*/
//  - - - - - - - - - - - - - - - - - - - - -
// Recupération click dropdown

let tagList = document.getElementById('tagList');
let htmlTag = [];

function recoveryValueBlue() {
  let dropItemsBlue = document.getElementsByClassName('itemBlue');

  Array.from(dropItemsBlue).forEach((item) => {
    item.addEventListener('click', function (event) {

      htmlTag.push(`<div class="tag Blue">${event.target.textContent}<div class="closeBtn">x</div></div>`);
      console.log(htmlTag)
      tagList.innerHTML = htmlTag;

      removeTag();
    });
  })
};

function recoveryValueGreen() {
  let dropItemsGreen = document.getElementsByClassName('itemGreen');

  Array.from(dropItemsGreen).forEach((item) => {
    item.addEventListener('click', function (event) {

      htmlTag.push(`<div class="tag Green">${event.target.textContent}<div class="closeBtn">x</div></div>`);
      console.log(htmlTag)
      tagList.innerHTML = htmlTag;

      removeTag();
    });
  })
};

function recoveryValueRed() {
  let dropItemsRed = document.getElementsByClassName('itemRed');

  Array.from(dropItemsRed).forEach((item) => {
    item.addEventListener('click', function (event) {
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
      htmlUl += `<li><a class="dropdown-item itemBlue" href="#">${ingredient}</a></li>`
    })
    menuIngredients.innerHTML = htmlUl;
  };
  ingredientDropdownLoop(database);
  recoveryValueBlue();
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
      htmlUl += `<li><a class="dropdown-item itemGreen" href="#">${appliance}</a></li>`
    })
    menuAppareils.innerHTML = htmlUl;
  };
  appareilsDropdownLoop(database);
  recoveryValueGreen();
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
      htmlUl += `<li><a class="dropdown-item itemRed" href="#">${ustensils}</a></li>`
    })
    menuUstensiles.innerHTML = htmlUl;
  };
  ustensilsDropdownLoop(database);
  recoveryValueRed();
}
ustensilsDropdown(database);


/*####################################################################################################################################*/
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