import { Router } from "express";
import {
  loginController,
  registerController,
  authController,
  getAllProductsController,
  getProductByIdController,
  addProductByIdController,
  getOrdersCountByIdController,
  getAllordersByIdController,
  getOrdersByIdController,
  changeStatusController,
} from "../controllers/userControllers.js";
import { checkToken } from "../middlewares/authMiddleware.js";

//router object
const router = Router();

//Routes
//LOGIN ||POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", checkToken, authController);

//GET ALL PRODUCT
router.get("/getAllProducts", checkToken, getAllProductsController);
router.get("/getAllHome", getAllProductsController);
//count rows of orders
router.post("/getOrdersCountById", checkToken, getOrdersCountByIdController);
//GET SINGLE PRODUCT INFO
router.post("/getProductById", checkToken, getProductByIdController);
//Add Product in cart || POST
router.post("/add-productById", checkToken, addProductByIdController);
//get all orders paid
router.post("/getAllOrdersById", checkToken, getAllordersByIdController);
//get cart
router.post("/getOrdersById", checkToken, getOrdersByIdController);
//change orders status
router.put("/changeAccountStatus", checkToken, changeStatusController);

export default router;
