import database from './database.js';

const isFilteringDatabase = (database) => {
  let newDatabase = [];

  database.forEach(recette => {
    let element = {};

    element.id = recette.id;
    element.name = recette.name.removeDiacritics();
    element.description = recette.description.removeDiacritics();
    element.appareil = recette.appliance.removeDiacritics();
    element.time = recette.time;
    element.ingredients = [];
    element.ustensils = [];

    for (const ingredient of recette.ingredients) {
      let completIngredient = ingredient.ingredient + ' ' + (ingredient.quantity ? ': ' + ingredient.quantity : '') + ' ' + (ingredient.unit ? ingredient.unit : '');
      element.ingredients.push(completIngredient.removeDiacritics());
    }

    recette.ustensils.forEach(ustensil => {
      element.ustensils.push(ustensil.removeDiacritics());
    });

    newDatabase.push(element);
  });

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