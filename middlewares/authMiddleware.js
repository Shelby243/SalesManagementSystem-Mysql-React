import pkg from "jsonwebtoken";
import { config } from "dotenv";
config();
const { verify } = pkg;

export const checkToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    // console.log(req.body);
    verify(token, process.env.SECRET_KEY, (err, decode) => {
      //console.log(decode);
      if (err) {
        return res.status(200).send({
          message: "Auth failed",
          success: false,
          err,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
/**
 * let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        res.json({
          success: false,
          message: "Invalid token",
        });
      } else {
        next();
      }
    });
  } else {
    res.json({
      success: false,
      message: "Access denied unauthorized user",
    });
  }
 */
