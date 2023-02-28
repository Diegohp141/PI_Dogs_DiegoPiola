const { Router } = require("express");
const { getDogsDb } = require("../controllers/controllers.js");
const router = Router();
const { Dog, Temperament } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    const data = await getDogsDb();
    res.send(data);
  } catch (error) {
    res.send(`Ocurrio un error no se pudo acceder a la información`);
  }
});

router.post("/CreateDog", async (req, res) => {
  const { name, height, weight, life_span, img, temperament } = req.body;
  if (!name || !height || !weight) {
    return res.status(404).send("required values");
  }
  try {
    const dog = await Dog.create({ name, height, weight, life_span, img });
    let dogTemperament = await Temperament.findAll({
      where: { name: temperament },
    });
    dog.addTemperament(dogTemperament);
    res.status(201).send("Dog sucsesfully created");
  } catch (error) {
    res.status(404).send(error.toString());
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doggie = await Dog.findByPk(id);
    await Dog.destroy({
      where: { id },
    });
    res.send(`${doggie.name} fue eliminado exitosamente`);
  } catch (error) {
    res.send(error.toString());
  }
});

module.exports = router;
