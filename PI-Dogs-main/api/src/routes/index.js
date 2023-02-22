const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const dbDogs = require("./dbDogs.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dbDogs", dbDogs);

router.get("/", async (req, res) => {
  res.send("hola desde el /");
});

module.exports = router;
