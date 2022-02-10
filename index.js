import dropDownUi from './dropdownUI.js';
import filteredDatabase from './filteredData.js';

const DATABASE_RECIPE = filteredDatabase;
console.log(DATABASE_RECIPE);
let listOfResult = [];
let tagValue = [];

main();

// Main Algo
function main() {
  displayProcess(DATABASE_RECIPE);

  isManagingInputAlgo();
  isManagingDropdownAlgo();

  // Algo coté general input value
  function isManagingInputAlgo() {
    let research = document.getElementById('searchBar');

    if (research.value.length > 0 && tagValue.length === 0 && listOfResult.length > 0) {
      listOfResult.length = 0;

      for (const recipe of DATABASE_RECIPE) {
        if (recipe.name.indexOf(research.value) > -1) {
          listOfResult.push(recipe);

        } else if (recipe.ingredients.indexOf(research.value) > -1) {
          listOfResult.push(recipe);

        } else if (recipe.description.indexOf(research.value) > -1) {
          listOfResult.push(recipe);
        }
      }

      displayProcess(listOfResult)
      console.log('AFTER listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);
    }

    research.addEventListener('input', (bar) => {
      let targetValue = bar.target.value.removeDiacritics();

      if (targetValue.length >= 3) {
        setTimeout(() => {
          let actualInputValue = document.getElementById('searchBar').value.removeDiacritics();

          if (targetValue === actualInputValue && listOfResult.length === 0 && tagValue.length === 0) {
            isFilteringInput(DATABASE_RECIPE, listOfResult);
            console.log('INPUT 1 | listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);

          } else if (targetValue === actualInputValue && listOfResult.length > 0 && tagValue.length === 0) {
            listOfResult.length = 0;
            isFilteringInput(DATABASE_RECIPE, listOfResult);
            console.log('INPUT 2 | listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);

          } else if (targetValue === actualInputValue && listOfResult.length > 0 && tagValue.length > 0) {
            let newResult = [];
            isFilteringInput(listOfResult, newResult);
            listOfResult = newResult;
            console.log('INPUT 3 | listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);
          }

          function isFilteringInput(originList, targetList) {
            for (const elm of originList) {
              if (elm.name.indexOf(targetValue) > -1) {
                targetList.push(elm);
              } else if (elm.ingredients.indexOf(targetValue) > -1) {
                targetList.push(elm);
              } else if (elm.description.indexOf(targetValue) > -1) {
                targetList.push(elm);
              }
            }
          }

          // display condition of result
          displayProcess(listOfResult)
          isManagingDropdownAlgo()
        }, 200);

      } else if (research.value.length === 0 && tagValue.length === 0 && listOfResult.length > 0) {
        listOfResult.length = 0;
        displayProcess(DATABASE_RECIPE);
        isManagingDropdownAlgo()

      }
      displayProcess(DATABASE_RECIPE);
      isManagingDropdownAlgo()
    });
  }

  // Algo coté dropdown tag value
  function isManagingDropdownAlgo() {
    let dropdownItems = Array.from(document.getElementsByClassName('dropdown-item'));

    // if (tagValue.length > 0) {
    //   let newResult = [];
    //   isFilteringTag(listOfResult, newResult);
    //   listOfResult = newResult;
    // }

    for (const item of dropdownItems) {
      item.addEventListener('click', function (event) {
        tagValue.push(event.target.textContent)
        console.log(tagValue);

        if (listOfResult.length === 0) {
          isFilteringTag(DATABASE_RECIPE, listOfResult);

        } else if (listOfResult.length > 0) {
          let newResult = [];
          isFilteringTag(listOfResult, newResult);
          listOfResult = newResult;
        }

        function isFilteringTag(originList, targetList) {
          for (const recipe of originList) {
            if (recipe.ingredients.indexOf(event.target.textContent) > -1) {
              targetList.push(recipe);

            } else if (recipe.appareil.indexOf(event.target.textContent) > -1) {
              targetList.push(recipe);

            } else if (recipe.ustensils.indexOf(event.target.textContent) > -1) {
              targetList.push(recipe);
            }
          }
        }

        console.log('DD | listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);
        // display condition of result
        displayProcess(listOfResult)
        removeTheValueSelected();
        isManagingInputAlgo();
        isManagingDropdownAlgo()
      })
    }
  }

  function removeTheValueSelected() {
    let closeBtn = Array.from(document.getElementsByClassName('closeBtn'));
    let research = document.getElementById('searchBar').value;

    for (const btn of closeBtn) {
      btn.addEventListener('click', function (event) {
        let indexFound = tagValue.findIndex(tag => tag === event.target.parentElement.outerHTML);
        tagValue.splice(indexFound, 1);
        console.log(tagValue);

        console.log('AFTER REMOTE TAG | listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length, 'research.length', research.length);

        if (tagValue.length === 0 && research.length === 0) {
          listOfResult.length = 0;
          displayProcess(DATABASE_RECIPE);
        } else {
          displayProcess(listOfResult);
        }

        isManagingDropdownAlgo();
        isManagingInputAlgo();
        removeTheValueSelected();
      })
    }
  }
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

  if (elementList.length === 0) {
    htmlString = ` <h1> Aucune recette ne correspond à votre critère de recherche ! </h1>`
  } else {
    for (const elm of elementList) {
      templateHTML(elm);
    }
  }

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


/*##### D R O P D O W N S #########################################################*/
// Dropdown display

function blueManager(elementList) {
  let blueResult = [];
  isCompletingBlueResult(elementList);

  function isCompletingBlueResult(elementList) {

    for (const elm of elementList) {
      let ingredients = elm.ingredients;
      for (const subElm of ingredients) {
        if (isValid(subElm) === true && blueResult.includes(subElm) === false) {
          blueResult.push(subElm);
        }
      }
    }
  }

  // Green Input Manager
  let blueButton = document.getElementById('blueBtn');
  blueButton.addEventListener('click', blueDynamicInput);

  function blueDynamicInput() {
    let blueInput = document.getElementById('blueInput');

    blueInput.addEventListener('input', (bar) => {
      console.log(bar.target.value);
      if (blueInput.value.length >= 3) {
        let newResult = [];

        for (const elm of blueResult) {
          let inputwithoutDiacritics = bar.target.value.removeDiacritics();
          if (elm.indexOf(inputwithoutDiacritics) > -1) {
            newResult.push(elm);
          }
        }
        blueResult = newResult;
        colorDisplay(blueResult, 'blue', 'Blue');
        isPushingColorTag('Blue');

      } else {
        isCompletingBlueResult(elementList);
        colorDisplay(blueResult, 'blue', 'Blue');
        isPushingColorTag('Blue');
      }
    });
  }

  colorDisplay(blueResult, 'blue', 'Blue');
  isPushingColorTag('Blue');
}

function greenManager(elementList) {
  let greenResult = [];
  isCompletingGreenResult(elementList);

  function isCompletingGreenResult(elementList) {

    for (const elm of elementList) {
      let appareil = elm.appareil;
      if (isValid(appareil) === true && greenResult.includes(appareil) === false) {
        greenResult.push(appareil)
      }
    }
  }

  // Green Input Manager
  let greenButton = document.getElementById('greenBtn');
  greenButton.addEventListener('click', greenDynamicInput);

  function greenDynamicInput() {
    let greenInput = document.getElementById('greenInput');

    greenInput.addEventListener('input', (bar) => {
      console.log(bar.target.value);
      if (greenInput.value.length >= 3) {
        let newResult = [];

        for (const elm of greenResult) {
          let inputwithoutDiacritics = bar.target.value.removeDiacritics();
          if (elm.indexOf(inputwithoutDiacritics) > -1) {
            newResult.push(elm);
          }
        }
        greenResult = newResult;

        colorDisplay(greenResult, 'green', 'Green');
        isPushingColorTag('Green');

      } else {
        isCompletingGreenResult(elementList);
        colorDisplay(greenResult, 'green', 'Green');
        isPushingColorTag('Green');
      }
    });
  }

  colorDisplay(greenResult, 'green', 'Green');
  isPushingColorTag('Green');
}

function redManager(elementList) {
  let redResult = [];
  isCompletingRedResult(elementList);

  function isCompletingRedResult(elementList) {

    for (const elm of elementList) {
      let ustensils = elm.ustensils;
      for (const subElm of ustensils) {
        if (isValid(subElm) === true && redResult.includes(subElm) === false) {
          redResult.push(subElm);
        }
      }
    }
  }

  let redButton = document.getElementById('redBtn');
  redButton.addEventListener('click', redDynamicInput);

  function redDynamicInput() {
    let redInput = document.getElementById('redInput');

    redInput.addEventListener('input', (bar) => {
      console.log(bar.target.value);
      if (redInput.value.length >= 3) {
        let newResult = [];

        for (const elm of redResult) {
          let inputwithoutDiacritics = bar.target.value.removeDiacritics();
          if (elm.indexOf(inputwithoutDiacritics) > -1) {
            newResult.push(elm);
          }
        }
        redResult = newResult;
        colorDisplay(redResult, 'red', 'Red');
        isPushingColorTag('Red')

      } else {
        colorDisplay(redResult, 'red', 'Red');
        isPushingColorTag('Red');
        isCompletingRedResult(elementList);
      }
    });
  }

  colorDisplay(redResult, 'red', 'Red');
  isPushingColorTag('Red')
}

function colorDisplay(result, color, colorTag) {
  let Menu = document.getElementById(color + 'MenuDisplay');
  let htmlUl = '';

  for (const item of result) {
    if (tagValue.includes(item) === false) {
      htmlUl += templateHTML(item, colorTag);
    }
  }
  Menu.innerHTML = htmlUl;
}

function templateHTML(item, colorTag) {
  return `<li><a class="dropdown-item item${colorTag}" href="#">${item}</a></li>`
}

// - - - - - - - - - - - - - - - - - - - - -
// Recupération click dropdown
let tagList = document.getElementById('tagList');
let htmlTag = [];

function isPushingColorTag(color) {
  let dropItems = Array.from(document.getElementsByClassName('item' + color));

  for (const elm of dropItems) {
    elm.addEventListener('click', function (event) {
      htmlTag.push(`<div class="tag ${color}">${event.target.textContent}<div class="closeBtn">x</div></div>`);
      tagList.innerHTML = htmlTag;
      removeTag();
    });
  }
}

function removeTag() {
  let closeBtn = Array.from(document.getElementsByClassName('closeBtn'));

  for (const btn of closeBtn) {
    btn.addEventListener('click', function (event) {
      let indexFound = htmlTag.findIndex(tag => tag === event.target.parentElement.outerHTML);
      htmlTag.splice(indexFound, 1);
      tagList.innerHTML = htmlTag;
      removeTag();
    })
  }
}


/*##### S E R V I C E S #########################################################*/
// Regex de validation
function isValid(tester) {
  return !/[~`!#$%\^&*+=\-\[\]\\'.;,/{}|\\":<>\?]/g.test(tester);
}

//  - - - - - - - - - - - - - - - - - - - - -
// Remove Diacritics

String.prototype.removeDiacritics = function () {
  return this.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}