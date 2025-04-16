import mongoose from "mongoose";
import { ProductModel } from "../models/ProductModel.js";
import {
  BrandListService,
  CategoryListService,
  CreateReviewService,
  DetailsService,
  ListByBrandService,
  ListByCategoryService,
  ListByKeywordService,
  ListByRemarkService,
  ListBySimilerService,
  ReviewListService,
  SliderListService,
} from "../services/ProductServices.js";

export const ProductBrandList = async (req, res) => {
  const result = await BrandListService(req);
  return res.status(200).json(result);
};
export const ProductCategoryList = async (req, res) => {
  const result = await CategoryListService(req);
  return res.status(200).json(result);
};
export const ProductSliderList = async (req, res) => {
  const result = await SliderListService(req);
  return res.status(200).json(result);
};

export const ProductListByBrand = async (req, res) => {
  const result = await ListByBrandService(req);
  return res.status(200).json(result);
};

export const ProductListByCategory = async (req, res) => {
  const result = await ListByCategoryService(req);
  return res.status(200).json(result);
};
export const ProductListByRemark = async (req, res) => {
  const result = await ListByRemarkService(req);
  return res.status(200).json(result);
};

export const ProductListBySimiler = async (req, res) => {
  const result = await ListBySimilerService(req);
  return res.status(200).json(result);
};
export const ProductDetails = async (req, res) => {
  const result = await DetailsService(req);
  return res.status(200).json(result);
};
export const ProductReviewList = async (req, res) => {
  const result = await ReviewListService(req);
  return res.status(200).json(result);
};
export const ProductListByKeyword = async (req, res) => {
  const result = await ListByKeywordService(req);
  return res.status(200).json(result);
};


export const CreateReview = async (req, res) => {
  const result = await CreateReviewService(req);
  return res.status(200).json(result);
}

