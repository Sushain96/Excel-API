import express from "express";
import { uploadData, resUpdate } from "./controller/multerController.js";
import { signup, login, protect } from "./controller/authController.js";
import { uploadInbound, uploadOutbound } from "./controller/excelController.js";
import { uploadFileToDrive } from "./controller/googleDriveController.js";
import { jsonConverter } from "./fileconverter.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/addfile", protect, uploadData, resUpdate, jsonConverter);

router.post("/addToDB/inbound", protect, uploadInbound);
router.post("/addToDB/outbound", protect, uploadOutbound);

router.post("/addToDrive", protect, uploadFileToDrive);

export { router };
