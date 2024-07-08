const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  // verify atuhentication from authroization header
  const { authorization } = req.headers;
  // Check if we recieved a token
  if (!authorization) {
    res
      .status(401)
      .json({ error: "Authorization token is required for this resource" });
  }
  // Grab the token
  const token = authorization.split(" ")[1];
  try {
    // Try to verify the token
    const { email } = jwt.verify(token, process.env.TOKEN_SECRET);
    // If success attach to username property on request obj
    req.email = email;
    next();
  } catch (error) {
    // Otherwise send back error
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
