import fs from "fs";
import { catchAsync } from "./../catchAsync.js";
import { Excel } from "./../models/excelModel.js";

const uploadInbound = catchAsync(async (req, res, next) => {
  const excelInbound = JSON.parse(fs.readFileSync("./output.json", "utf-8"));
  await Excel.create(excelInbound["CUS INBOUND RAW DATA"]);
  console.log("DATA SUCCESSFULLY LOADED!!");
  res.status(200).json({
    status: "Success",
    message: "DATA UPLOADED SUCCESSFULLY",
  });
  next();
});

const uploadOutbound = catchAsync(async (req, res, next) => {
  const excelOutbound = JSON.parse(fs.readFileSync("./output.json", "utf-8"));
  await Excel.create(excelOutbound["CUS OUTBOUND RAW DATA"]);
  console.log("DATA SUCCESSFULLY LOADED!!");
  res.status(200).json({
    status: "Success",
    message: "DATA UPLOADED SUCCESSFULLY",
  });
  next();
});

export { uploadInbound, uploadOutbound };
