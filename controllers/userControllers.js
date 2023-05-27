import pkg from "bcryptjs";
import pkg1 from "jsonwebtoken";
import {
  create,
  findUserById,
  getProductsById,
  getUserByEmail,
  getProducts,
  createOrder,
  getOrdersCountById,
  getOrdersById,
  changeStatus,
  getAllOrdersById,
} from "../services/userServices.js";
import { config } from "dotenv";
config();
const { genSaltSync, hashSync, compareSync } = pkg;
const { sign } = pkg1;
export const registerController = (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  //console.log(body);
  create(body, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "DataBase connection error",
      });
    }
    return res.status(200).json({
      success: true,
      data: results,
      message: "Register Successfully",
    });
  });
};
export const loginController = (req, res) => {
  const body = req.body;
  getUserByEmail(body.email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "DataBase connection error",
      });
    }
    if (!results) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const result = compareSync(body.password, results.pass);
    if (result) {
      results.pass = undefined;
      const jsontoken = sign({ id: results.userid }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      //console.log(results.userid);
      return res.status(200).json({
        success: true,
        message: "login successfull",
        token: jsontoken,
        user_id: results.userid,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  });
};
export const authController = (req, res) => {
  const id = req.body.userId;
  // console.log(req.params);
  //console.log(req.body);
  findUserById(id, (err, results) => {
    const data = { ...results, pass: undefined };
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "auth error",
        success: false,
        err,
      });
    }
    //console.log(results);

    if (!results) {
      return res.status(200).send({
        success: false,
        message: "Record not found",
      });
    }
    return res.json({
      success: true,
      data: data,
    });
  });
};
export const getAllProductsController = async (req, res) => {
  getProducts((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error while fetching products",
      });
    }
    return res.status(200).send({
      success: true,
      data: results,
    });
  });
};

export const getProductByIdController = (req, res) => {
  const id = req.body.productId;
  //console.log(req.body);
  getProductsById(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error while fetching single product",
      });
    }
    if (!results) {
      return res.json({
        success: false,
        message: "Record Not found",
      });
    }
    return res.status(200).send({
      success: true,
      data: results,
    });
  });
};
export const addProductByIdController = (req, res) => {
  const body = req.body;
  //console.log(body);
  createOrder(body, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error While Adding",
      });
    }
    return res.status(200).json({
      success: true,
      data: results,
      message: "Product Added To Cart Successfully",
    });
  });
};
export const getOrdersCountByIdController = (req, res) => {
  const id = req.body.userId;
  //console.log(body);
  getOrdersCountById(id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error while fetching single product",
      });
    }
    //console.log(result);
    return res.status(200).send({
      success: true,
      data: result,
    });
  });
};

export const getOrdersByIdController = (req, res) => {
  const id = req.body.userId;
  //console.log(id);
  getOrdersById(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error while fetching single product",
      });
    }
    //console.log(results);
    return res.status(200).send({
      success: true,
      data: results,
    });
  });
};
export const changeStatusController = async (req, res) => {
  const data = req.body;
  try {
    await changeStatus(data);
    res.status(200).json({
      success: true,
      message: "Product paid Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "DataBase connection error",
    });
  }
};
export const getAllordersByIdController = (req, res) => {
  const id = req.body.userId;
  // console.log(id);
  getAllOrdersById(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error while fetching ",
      });
    }
    //console.log("BEFORE");
    //console.log(results);
    //  console.log("AFTER");
    return res.status(200).send({
      success: true,
      data: results,
    });
  });
};
