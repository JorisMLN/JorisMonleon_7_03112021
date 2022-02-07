import database from './database.js';

const filtered = (database) => {
  let newDatabase = [];

  for (const recipe of database) {
    let element = {};

    element.id = recipe.id;
    element.name = recipe.name.removeDiacritics();
    element.description = recipe.description.removeDiacritics();
    element.appareil = recipe.appliance.removeDiacritics();
    element.ustensils = [];
    element.ingredients = [];

    for (const ustensil of recipe.ustensils) {
      element.ustensils.push(ustensil.removeDiacritics());
    }

    for (const ingredient of recipe.ingredients) {
      element.ingredients.push(ingredient.ingredient.removeDiacritics());
    }

    newDatabase.push(element);
  }

  console.log(newDatabase);
  return newDatabase;
}

//  - - - - - - - - - - - - - - - - - - - - -
// Remove Diacritics

String.prototype.removeDiacritics = function () {
  return this.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

//  - - - - - - - - - - - - - - - - - - - - -

let filterDatabase = filtered(database);

export default filterDatabase;