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

const router = express.Router();

// product
router.get("/ProductBrandList", ProductBrandList);
router.get("/ProductCategoryList", ProductCategoryList);
router.get("/ProductSliderList", ProductSliderList);
router.get("/ProductListByBrand/:brandID", ProductListByBrand);
router.get("/ProductListByCategory/:categoryID", ProductListByCategory);
router.get("/ProductListBySimilar/:keyowrd", ProductListBySimilar);
router.get("/ProductListByKeyword/:keyowrd", ProductListByKeyword);
router.get("/ProductListByRemark/:remark", ProductListByRemark);
router.get("/ProductDetails/:productID", ProductDetails);
router.get("/ProductReviewList/:productID", ProductReviewList);

export default router;
