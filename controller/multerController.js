import multer from "multer";

const multerExcelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("PLEASE UPLOAD ONLY EXCEL FILE!!.", false);
  }
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // cb(null, `${Date.now()} - ${file.originalname}`);
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage: multerStorage,
  fileFilter: multerExcelFilter,
});

const uploadData = upload.single("excel");

const resUpdate = (req, res, next) => {
  if (req.file === undefined) {
    console.log("Error Loading Excel file");
    res.status(400).json({
      status: "Request to load file failed!! Try again!",
    });
  } else {
    console.log(req.file);
    console.log(multerStorage);
    console.log(req.body);
    res.status(200).json({
      status: " Success",
      data: req.file,
    });
  }
  next();
};

export { uploadData, resUpdate };
