import database from './database.js';

const filtered = (database) => {


  let newDatabase = [];
  const iteratorData = database.keys();

  for (const key of iteratorData) {
    let element = {};

    element.id = database[key].id;
    element.name = database[key].name.removeDiacritics();
    element.description = database[key].description.removeDiacritics();
    element.appareil = database[key].appliance.removeDiacritics();
    element.ustensils = [];
    element.ingredients = [];

    const iteratorUstensils = database[key].ustensils.keys();
    for (const keyUstensil of iteratorUstensils) {
      element.ustensils.push(database[key].ustensils[keyUstensil].removeDiacritics());
    }

    const iteratorIngredients = database[key].ingredients.keys();
    for (const keyIngredient of iteratorIngredients) {
      element.ingredients.push(database[key].ingredients[keyIngredient].ingredient.removeDiacritics());
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