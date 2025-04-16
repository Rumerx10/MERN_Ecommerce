import {
  CreateInvoiceService,
  InvoiceListService,
  InvoiceProductListService,
  PaymentCancelService,
  PaymentFailService,
  PaymentIPNService,
  PaymentSuccessService,
} from "../services/InvoiceServices.js";

export const CreateInvoice = async (req, res) => {
  const result = await CreateInvoiceService(req);
  res.status(200).json(result);
};

export const PaymentFail = async () => {
  const result = await PaymentFailService(req);
  res.status(200).json(result);
};

export const PaymentCancel = async () => {
  const result = await PaymentCancelService(req);
  res.status(200).json(result);
};

export const PaymentIPN = async () => {
  const result = await PaymentIPNService(req);
  res.status(200).json(result);
};

export const PaymentSuccess = async () => {
  const result = await PaymentSuccessService(req);
  res.status(200).json(result);
};

export const InvoiceList = async () => {
  const result = await InvoiceListService(req);
  res.status(200).json(result);
};
export const InvoiceProductList = async () => {
  const result = await InvoiceProductListService(req);
  res.status(200).json(result);
};
