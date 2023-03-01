require("dotenv").config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");
//const axios = require("axios");
console.log("a");

//Funcion para llenar los temperamentos el la DB || function to fill the database with the information of the temperaments coming from the api
const fillTemps = async (Temperament) => {
  let arrTemps = [];
  let url = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((res) => {
      res.map((elem) => {
        if (elem.temperament === undefined) {
          //do nothing
        } else {
          arrTemps = [...arrTemps, ...elem.temperament.split(",")];
        }
      });
    });

  for (let i = 0; i < arrTemps.length; i++) {
    arrTemps[i] = arrTemps[i].trim();
  }
  arrTemps.sort();

  for (let i = 0; i < arrTemps.length; i++) {
    await Temperament.findOrCreate({
      where: { name: arrTemps[i] },
    });
  }
};

//funcion para traer los perros de la api || function to get the dogs from the api

const getApiDogs = async () => {
  const apiDogs = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => data);

  const dogsMap = await apiDogs.map((el) => {
    return {
      id: el.id,
      name: el.name,
      weight: el.weight.metric,
      height: el.height.metric,
      life_span: el.life_span,
      temperament: el.temperament,
      image: el.image.url,
    };
  });
  return dogsMap;
};

//funcion para traer la informacion del la base de datos || function to retrieve the information from the database
// const getDogsDb = async (Dog, Temperament) => {
//   return await Dog.findAll({
//     includes: {
//       model: Temperament,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });
// };

const getDogsDb = async () => {
  let dogdb = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dogdb.map((d) => ({
    id: d.id,
    name: d.name,
    height: d.height,
    weight: d.weight,
    life_span: d.life_span,
    img: d.img,
    temperament: d.temperaments.map((t) => t.name).join(", "),
    createdByDB: d.createdByDB,
  }));
};
//funcion para concatenar la informacion del la api con la de la base de datos || function to concatenate the information from the api with that of the database

const allDogs = async () => {
  const dogsApi = await getApiDogs();
  const dogsDb = await getDogsDb();
  const totalDogs = dogsApi.concat(dogsDb);

  return totalDogs;
};

module.exports = {
  fillTemps,
  getApiDogs,
  getDogsDb,
  allDogs,
};
