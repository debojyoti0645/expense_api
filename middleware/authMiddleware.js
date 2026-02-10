const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    // No token sent
    if (!header) {
      return res.status(401).json({ error: "Access denied. No token." });
    }

    // Format: Bearer TOKEN
    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
