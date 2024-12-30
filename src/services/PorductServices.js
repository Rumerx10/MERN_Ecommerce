import BrandModel from "../models/BrandModel.js";
import CategoryModel from "../models/CategoryModel.js";
import SliderModel from "../models/ProductSliderModel.js";
import ProductModel from "../models/ProductModel.js";
import ProductDetailModel from "../models/ProductDetailModel.js";
import ProductReviewModel from "../models/ProductReviewModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const BrandListService = async () => {
  try {
    let data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
export const CategoryListService = async () => {
  try {
    let data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
export const SliderListService = async () => {
  try {
    let data = await SliderModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

export const ListByBrandService = async (req) => {
  try {
    let brandID = new ObjectId(req.params.brandID);

    let matchStage = { $match: { brandID: brandID } };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
export const ListByCategoryService = async (req) => {
  try {
    let categoryID = new ObjectId(req.params.categoryID);
    let matchStage = { $match: { categoryID: categoryID } };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
export const ListBySimilarService = async () => {};
export const ListByKeywordService = async () => {};
export const ListByRemarkService = async () => {};
export const DetailsService = async () => {};
export const ReviewListService = async () => {};
