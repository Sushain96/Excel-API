const mongoose = require("mongoose");

const excelSchema = new mongoose.Schema({}, { strict: false });
const Excel = mongoose.model("Excel", excelSchema);

module.exports = Excel;
