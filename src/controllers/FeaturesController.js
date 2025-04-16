import { FeaturesListService } from "../services/FeaturesServices.js";

export const FeaturesList = async (req, res) => {
  const result = await FeaturesListService();
  res.status(200).json(result);
};
