import { CartListService, CreateCartListService, RemoveCartListService, UpdateCartListService } from "../services/CartListServices.js"

export const CartList=async(req,res)=>{
  let result = await CartListService(req);
  res.status(200).json(result);
}

export const CreateCartList=async(req,res)=>{
  let result = await CreateCartListService(req);
  res.status(200).json(result);
}

export const UpdateCartList=async(req,res)=>{
  let result = await UpdateCartListService(req);
  res.status(200).json(result);
}
export const RemoveCartList=async(req,res)=>{
  let result = await RemoveCartListService(req);
  res.status(200).json(result);
}