import mongoose from "mongoose";
import { ProductModel } from "../models/ProductModel.js";
import { BrandModel } from "./../models/BrandModel.js";
import { CategoryModel } from "./../models/CategoryModel.js";
import { ProductSliderModel } from "../models/ProductSliderModel.js";
import { ProductDetailModel } from "./../models/ProductDetailModel.js";
import { ReviewModel } from "./../models/ReviewModel.js";

const ObjectId = mongoose.Types.ObjectId;

export const BrandListService = async () => {
  try {
    const data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed to fetch data", error: error.message };
  }
};
export const CategoryListService = async () => {
  try {
    const data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed to fetch data", error: error.message };
  }
};
export const SliderListService = async () => {
  try {
    const data = await ProductSliderModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed to fetch data", error: error.message };
  }
};

export const ListByBrandService = async (req) => {
  try {
    let brandID = new ObjectId(req.params.brandID);
    console.log("Brand ID ------------>>>", brandID);
    let MatchStage = { $match: { brandID: brandID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    console.log(data);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed to fetch data", error: error.message };
  }
};

export const ListByCategoryService = async (req) => {
  try {
    const categoryID = new ObjectId(req.params.categoryID);
    // console.log("Category ID ------------>>>", categoryID);
    let MatchStage = { $match: { categoryID: categoryID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed to fetch data", error: error.message };
  }
};

export const ListByRemarkService = async (req) => {
  try {
    const remark = req.params.remark;
    console.log("Remark ------------>>>", remark);
    let MatchStage = { $match: { remark: remark } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed to fetch data", error: error.message };
  }
};

export const ListBySimilerService = async (req) => {
  try {
    const categoryID = new ObjectId(req.params.categoryID);
    let MatchStage = { $match: { categoryID: categoryID } };
    let limitStage = { $limit: 20 };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      limitStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed to fetch data", error: error.message };
  }
};

export const DetailsService = async (req) => {
  try {
    let productID = new ObjectId(req.params.productID);
    let MatchStage = { $match: { _id: productID } };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinWithProductDetailStage = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let UnwindProductDetailStage = { $unwind: "$details" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      JoinWithProductDetailStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      UnwindProductDetailStage,
      ProjectionStage,
    ]);
    console.log(data);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed to fetch data", error: error.message };
  }
};

export const ReviewListService = async (req) => {
  try {
    let productID = new ObjectId(req.params.productID);
    let MatchStage = { $match: { productID: productID } };
    let JoinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };
    let ProjectionStage = {
      $project: { des: 1, rating: 1, createdAt: 1, "profile.cus_name": 1 },
    };
    let UnwindProfileStage = { $unwind: "$profile" };
    const data = await ReviewModel.aggregate([
      MatchStage,
      JoinWithProfileStage,
      UnwindProfileStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed to fetch data", error: error.message };
  }
};

export const ListByKeywordService = async (req) => {
  try {
    let SearchRegex = { $regex: req.params.keyword, $options: "i" };
    let SearchParams = [{ title: SearchRegex }, { shortDes: SearchRegex }];
    let SearchQuery = { $or: SearchParams };

    let MatchStage = { $match: SearchQuery };
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        brandID: 0,
        categoryID: 0,
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    console.log(data);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed to fetch data", error: error.message };
  }
};


export const CreateReviewService = async (req) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.user.userID);
    let reqBody = req.body;    
    await ReviewModel.create({
      userID: userID,
      productID: new mongoose.Types.ObjectId(reqBody.productID),
      desc: reqBody.desc,
      rating: reqBody.desc,
    })

  } catch (error) {
    return { status: "fail", error: error.message };    
  }
}