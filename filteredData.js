import database from './database.js';

const filtered = (database) => {
  let arrayData = [];

  database.forEach(recette => {
    let payloadObjet = {};
    payloadObjet.name = recette.name.removeDiacritics();
    payloadObjet.description = recette.description.removeDiacritics();
    payloadObjet.id = recette.id;
    arrayData.push(payloadObjet);
  });
  console.log(arrayData);

  return arrayData;
}

//  - - - - - - - - - - - - - - - - - - - - -
// Remove Diacritics

String.prototype.removeDiacritics = function () {
  return this.toLocaleLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

//  - - - - - - - - - - - - - - - - - - - - -

let filterDatabase = filtered(database);

export default filterDatabase;