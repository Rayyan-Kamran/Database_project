const express = require("express");
const { registerVoter, loginVoter } = require("../controllers/authcontrol");
const router = express.Router();
router.post("/register", registerVoter);
router.post("/login", loginVoter);

module.exports = router;
