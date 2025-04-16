import { CartModel } from "../models/CartModel.js";

export const CartListService = async (req) => {
  try {
    const userID = req.user.userID;
    let MatchStage = { $match: { userID: userID } };
    let ConvertStringToObjectId = {
      $addFields: {
        productID: { $toObjectId: "$productID" },
      },
    };
    let JoinWithProductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let UnwindProductStage = { $unwind: "$product" };
    let JointWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage={
      $project: {
        userID:0,
        createdAt:0,
        updatedAt:0,
        'product._id': 0,
        'product.brandID': 0,
        'product.categoryID': 0,
        'brand._id': 0,
        'category._id': 0,
      },
    }

    let data = await CartModel.aggregate([
      MatchStage,
      ConvertStringToObjectId,
      JoinWithProductStage,
      UnwindProductStage,
      JointWithBrandStage,
      UnwindBrandStage,
      JoinWithCategoryStage,
      UnwindCategoryStage,
      ProjectionStage
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed to fetch data", error: error.message };
  }
};


export const CreateCartListService = async (req) => {
  try {
    const userID = req.user.userID;
    const reqBody = req.body;
    reqBody.userID = userID;

    const data = await CartModel.create(reqBody);
    return { status: "success", message: "added to cart successfull!" };
  } catch (error) {
    return { status: "fail", error: error.message };
  }
};

export const UpdateCartListService = async (req) => {
  try {
    const userID = req.user.userID;
    let cartID = req.params.cartID;
    let reqBody = req.body;
    await CartModel.updateOne({_id:cartID, userID:userID}, { $set: reqBody }, { upsert: true });
    return { status: "success", message: "cart list updated successfully." };
  } catch (error) {
    return { status: "failed to save data", error: error.message };
  }
};

export const RemoveCartListService = async(req)=>{
  try {
    const userID = req.user.userID;
    const reqBody = req.body;
    reqBody.userID = userID;
    const data  = await CartModel.findOneAndDelete(reqBody);
    return { status: "success", message: "removed from cart successfull!" };
  } catch (error) {
    return { status: "fail", error: error.message };
  }
}