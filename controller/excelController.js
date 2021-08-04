const fs = require("fs");
const catchAsync = require(`${__dirname}/../catchAsync`);
const Excel = require(`${__dirname}/../models/excelModel`);

exports.uploadInbound = catchAsync(async (req, res, next) => {
  const excelInbound = JSON.parse(
    fs.readFileSync(`${__dirname}/../output.json`, "utf-8")
  );
  await Excel.create(excelInbound["CUS INBOUND RAW DATA"]);
  console.log("DATA SUCCESSFULLY LOADED!!");
  res.status(200).json({
    status: "Success",
    message: "DATA UPLOADED SUCCESSFULLY",
  });
  next();
});

exports.uploadOutbound = catchAsync(async (req, res, next) => {
  const excelOutbound = JSON.parse(
    fs.readFileSync(`${__dirname}/../output.json`, "utf-8")
  );
  await Excel.create(excelOutbound["CUS OUTBOUND RAW DATA"]);
  console.log("DATA SUCCESSFULLY LOADED!!");
  res.status(200).json({
    status: "Success",
    message: "DATA UPLOADED SUCCESSFULLY",
  });
  next();
});
