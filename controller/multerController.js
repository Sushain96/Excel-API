const multer = require("multer");

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

exports.uploadData = upload.single("excel");

exports.resUpdate = (req, res, next) => {
  console.log(req.file);
  console.log(multerStorage);
  console.log(req.body);
  res.status(200).json({
    status: " Success",
    data: req.file,
  });
  next();
};
