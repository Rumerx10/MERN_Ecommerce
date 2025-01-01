import express from "express";

import {
  ProductBrandList,
  ProductCategoryList,
  ProductDetails,
  ProductListByBrand,
  ProductListByCategory,
  ProductListByKeyword,
  ProductListByRemark,
  ProductListBySimilar,
  ProductReviewList,
  ProductSliderList,
} from "../controllers/ProductController.js";
import { UserOTP } from "../controllers/UserController.js";

const router = express.Router();

// product
router.get("/ProductBrandList", ProductBrandList);
router.get("/ProductCategoryList", ProductCategoryList);
router.get("/ProductSliderList", ProductSliderList);

router.get("/ProductListByBrand/:brandID", ProductListByBrand);
router.get("/ProductListByCategory/:categoryID", ProductListByCategory);
router.get("/ProductListByRemark/:remark", ProductListByRemark);

router.get("/ProductDetails/:productID", ProductDetails);
router.get("/ProductListBySimilar/:categoryName", ProductListBySimilar);

router.get("/ProductListByKeyword/:keyword", ProductListByKeyword);
router.get("/ProductReviewList/:productID", ProductReviewList);

// user
router.get("/UserOTP/:email", UserOTP);

export default router;
