const express = require("express");
const multerController = require(`${__dirname}/controller/multerController`);
const authController = require(`${__dirname}/controller/authController`);
const excelController = require(`${__dirname}/controller/excelController`);
const googleDriveController = require(`${__dirname}/controller/googleDriveController`);
const fileConverter = require(`${__dirname}/fileconverter`);

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post(
  "/addfile",
  authController.protect,
  multerController.uploadData,
  multerController.resUpdate,
  fileConverter.jsonConverter
);

router.post(
  "/addToDB/inbound",
  authController.protect,
  excelController.uploadInbound
);
router.post(
  "/addToDB/outbound",
  authController.protect,
  excelController.uploadOutbound
);

router.post(
  "/addToDrive",
  authController.protect,
  googleDriveController.uploadFileToDrive
);

module.exports = router;
