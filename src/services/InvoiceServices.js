import mongoose from "mongoose";
import { CartModel } from "../models/CartModel.js";
import { ProfileModel } from "../models/ProfileModel.js";
import { InvoiceModel } from "./../models/InvoiceModel.js";
import { InvoiceProductModel } from "./../models/InvoiceProductModel.js";
import { PaymentSettingsModel } from "./../models/PaymentSettingModel.js";

export const CreateInvoiceService = async (req) => {
  try {
    let userID = req.user.userID;
    const cus_email = req.user.email;

    // Calculate total Payable and Vat
    let MatchStage = { $match: { userID: userID } };
    let ConvertToProductObjectID = {
      $addFields: {
        productID: {
          $toObjectId: "$productID",
        },
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
    const CartProducts = await CartModel.aggregate([
      MatchStage,
      ConvertToProductObjectID,
      JoinWithProductStage,
      UnwindProductStage,
    ]);

    // console.log("Cart Products----------->>>",CartProducts);
    let totalAmount = 0;
    CartProducts.forEach((element) => {
      let price;
      if (element.product.discount) {
        price =
          parseFloat(element.product.discountPrice) * parseInt(element.qty);
      } else {
        price = parseFloat(element.product.price) * parseInt(element.qty);
      }
      totalAmount += price;
    });
    const vat = (totalAmount * 5) / 100;
    const totalPayable = totalAmount + vat;

    // Setp 2: Prepare Customer Details & Shipping Details
    let Profile = await ProfileModel.aggregate([
      { $match: { userID: new mongoose.Types.ObjectId(userID) } },
    ]);

    let cus_details = `Name: ${Profile[0].cus_name}, Email: ${cus_email}, Phone: ${Profile[0].cus_phone}, Country: ${Profile[0].cus_country}, City: ${Profile[0].cus_city}, Post Code: ${Profile[0].cus_postcode}`;
    let ship_details = `Shipping City: ${Profile[0].shipping_city}, Shipping Phone: ${Profile[0].ship_phone}, Country: ${Profile[0].ship_country}, Post Code: ${Profile[0].ship_postcode}`;

    // Step 3: Transaction & Other's ID

    const tran_id = Math.floor(10000000 + Math.random() * 90000000);
    let validation_id = 0;
    let delivery_status = "Pending";
    let payment_status = "Pending";

    let createInvoice = await InvoiceModel.create({
      userID: new mongoose.Types.ObjectId(userID),
      payable: totalPayable,
      cus_details: cus_details,
      ship_details: ship_details,
      tran_id: tran_id,
      val_id: validation_id,
      delivery_status: delivery_status,
      payment_status: payment_status,
      total: totalAmount,
      vat: vat,
    });

    // Step 5: Create Invoice Product
    let invoiceID = createInvoice._id;
    CartProducts.forEach(async (element) => {
      await InvoiceProductModel.create({
        userID: new mongoose.Types.ObjectId(userID),
        productID: new mongoose.Types.ObjectId(element.productID),
        invoiceID: new mongoose.Types.ObjectId(invoiceID),
        qty: element.qty,
        price: element.discount
          ? element.product.discountPrice
          : element.product.price,
        color: element.product.color,
        size: element.product.size,
      });
    });

    // Setp 6: Remove Cart List
    await CartModel.deleteMany({ userID: userID });

    // Step 7: SSL Commerze Settings
    let PaymentSettings = await PaymentSettingsModel.find();
    const formData = new FormData();
    formData.append("store_id", PaymentSettings[0].store_id);
    formData.append("store_passwd", PaymentSettings[0].store_passwd);
    formData.append("total_amount", totalPayable);
    formData.append("currency", PaymentSettings[0].currency);
    formData.append("tran_id", tran_id);
    formData.append(
      "success_url",
      `${PaymentSettings[0].success_url}/${tran_id}`
    );
    formData.append("fail_url", `${PaymentSettings[0].fail_url}/${tran_id}`);
    formData.append(
      "cancel_url",
      `${PaymentSettings[0].cancel_url}/${tran_id}`
    );
    formData.append("ipn_url", `${PaymentSettings[0].ipn_url}/${tran_id}`);

    formData.append("cus_name", Profile[0].cus_name);
    formData.append("cus_email", cus_email);
    formData.append("cus_add1", Profile[0].cus_add);
    formData.append("cus_add2", Profile[0].cus_add);
    formData.append("cus_city", Profile[0].cus_city);
    formData.append("cus_state", Profile[0].cus_state);
    formData.append("cus_postcode", Profile[0].cus_postcode);
    formData.append("cus_country", Profile[0].cus_country);
    formData.append("cus_phone", Profile[0].cus_phone);
    formData.append("cus_fax", Profile[0].cus_phone);

    formData.append("shipping_method", "YES");
    formData.append("ship_name", Profile[0].ship_name);
    formData.append("ship_add1", Profile[0].ship_add);
    formData.append("ship_add2", Profile[0].ship_add);
    formData.append("ship_city", Profile[0].shipping_city);
    formData.append("ship_state", Profile[0].ship_state);
    formData.append("ship_country", Profile[0].ship_country);
    formData.append("ship_postcode", Profile[0].ship_postcode);
    formData.append("ship_phone", Profile[0].ship_phone);

    formData.append("product_name", "According to Invoice");
    formData.append("product_category", "According to Invoice");
    formData.append("product_profile", "According to Invoice");
    formData.append("product_amount", "According to Invoice");

    let SSLRes = await axios.post(PaymentSettings[0].init_url, formData);

    return { status: "success", data: SSLRes.data };
  } catch (error) {
    return { satus: "fail", message: "Something went wrong!" };
  }
};

export const PaymentSuccessService = async (req) => {
  try {
    const trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "Paid" }
    );
    return { status: "success" };
  } catch (error) {
    return { satus: "fail", message: "Something went wrong!" };
  }
};

export const PaymentFailService = async (req) => {
  try {
    const trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "fail" }
    );
    return { status: "fail" };
  } catch (error) {
    return { satus: "fail", message: "Something went wrong!" };
  }
};

export const PaymentCancelService = async (req) => {
  try {
    const trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "Cancel" }
    );
    return { status: "cancel" };
  } catch (error) {
    return { satus: "fail", message: "Something went wrong!" };
  }
};

export const PaymentIPNService = async (req) => {
  try {
    let trxID = req.params.trxID;
    let status = req.body.status;
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: status }
    );
    return { status: "success" };
  } catch (error) {
    return { satus: "fail", message: "Something went wrong!" };
  }
};

export const InvoiceListService = async (req) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.user.userID);
    const invoice = await InvoiceModel.find({ userID: userID }).sort({
      createdAt: -1,
    });
    return { status: "success", data: invoice };
  } catch (error) {
    return { satus: "fail", message: "Something went wrong!" };
  }
};

export const InvoiceProductListService = async (req) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.user.userID);
    const invoiceID = new mongoose.Types.ObjectId(req.params.invoiceID);
    const data = await InvoiceProductModel.aggregate([
      { $match: { userID: userID, invoiceID: invoiceID } },
      {
        $lookup: {
          from: "products",
          localField: "productID",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { satus: "fail", message: "Something went wrong!" };
  }
};
