import mongoose from "mongoose";

const excelSchema = new mongoose.Schema({}, { strict: false });
const Excel = mongoose.model("Excel", excelSchema);

export { Excel };
