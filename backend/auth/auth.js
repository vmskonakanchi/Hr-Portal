import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res
        .status(401)
        .send({ msg: "Access denied. Not authorized provided." });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res
        .status(401)
        .send({ msg: "Access denied. Not authorized provided." });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ error: "Invalid token." });
  }
};

export default auth;
