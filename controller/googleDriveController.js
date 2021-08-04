const { google } = require("googleapis");
const fs = require("fs");

const oAth2Data = require(`${__dirname}/../cred.json`);
const catchAsync = require(`${__dirname}/../catchAsync`);

// const CLIENT_ID =
//   "671984275808-p4o1cmi2qiagnv8s7bglcd0stothvi2m.apps.googleusercontent.com";
// const CLIENT_SECRET = "8phRW04-85Degq22dS64MjQl";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const CLIENT_ID = oAth2Data.web.client_id;
const CLIENT_SECRET = oAth2Data.web.client_secret;
const REDIRECT_URI = oAth2Data.web.redirect_uris[0];

const REFRESH_TOKEN =
  "1//04DZYKSwuVcZoCgYIARAAGAQSNwF-L9IryENcGoaTwk6-GnuLvJJFBa6vY7P1GCQbxNggXNdO4V20eAa5LFlyUwoh3erglgR7QeI";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

exports.uploadFileToDrive = catchAsync(async (req, res, next) => {
  const response = await drive.files.create({
    requestBody: {
      name: "myexcel.xlsx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    media: {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      body: fs.createReadStream(`${__dirname}/../uploads/myexcel.xlsx`),
    },
  });
  console.log("File has been uploaded\n", response.data);

  const fileId = response.data.id;
  await drive.permissions.create({
    fileId: fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  const result = await drive.files.get({
    fileId: fileId,
    fields: "webViewLink, webContentLink",
  });
  console.log("File links:\n", result.data);
  console.log("DATA SUCCESSFULLY LOADED!!");
  res.status(200).json({
    status: "Success",
    message: "DATA UPLOADED SUCCESSFULLY",
    data: result.data,
  });
  next();
});
