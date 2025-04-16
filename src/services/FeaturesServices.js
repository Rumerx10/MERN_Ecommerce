import { FeatureModel } from "./../models/FeaturesModel.js";
export const FeaturesListService = async () => {
  try {
    let data = await FeatureModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};
