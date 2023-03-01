const { Router } = require("express");
const router = Router();
const { Temperament } = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await Temperament.findAll();
    res.send(result);
  } catch (error) {}
});

module.exports = router;
