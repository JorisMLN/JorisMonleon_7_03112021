import database from './database.js';

const filtered = (database) => {
  let arrayData = [];
  database.forEach(recette => {
    let payloadObjet = {};
    payloadObjet.name = recette.name;
    payloadObjet.id = recette.id;
    arrayData.push(payloadObjet);

  });
  return arrayData;
}
let filterDatabase = filtered(database);

export default filterDatabase;