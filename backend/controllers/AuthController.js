const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a token with a payload containing the username
const createToken = (email) => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
};

const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  // Validation
  if (!email || !password) {
    return res.status(404).json({ error: "All fields must be filled" });
  }

  // Check if the email already exists
  const user = await db.collection("users").findOne({ email });
  if (user) {
    return res
      .status(404)
      .json({ error: `Account with the email: ${email} already exists` });
  }

  // Hash password and save to db
  bcrypt.hash(password, 10).then((hashpass) => {
    db.collection("users")
      .insertOne({ email: email, password: hashpass })
      .then(() => {
        const token = createToken(email);
        res.status(200).json({ email, token });
      });
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  // Validation
  if (!email || !password) {
    return res.status(404).json({ error: "All fields must be filled" });
  }

  // Check if user exists in db
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ error: "Account with that email does not exist" });
  }

  // Check if the passwords match using bcrypt
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(404).json({ error: "Password is incorrect" });
  }

  const token = createToken(email);
  res.status(200).json({ email, token });
};

module.exports = {
  signUpUser,
  loginUser,
};
