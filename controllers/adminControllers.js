import {
  add,
  getProductsById,
  deleteProductsById,
  updateProductById,
  getUsers,
  getInventory,
  getAllOrders,
} from "../services/adminServices.js";
export const addProductController = async (req, res) => {
  const body = req.body;
  try {
    await add(body);
    res.status(200).json({
      success: true,
      message: "Product added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "DataBase connection error",
    });
  }
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
export const deleteProductByIdController = (req, res) => {
  const id = req.body.productId;
  deleteProductsById(id, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error While deleting",
      });
    }
    return res.status(200).json({
      success: true,
      data: results,
      message: "Product Deleted Successfully",
    });
  });
};
export const updateProductByIdController = (req, res) => {
  const details = req.body;
  const id = req.body.productId;
  //console.log(body);
  updateProductById(id, details, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error While updating",
      });
    }
    return res.status(200).json({
      success: true,
      data: results,
      message: "Product updated Successfully",
    });
  });
};
export const getAllUsersController = (req, res) => {
  getUsers((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error while fetching products",
      });
    }
    //console.log("BEFORE");
    // console.log(results);
    //  console.log("AFTER");
    return res.status(200).send({
      success: true,
      data: results,
    });
  });
};
export const getInventoryController = (req, res) => {
  getInventory((err, results) => {
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

export const getAllOrdersController = (req, res) => {
  getAllOrders((err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: "Error while fetching Orders",
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
