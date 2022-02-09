import dropDownUi from './dropdownUI.js';
import filteredDatabase from './filteredData.js';

main();

// Main Algo
function main() {

  const DATABASE_RECIPE = filteredDatabase;
  console.log(DATABASE_RECIPE);

  let listOfResult = [];
  let tagValue = [];

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
      console.log('TEST LISTENER')

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
        }, 500);
      } else if (tagValue.length === 0) {
        listOfResult.length = 0;
        console.log('ELSE IF 1 listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);
        console.log('ELSE IF 1 DATABASE_RECIPE.length', DATABASE_RECIPE.length);
      }
      displayProcess(DATABASE_RECIPE);
      isManagingDropdownAlgo()
    });
  }

  // Algo coté dropdown tag value
  function isManagingDropdownAlgo() {

    let dropdownItems = Array.from(document.getElementsByClassName('dropdown-item'));

    for (const item of dropdownItems) {
      item.addEventListener('click', function (event) {
        tagValue.push(event.target.textContent)
        console.log(tagValue);

        if (listOfResult.length === 0) {

          for (const recipe of DATABASE_RECIPE) {

            if (recipe.ingredients.indexOf(event.target.textContent) > -1) {
              listOfResult.push(recipe);

            } else if (recipe.appareil.indexOf(event.target.textContent) > -1) {
              listOfResult.push(recipe);

            } else if (recipe.ustensils.indexOf(event.target.textContent) > -1) {
              listOfResult.push(recipe);
            }
          }

          console.log('DD1 listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);

        } else if (listOfResult.length > 0) {
          let newResult = [];

          for (const recipe of listOfResult) {

            if (recipe.ingredients.indexOf(event.target.textContent) > -1) {
              newResult.push(recipe);

            } else if (recipe.appareil.indexOf(event.target.textContent) > -1) {
              newResult.push(recipe);

            } else if (recipe.ustensils.indexOf(event.target.textContent) > -1) {
              newResult.push(recipe);
            }
          }

          listOfResult = newResult;

          console.log('DD2 listOfResult.length', listOfResult.length, 'tagValue.length', tagValue.length);
        }

        // display condition of result
        displayProcess(listOfResult)
        removeTheValueSelected();
        isManagingDropdownAlgo()
        isManagingInputAlgo();
      })
    }
  }

  function removeTheValueSelected() {
    let closeBtn = document.getElementsByClassName('closeBtn');
    let closeBtnArray = Array.from(closeBtn);

    for (const btn of closeBtnArray) {

      btn.addEventListener('click', function (event) {
        let indexFound = tagValue.findIndex(tag => tag === event.target.parentElement.outerHTML);
        tagValue.splice(indexFound, 1);
        console.log(tagValue);

        displayProcess(DATABASE_RECIPE);
        isManagingInputAlgo();
        isManagingDropdownAlgo();
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

    //8888888888888888888888888888888888888888888888888888888888
    // elementList.forEach(recette => {

    //   recette.ingredients.forEach(elm => {
    //     let ingredientWithoutDiacritics = elm.removeDiacritics();
    //     if (isValid(ingredientWithoutDiacritics) === true && blueResult.includes(ingredientWithoutDiacritics) === false) {
    //       blueResult.push(ingredientWithoutDiacritics)
    //     };
    //   });
    // })
    //8888888888888888888888888888888888888888888888888888888888888
  }

  // Green Input Manager
  let blueButton = document.getElementById('blueBtn');
  blueButton.addEventListener('click', blueDynamicInput);
  console.log('blueResultBefore', blueResult);

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

        //888888888888888888888888888888888888
        // blueResult = blueResult.filter(colorResultFilterOptions);

        // function colorResultFilterOptions(elm) {
        //   let inputwithoutDiacritics = bar.target.value.removeDiacritics();

        //   if (elm.indexOf(inputwithoutDiacritics) > -1) {
        //     return true
        //   } else {
        //     return false
        //   }
        // }
        //888888888888888888888888888888888888888888888

        blueDisplay(blueResult);
        isPushingBlueTag();

      } else {
        isCompletingBlueResult(elementList);
        blueDisplay(blueResult);
        isPushingBlueTag();
      }
    });
  }

  blueDisplay(blueResult);
  isPushingBlueTag();

  function blueDisplay(blueResult) {

    let blueMenu = document.getElementById('blueMenuDisplay');
    let htmlUl = '';

    let actualBlueResult = blueResult;
    if (blueResult === actualBlueResult) {
      console.log('blueResultAfter', blueResult);

      for (const ingredient of blueResult) {
        htmlUl += templateHTML(ingredient);
      }

      //88888888888888888888888888888888888888888888888
      // blueResult.forEach(ingredient => {
      //   htmlUl += templateHTML(ingredient);
      // });
      //888888888888888888888888888888888888888888888888

      blueMenu.innerHTML = htmlUl;
    }

    function templateHTML(ingredient) {
      return `<li><a class="dropdown-item itemBlue" href="#">${ingredient}</a></li>`
    }
  }
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

    //88888888888888888888888888888888888888888888888888888
    // elementList.forEach(recette => {
    //   let applianceWithoutDiacritics = recette.appareil.removeDiacritics();
    //   if (isValid(applianceWithoutDiacritics) === true && greenResult.includes(applianceWithoutDiacritics) === false) {
    //     greenResult.push(applianceWithoutDiacritics)
    //   }
    // })
    //8888888888888888888888888888888888888888888888888888
  }

  // Green Input Manager
  let greenButton = document.getElementById('greenBtn');
  greenButton.addEventListener('click', greenDynamicInput);
  console.log('greenResultBefore', greenResult);

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

        //8888888888888888888888888888888888888888888888888888888888888888888888888
        // greenResult = greenResult.filter(colorResultFilterOptions);

        // function colorResultFilterOptions(elm) {
        //   let inputwithoutDiacritics = bar.target.value.removeDiacritics();

        //   if (elm.indexOf(inputwithoutDiacritics) > -1) {
        //     return true
        //   } else {
        //     return false
        //   }
        // }
        //8888888888888888888888888888888888888888888888888888888888888888888888888

        greenDisplay(greenResult);
        isPushingGreenTag();

      } else {
        isCompletingGreenResult(elementList);
        greenDisplay(greenResult);
        isPushingGreenTag();
      }
    });
  }

  greenDisplay(greenResult);
  isPushingGreenTag();

  function greenDisplay(greenResult) {
    let greenMenu = document.getElementById('greenMenuDisplay');
    let htmlUl = '';

    let actualGreenResult = greenResult;
    if (greenResult === actualGreenResult) {
      console.log('greenResultAfter', greenResult);

      for (const appareil of greenResult) {
        htmlUl += templateHTML(appareil);
      }

      //888888888888888888888888888888888888888888888888888
      // greenResult.forEach(appareils => {
      //   htmlUl += templateHTML(appareils);
      // });
      //888888888888888888888888888888888888888888888888888

      greenMenu.innerHTML = htmlUl;

    }

    function templateHTML(appareil) {
      return `<li><a class="dropdown-item itemGreen" href="#">${appareil}</a></li>`
    }
  }
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

    //8888888888888888888888888888888888888888888888888888888
    // elementList.forEach(recette => {
    //   recette.ustensils.forEach(elm => {
    //     let ustensilsWithoutDiacritics = elm.removeDiacritics();
    //     if (isValid(ustensilsWithoutDiacritics) === true && redResult.includes(ustensilsWithoutDiacritics) === false) {
    //       redResult.push(ustensilsWithoutDiacritics);
    //     }
    //   })
    // })
    //88888888888888888888888888888888888888888888888888888888
  }

  let redButton = document.getElementById('redBtn');
  redButton.addEventListener('click', redDynamicInput);
  console.log('redResultBefore', redResult);

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

        //8888888888888888888888888888888888888888888888888888888888888888
        // redResult = redResult.filter(colorResultFilterOptions);

        // function colorResultFilterOptions(elm) {
        //   let inputwithoutDiacritics = bar.target.value.removeDiacritics();

        //   if (elm.indexOf(inputwithoutDiacritics) > -1) {
        //     return true
        //   } else {
        //     return false
        //   }
        // }
        //8888888888888888888888888888888888888888888888888888888888888888

        redDisplay(redResult);
        isPushingRedTag();

      } else {
        isCompletingRedResult(elementList);
        isPushingRedTag();
        redDisplay(redResult);
      }
    });
  }

  redDisplay(redResult);
  isPushingRedTag();

  function redDisplay(redResult) {

    let redMenu = document.getElementById('redMenuDisplay');
    let htmlUl = '';

    let actualRedResult = redResult;
    if (redResult === actualRedResult) {
      console.log('redResultAfter', redResult);

      for (const ustensil of redResult) {
        htmlUl += templateHTML(ustensil);
      }

      //88888888888888888888888888888888888888888888888888888888
      // redResult.forEach(ustensils => {
      //   htmlUl += templateHTML(ustensils);
      // });
      //888888888888888888888888888888888888888888888888888888888

      redMenu.innerHTML = htmlUl;

    }

    function templateHTML(ustensils) {
      return `<li><a class="dropdown-item itemRed" href="#">${ustensils}</a></li>`
    }
  }
}

