import { Router } from "express";
import { checkToken } from "../middlewares/authMiddleware.js";
import {
  addProductController,
  getProductByIdController,
  deleteProductByIdController,
  updateProductByIdController,
  getAllUsersController,
  getInventoryController,
  getAllOrdersController,
} from "../controllers/adminControllers.js";

const router = Router();
//Add Product || POST
router.post("/add-product", checkToken, addProductController);
//GET SINGLE PRODUCT INFO
router.post("/getProductById", checkToken, getProductByIdController);
//Delete in cart || POST
router.post("/delete-productById", checkToken, deleteProductByIdController);
//Update Product
router.put("/update-productById", checkToken, updateProductByIdController);

//get all users
router.get("/getAllUsers", checkToken, getAllUsersController);
//get all users
router.get("/getInventory", checkToken, getInventoryController);
// get all paid orders
router.get("/getAllOrders", checkToken, getAllOrdersController);
export default router;
