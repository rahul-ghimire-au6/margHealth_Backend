const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema(
  {
    c_name: { type: String, require: true, trim: true },
    c_batch_no: { type: String, require: true, trim: true },
    d_expiry_date: { type: Number, require: true, trim: true },
    n_balance_qty: { type: Number, require: true, trim: true },
    c_packaging: { type: String, require: true, trim: true },
    c_unique_code: { type: String, require: true, trim: true },
    c_schemes: { type: String, trim: true },
    n_mrp: { type: Number, require: true, trim: true },
    c_manufacturer: { type: String, require: true, trim: true },
    hsn_code: { type: Number, require: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("medicineData", medicineSchema);
