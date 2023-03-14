const jwt = require("jsonwebtoken");

const adminCheck = (req, res, next) => {
  if (req.user.isAdmin === false) {
    return res.status(401).send("Must be an admin.");
  }
  next();
};

const verifyToken = (req, res, next) => {
  const authorizationField = req.headers["authorization"];

  if (!authorizationField) {
    return res.status(401).send("Unauthorized request");
  }
  // format: Bearer TOKEN
  // split intr un array dupa whitespace si ia a doua valoare adica actualul TOKEN de care avem nevoie
  const token = authorizationField.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, userINFO) => {
    if (error) {
      console.error(error);
      return res.status(401).json({ error: "Invalid token" });
    }
    // aici pur si simplu atribui obiectului "req" un field numit payload care are valoarea payload-ului
    // regasit in token-ul gasit in browser-ul userului
    req.user = userINFO;
    next();
  });
};

const accessToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

module.exports = {
  verifyToken,
  accessToken,
  adminCheck,
};
