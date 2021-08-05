import excelToJson from "convert-excel-to-json";
import fs from "fs";

const jsonConverter = (req, res, next) => {
  const result = excelToJson({
    source: fs.readFileSync("./uploads/myexcel.xlsx"),
    header: {
      rows: 1,
    },
    columnToKey: {
      "*": "{{columnHeader}}",
    },
  });
  fs.writeFileSync("./output.json", JSON.stringify(result));
  next();
};

export { jsonConverter };