// - - - - - - - - - - - - - - - - - - - - -
// Recupération click dropdown

let tagList = document.getElementById('tagList');
let htmlTag = [];

function isPushingBlueTag() {
  let dropItemsBlue = Array.from(document.getElementsByClassName('itemBlue'));

  for (const elm of dropItemsBlue) {
    elm.addEventListener('click', function (event) {
      htmlTag.push(`<div class="tag Blue">${event.target.textContent}<div class="closeBtn">x</div></div>`);
      tagList.innerHTML = htmlTag;
      removeTag();
    });
  }
};

function isPushingGreenTag() {
  let dropItemsGreen = Array.from(document.getElementsByClassName('itemGreen'));

  for (const elm of dropItemsGreen) {
    elm.addEventListener('click', function (event) {
      htmlTag.push(`<div class="tag Green">${event.target.textContent}<div class="closeBtn">x</div></div>`);
      tagList.innerHTML = htmlTag;
      removeTag();
    });
  }
};

function isPushingRedTag() {
  let dropItemsRed = Array.from(document.getElementsByClassName('itemRed'));

  for (const elm of dropItemsRed) {
    elm.addEventListener('click', function (event) {
      htmlTag.push(`<div class="tag Red">${event.target.textContent}<div class="closeBtn">x</div></div>`);
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
      console.log('index de la suppression', indexFound);
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