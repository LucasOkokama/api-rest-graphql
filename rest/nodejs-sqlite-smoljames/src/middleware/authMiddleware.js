import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  let token = authHeader.split(" ");
  console.log(token);

  if (token[0] === "Bearer" && token.length === 2) {
    token = token[1];
  } else {
    token = token[0];
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userID = decoded.id;
    next();
  });
};

export default authMiddleware;
