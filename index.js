import dropDownUi from './dropdownUI.js';
import filteredDatabase from './filteredData.js';


let DATABASE_RECIPE = filteredDatabase;
console.log(DATABASE_RECIPE);
let listOfResult = [];
let tagValue = [];

main();

// Main Algo
function main() {
  displayProcess(DATABASE_RECIPE);
  isManagingInputAlgo();
  isManagingDropdownAlgo();
}

// Algo coté general input value
function isManagingInputAlgo() {
  let research = document.getElementById('searchBar');

  if (research.value.length > 0 && tagValue.length === 0 && listOfResult.length > 0) {
    listOfResult.length = 0;

    listOfResult = DATABASE_RECIPE.filter(function (elm) {
      if (elm.name.indexOf(research.value) > -1) {
        return true

      } else if (elm.ingredients.indexOf(research.value) > -1) {
        return true

      } else if (elm.description.indexOf(research.value) > -1) {
        return true
      }
    });

    displayProcess(listOfResult)
    console.log('AFTER listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);
  }

  research.addEventListener('input', (bar) => {
    let targetValue = bar.target.value.removeDiacritics();
    console.log(targetValue)

    if (targetValue.length >= 3) {
      setTimeout(() => {
        let actualInputValue = document.getElementById('searchBar').value.removeDiacritics();

        if (targetValue === actualInputValue && listOfResult.length === 0 && tagValue.length === 0) {
          listOfResult = DATABASE_RECIPE.filter(filterOptions);
          console.log('INPUT 1 listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);

        } else if (targetValue === actualInputValue && listOfResult.length > 0 && tagValue.length === 0) {
          listOfResult.length = 0;
          listOfResult = DATABASE_RECIPE.filter(filterOptions);
          console.log('INPUT 2 listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);

        } else if (targetValue === actualInputValue && listOfResult.length > 0 && tagValue.length > 0) {
          listOfResult = listOfResult.filter(filterOptions);
          console.log('INPUT 3 listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);
        }

        function filterOptions(elm) {
          if (elm.name.indexOf(targetValue) > -1) {
            return true

          } else if (elm.ingredients.indexOf(targetValue) > -1) {
            return true

          } else if (elm.description.indexOf(targetValue) > -1) {
            return true
          }
          return false
        }

        // display condition of result
        displayProcess(listOfResult)
        isManagingDropdownAlgo()
      }, 200);

    } else if (research.value.length === 0 && tagValue.length === 0 && listOfResult.length > 0) {
      listOfResult.length = 0;
      displayProcess(DATABASE_RECIPE);
      isManagingDropdownAlgo();
    }
    displayProcess(DATABASE_RECIPE);

  });
}

// Algo coté dropdown tag value
function isManagingDropdownAlgo() {
  let dropdownItem = Array.from(document.getElementsByClassName('dropdown-item'));

  dropdownItem.forEach((button) => {
    button.addEventListener('click', function (event) {
      tagValue.push(event.target.textContent)
      console.log(tagValue);

      if (listOfResult.length === 0) {
        listOfResult = DATABASE_RECIPE.filter(filterTagOptions);

      } else if (listOfResult.length > 0) {
        listOfResult = listOfResult.filter(filterTagOptions);
        console.log('listOfResult', listOfResult);

      }

      function filterTagOptions(elm) {
        console.log(elm.ingredients.indexOf(event.target.textContent));

        if (elm.ingredients.indexOf(event.target.textContent) > -1) {
          return true

        } else if (elm.appareil.indexOf(event.target.textContent) > -1) {
          return true

        } else if (elm.ustensils.indexOf(event.target.textContent) > -1) {
          return true
        }
      }

      // display condition of result
      displayProcess(listOfResult)
      removeTheValueSelected();
      isManagingDropdownAlgo()
      isManagingInputAlgo();
    })
  });

}

function removeTheValueSelected() {
  let closeBtn = Array.from(document.getElementsByClassName('closeBtn'));
  let research = document.getElementById('searchBar').value;

  closeBtn.forEach((button) => {
    button.addEventListener('click', function (event) {
      let indexFound = tagValue.findIndex(tag => tag === event.target.parentElement.outerHTML);
      tagValue.splice(indexFound, 1);

      console.log('tagValue --- ', tagValue);
      console.log('research --- ', research);

      let newResultBeforeConsiderTag = [];

      if (tagValue.length > 0) {
        listOfResult.length = 0;

        DATABASE_RECIPE.forEach((recipe) => {
          if (recipe.name.indexOf(research) > -1) {
            newResultBeforeConsiderTag.push(recipe);

          } else if (recipe.ingredients.indexOf(research) > -1) {
            newResultBeforeConsiderTag.push(recipe);

          } else if (recipe.description.indexOf(research) > -1) {
            newResultBeforeConsiderTag.push(recipe);
          }
        });
        console.log('newResultBeforeConsiderTag', newResultBeforeConsiderTag);

        newResultBeforeConsiderTag.forEach((recipe) => {
          tagValue.forEach((tag) => {
            if (recipe.ingredients.indexOf(tag) > -1) {
              listOfResult.push(recipe);

            } else if (recipe.appareil.indexOf(tag) > -1) {
              listOfResult.push(recipe);

            } else if (recipe.ustensils.indexOf(tag) > -1) {
              listOfResult.push(recipe);
            }
          })
        });

        console.log('listOfResult', listOfResult)
        displayProcess(listOfResult);

      } else if (tagValue.length === 0 && research.length === 0) {
        displayProcess(DATABASE_RECIPE);

      }

      isManagingInputAlgo();
      isManagingDropdownAlgo();
      removeTheValueSelected();
    })
  })
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
    return htmlString += ` <div class="card">
        <img src="images/test.jpg" class="card-img-top" alt="chien de traineau">
        <div class="cardBody">
          <div class="cardBody__title">
            <div class="cardBody__title--left">${element.name}</div>
            <div class="cardBody__title--right">${element.time} min</div>
          </div>
          <div class="cardBody__infos">
            <div class="cardBody__infos--left">${ingredientTemplate(element.ingredients)}</div>
            <div class="cardBody__infos--right">${element.description}</div>
          </div>
        </div>
      </div>
    `

    function ingredientTemplate(ingredients) {
      let complet = '';

      for (const ingredient of ingredients) {
        complet += `<div>${ingredient}</div>`
      }
      return complet;
    };
  };
};


/*##### D R O P D O W N S ###############################################################################################################################*/
// Dropdown display
function blueManager(elementList) {
  let blueResult = [];
  isCompletingBlueResult(elementList);

  function isCompletingBlueResult(elementList) {
    elementList.forEach(recette => {
      recette.ingredients.forEach(ingredient => {
        if (isValid(ingredient) === true && blueResult.includes(ingredient) === false) {
          blueResult.push(ingredient)
        };
      });
    })
  }

  // Blue Input Manager
  let blueButton = document.getElementById('blueBtn');
  blueButton.addEventListener('click', blueDynamicInput);

  function blueDynamicInput() {
    let blueInput = document.getElementById('blueInput');

    blueInput.addEventListener('input', (bar) => {
      console.log(bar.target.value);
      if (blueInput.value.length >= 3) {

        console.log('testBlue');
        blueResult = blueResult.filter(colorResultFilterOptions);

        function colorResultFilterOptions(elm) {
          let inputwithoutDiacritics = bar.target.value.removeDiacritics();
          console.log(inputwithoutDiacritics);

          if (elm.indexOf(inputwithoutDiacritics) > -1) {
            return true
          } else {
            return false
          }
        }

        blueDisplay(blueResult);
        isPushingColorTag('Blue');
        console.log('blueResultAfter', blueResult);

      } else {
        isCompletingBlueResult(elementList);
        blueDisplay(blueResult);
        isPushingColorTag('Blue');
      }
    });
  }

  blueDisplay(blueResult);
  isPushingColorTag('Blue');

  function blueDisplay(blueResult) {

    let blueMenu = document.getElementById('blueMenuDisplay');
    let htmlUl = '';

    blueResult.forEach(ingredient => {
      if (tagValue.includes(ingredient) === false) {
        htmlUl += templateHTML(ingredient);
      }
    });
    blueMenu.innerHTML = htmlUl;

    function templateHTML(ingredient) {
      return `<li><a class="dropdown-item itemBlue" href="#">${ingredient}</a></li>`
    }
  }
}

function greenManager(elementList) {
  let greenResult = [];
  isCompletingGreenResult(elementList);

  function isCompletingGreenResult(elementList) {
    elementList.forEach(recette => {
      let appareil = recette.appareil;
      if (isValid(appareil) === true && greenResult.includes(appareil) === false) {
        greenResult.push(appareil)
      }
    })
  }

  // Green Input Manager
  let greenButton = document.getElementById('greenBtn');
  greenButton.addEventListener('click', greenDynamicInput);

  function greenDynamicInput() {
    let greenInput = document.getElementById('greenInput');

    greenInput.addEventListener('input', (bar) => {
      console.log(bar.target.value);
      if (greenInput.value.length >= 3) {
        console.log('testGreen');
        greenResult = greenResult.filter(colorResultFilterOptions);

        function colorResultFilterOptions(elm) {
          let inputwithoutDiacritics = bar.target.value.removeDiacritics();
          console.log(inputwithoutDiacritics);

          if (elm.indexOf(inputwithoutDiacritics) > -1) {
            return true
          } else {
            return false
          }
        }
        greenDisplay(greenResult);
        isPushingColorTag('Green');
        console.log('greenResultAfter', greenResult);

      } else {
        isCompletingGreenResult(elementList);
        greenDisplay(greenResult);
        isPushingColorTag('Green');
      }
    });
  }

  greenDisplay(greenResult);
  isPushingColorTag('Green');

  function greenDisplay(greenResult) {
    let greenMenu = document.getElementById('greenMenuDisplay');
    let htmlUl = '';

    greenResult.forEach(appareil => {
      if (tagValue.includes(appareil) === false) {
        htmlUl += templateHTML(appareil);
      }
    });
    greenMenu.innerHTML = htmlUl;

    function templateHTML(appareil) {
      return `<li><a class="dropdown-item itemGreen" href="#">${appareil}</a></li>`
    }
  }
}

function redManager(elementList) {
  let redResult = [];
  isCompletingRedResult(elementList);

  function isCompletingRedResult(elementList) {
    elementList.forEach(recette => {
      recette.ustensils.forEach(ustensil => {
        if (isValid(ustensil) === true && redResult.includes(ustensil) === false) {
          redResult.push(ustensil);
        }
      })
    })
  }

  let redButton = document.getElementById('redBtn');
  redButton.addEventListener('click', redDynamicInput);

  function redDynamicInput() {
    let redInput = document.getElementById('redInput');

    redInput.addEventListener('input', (bar) => {
      console.log(bar.target.value);
      if (redInput.value.length >= 3) {
        console.log('testRed');
        redResult = redResult.filter(colorResultFilterOptions);

        function colorResultFilterOptions(elm) {
          let inputwithoutDiacritics = bar.target.value.removeDiacritics();
          console.log(inputwithoutDiacritics);

          if (elm.indexOf(inputwithoutDiacritics) > -1) {
            return true
          } else {
            return false
          }
        }
        redDisplay(redResult);
        isPushingColorTag('Red');
        console.log('redResultAfter', redResult);

      } else {
        isCompletingRedResult(elementList);
        isPushingColorTag('Red');
        redDisplay(redResult);
      }
    });
  }

  redDisplay(redResult);
  isPushingColorTag('Red');

  function redDisplay(redResult) {

    let redMenu = document.getElementById('redMenuDisplay');
    let htmlUl = '';

    redResult.forEach(ustensil => {
      if (tagValue.includes(ustensil) === false) {
        htmlUl += templateHTML(ustensil);
      }
    });
    redMenu.innerHTML = htmlUl;

    function templateHTML(ustensil) {
      return `<li><a class="dropdown-item itemRed" href="#">${ustensil}</a></li>`
    }
  }
}

// - - - - - - - - - - - - - - - - - - - - -
// Recupération click dropdown
let tagList = document.getElementById('tagList');
let htmlTag = [];

function isPushingColorTag(color) {
  let dropItems = Array.from(document.getElementsByClassName('item' + color));

  dropItems.forEach((item) => {
    item.addEventListener('click', function (event) {
      htmlTag.push(`<div class="tag ${color}">${event.target.textContent}<div class="closeBtn">x</div></div>`);
      tagList.innerHTML = htmlTag;
      removeTag();
    })
  })
}

function removeTag() {
  let closeBtn = document.getElementsByClassName('closeBtn');

  Array.from(closeBtn).forEach((button) => {
    button.addEventListener('click', function (event) {

      let indexFound = htmlTag.findIndex(tag => tag === event.target.parentElement.outerHTML);
      console.log('index de la suppression', indexFound);
      htmlTag.splice(indexFound, 1);
      tagList.innerHTML = htmlTag;

      removeTag();
      isManagingDropdownAlgo();
    })
  })
}


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