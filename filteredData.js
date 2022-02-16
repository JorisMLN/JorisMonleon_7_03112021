import database from './database.js';

const isFilteringDatabase = (database) => {
  let newDatabase = [];

  for (const recipe of database) {
    let element = {};

    element.id = recipe.id;
    element.name = recipe.name.removeDiacritics();
    element.description = recipe.description.removeDiacritics();
    element.appareil = recipe.appliance.removeDiacritics();
    element.time = recipe.time;
    element.ustensils = [];
    element.ingredientsForUi = [];
    element.ingredients = [];

    for (const ustensil of recipe.ustensils) {
      element.ustensils.push(ustensil.removeDiacritics());
    }

    for (const ingredient of recipe.ingredients) {
      let completIngredient = ingredient.ingredient + ' ' + (ingredient.quantity ? ': ' + ingredient.quantity : '') + ' ' + (ingredient.unit ? ingredient.unit : '');
      element.ingredientsForUi.push(completIngredient.removeDiacritics());
    }

    recipe.ingredients.forEach(elm => {
      element.ingredients.push(elm.ingredient);
    });

    newDatabase.push(element);
  }

  return newDatabase;
}

//  - - - - - - - - - - - - - - - - - - - - -
// Remove Diacritics
String.prototype.removeDiacritics = function () {
  return this.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

//  - - - - - - - - - - - - - - - - - - - - -
let filteredDatabase = isFilteringDatabase(database);
export default filteredDatabase;