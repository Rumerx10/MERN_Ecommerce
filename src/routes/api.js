import express from "express";
import { AuthVerification } from "../middlewares/AuthVerification.js";
import {
  CreateReview,
  ProductBrandList,
  ProductCategoryList,
  ProductDetails,
  ProductListByBrand,
  ProductListByCategory,
  ProductListByKeyword,
  ProductListByRemark,
  ProductListBySimiler,
  ProductReviewList,
  ProductSliderList,
} from "../controllers/ProductController.js";
import {
  CreateProfile,
  ReadProfile,
  UpdateProfile,
  UserLogin,
  UserLogout,
  VerifyLogin,
} from "../controllers/UserController.js";
import {
  RemoveWishList,
  SaveWishList,
  WishList,
} from "../controllers/WishListController.js";
import {
  CartList,
  CreateCartList,
  RemoveCartList,
  UpdateCartList,
} from "../controllers/CartListController.js";
import {
  CreateInvoice,
  InvoiceList,
  InvoiceProductList,
  PaymentCancel,
  PaymentFail,
  PaymentIPN,
  PaymentSuccess,
} from "../controllers/InvoiceController.js";
import { FeaturesList } from "../controllers/FeaturesController.js";
const router = express.Router();

// Product
router.get("/ProductBrandList", ProductBrandList);
router.get("/ProductCategoryList", ProductCategoryList);
router.get("/ProductSliderList", ProductSliderList);
router.get("/ProductListByBrand/:brandID", ProductListByBrand);
router.get("/ProductListByCategory/:categoryID", ProductListByCategory);
router.get("/ProductListByRemark/:remark", ProductListByRemark);
router.get("/ProductListBySimilar/:categoryID", ProductListBySimiler);
router.get("/ProductDetails/:productID", ProductDetails);
router.get("/ProductReviewList/:productID", ProductReviewList);
router.get("/ProductListByKeyword/:keyword", ProductListByKeyword);
router.post("/CreateReview", AuthVerification, CreateReview);
router.get("/ProductReviewList/:productID", AuthVerification, ProductReviewList)

// User
router.get("/UserLogin", UserLogin);
router.get("/VerifyLogin", VerifyLogin);
router.get("/UserLogout", AuthVerification, UserLogout);
router.post("/CreateProfile", AuthVerification, CreateProfile);
router.post("/UpdateProfile", AuthVerification, UpdateProfile);
router.get("/ReadProfile", AuthVerification, ReadProfile);

// Wish List
router.get("/WishList", AuthVerification, WishList);
router.post("/SaveWishList", AuthVerification, SaveWishList);
router.delete("/RemoveWishList", AuthVerification, RemoveWishList);

// Cart List
router.get("/CartList", AuthVerification, CartList);
router.put("/UpdateCartList/:cartID", AuthVerification, UpdateCartList);
router.post("/CreateCartList", AuthVerification, CreateCartList);
router.delete("/RemoveCartList", AuthVerification, RemoveCartList);

// Invoice & Payment
router.get("/CreateInvoice", AuthVerification, CreateInvoice);
router.get("/InvoiceList", AuthVerification, InvoiceList);
router.get("/InvoiceProductList", AuthVerification, InvoiceProductList);
router.get("/PaymentSuccess/:trxID", AuthVerification, PaymentSuccess);
router.get("/PaymentCancel/:trxID", AuthVerification, PaymentCancel);
router.get("/PaymentFail/:trxID", AuthVerification, PaymentFail);
router.get("/PaymentIPN/:trxID", AuthVerification, PaymentIPN);

// Features List
router.get("/FeaturesList", FeaturesList);

export default router;
