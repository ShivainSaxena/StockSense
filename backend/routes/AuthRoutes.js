const express = require("express");
const router = express.Router();
const { signUpUser, loginUser } = require("../controllers/AuthController");

// Sign-up route to register users
router.post("/sign-up", signUpUser);

// Log in route for returning users
router.post("/login", loginUser);

module.exports = router;
