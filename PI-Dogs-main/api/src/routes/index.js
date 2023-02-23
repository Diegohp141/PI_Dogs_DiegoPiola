const { Router } = require("express");
const { Dog, Temperament } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const dbDogs = require("./dbDogs.js");
const tempsD = require("./tempsdogs.js");
const { allDogs } = require("../controllers/controllers.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dbDogs", dbDogs);
router.use("/tempsD", tempsD);

router.get("/", async (req, res) => {
  try {
    const info = await allDogs(Dog);
    res.send(info);
  } catch (error) {
    res.send(error.toString());
  }
});

router.get("/search/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const info = await allDogs(Dog);
    const response = info.find((elem) => (Number(id) ? elem.id === Number(id) : elem.id === id));
    res.send(response);
  } catch (error) {
    res.send(error.toString());
  }
});

module.exports = router;
