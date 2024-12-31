import {
  BrandListService,
  CategoryListService,
  SliderListService,
  ListByCategoryService,
  ListByBrandService,
  ListByRemarkService,
  ListBySimilarService,
  ListByKeywordService,
  DetailsService,
  ReviewListService,
} from "../services/PorductServices.js";

export const ProductBrandList = async (req, res) => {
  let result = await BrandListService();
  console.log(result);
  return res.status(200).json(result);
};
export const ProductCategoryList = async (req, res) => {
  let result = await CategoryListService();
  return res.status(200).json(result);
};
export const ProductSliderList = async (req, res) => {
  let result = await SliderListService();
  return res.status(200).json(result);
};
export const ProductListByBrand = async (req, res) => {
  const result = await ListByBrandService(req);
  return res.status(200).json(result);
};
export const ProductListByCategory = async (req, res) => {
  const result = await ListByCategoryService(req);
  return res.status(200).json({ data: result });
};
export const ProductListByRemark = async (req, res) => {
  const result = await ListByRemarkService(req);
  return res.status(200).json({ data: result });
};
export const ProductListBySimilar = async (req, res) => {
  const result = await ListBySimilarService(req);
  return res.status(200).json(result);
};

export const ProductDetails = async (req, res) => {
  const result = await DetailsService(req);
  return res.status(200).json(result);
};

export const ProductListByKeyword = async (req, res) => {
  const result = await ListByKeywordService(req);
  return res.status(200).json(result);
};

export const ProductReviewList = async (req, res) => {
  const result = await ReviewListService(req);
  return res.status(200).json(result);
};
