require("dotenv").config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");

//Funcion para llenar los temperamentos el la DB || function to fill the database with the information of the temperaments coming from the api
const fillTemps = async (Temperament) => {
  let arrTemps = [];
  await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      data.map((elem) => {
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
    .then((res) => res);
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
const getDogsDb = async (Dog, Temperament) => {
  return await Dog.findAll({
    includes: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//funcion para concatenar la informacion del la api con la de la base de datos || function to concatenate the information from the api with that of the database

const allDogs = async (Dog, Temperament) => {
  const dogsApi = await getApiDogs();
  const dogsDb = await getDogsDb(Dog, Temperament);
  const totalDogs = dogsApi.concat(dogsDb);

  return totalDogs;
};

module.exports = {
  fillTemps,
  getApiDogs,
  getDogsDb,
  allDogs,
};
