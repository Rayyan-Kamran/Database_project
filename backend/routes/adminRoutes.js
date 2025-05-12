const express = require("express");
const { loginAdmin } = require("../controllers/admincontroller");
const router = express.Router();
router.post("/login", loginAdmin);
module.exports = router;
