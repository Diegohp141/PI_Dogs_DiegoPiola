const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  res.send("hola desde /apiroute");
});

module.exports = router;
