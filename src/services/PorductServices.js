import BrandModel from "../models/BrandModel.js";
import CategoryModel from "../models/CategoryModel.js";
import SliderModel from "../models/ProductSliderModel.js";
import ProductModel from "../models/ProductModel.js";
import ProductDetailModel from "../models/ProductDetailModel.js";
import ReviewModel from "../models/ProductReviewModel.js";
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
    const categoryID = new ObjectId(req.params.categoryID);

    let matchStage = { $match: { categoryID: categoryID } };
    let BrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let categoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };

    let projectStage = {
      $project: {
        categoryID: 0,
        brandID: 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await ProductModel.aggregate([
      matchStage,
      BrandStage,
      categoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
export const ListByRemarkService = async (req) => {
  try {
    let matchStage = { $match: { remark: req.params.remark } };
    let BrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let categoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };

    let projectStage = {
      $project: {
        categoryID: 0,
        brandID: 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await ProductModel.aggregate([
      matchStage,
      BrandStage,
      categoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
export const ListBySimilarService = async (req) => {
  try {
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
    let projection = {
      $project: {
        categoryID: 0,
        brnadID: 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };
    let matchStage = {
      $match: {
        "category.categoryName": req.params.categoryName.toLowerCase(),
      },
    };

    let limitStage = { $limit: 15 };

    const data = await ProductModel.aggregate([
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projection,
      matchStage,
      limitStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

export const DetailsService = async (req) => {
  try {
    let productID = new ObjectId(req.params.productID);

    let matchStage = { $match: { _id: productID } };
    let joinWithDetailStage = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };
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
    let unwindDetailStage = { $unwind: "$details" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
        "details._id": 0,
        "details.productID": 0,
      },
    };

    let data = await ProductModel.aggregate([
      matchStage,
      joinWithDetailStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      unwindDetailStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

export const ListByKeywordService = async (req) => {
  try {
    let searchKeyword = { $regex: req.params.keyword, $options: "i" };
    let serachFields = {
      $or: [{ title: searchKeyword }, { shortDes: searchKeyword }],
    };
    let matchStage = { $match: serachFields };

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

export const ReviewListService = async (req) => {
  try {
    let productID = new ObjectId(req.params.productID);
    let matchStage = { $match: { productID: productID } };

    let joinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "user",
      },
    };

    let unwindProfileStage = { $unwind: "$user" };

    let projection = {
      $project: {
        des: 1,
        rating: 1,
        "user.cus_name": 1,
      },
    };

    let data = await ReviewModel.aggregate([
      matchStage,
      joinWithProfileStage,
      unwindProfileStage,
      projection,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
