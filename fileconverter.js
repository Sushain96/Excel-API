const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

exports.jsonConverter = (req, res, next) => {
  const result = excelToJson({
    source: fs.readFileSync(`${__dirname}/uploads/myexcel.xlsx`),
    header: {
      rows: 1,
    },
    columnToKey: {
      "*": "{{columnHeader}}",
    },
  });
  fs.writeFileSync(`${__dirname}/output.json`, JSON.stringify(result));
  next();
};
