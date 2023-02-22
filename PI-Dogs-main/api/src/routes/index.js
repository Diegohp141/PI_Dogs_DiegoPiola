const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const dbDogs = require("./dbDogs.js");
const apiRoutes = require("./apiDogs.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dbDogs", dbDogs);
router.use("/apiRoute", apiRoutes);

router.get("/", async (req, res) => {
  res.send("hola desde el /");
});

module.exports = router;
