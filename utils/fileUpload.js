const AWS = require("aws-sdk");
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
  signatureVersion: "v4",
});

const uploadFile = (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.name,
    Body: file.data,
    ContentType: file.mimetype,
  };
  var options = { partSize: 10 * 1024 * 1024, queueSize: 1 };

  return s3.upload(params, options).promise();
};

async function getUrl(file) {
  try {
    const signedUrlExpireSeconds = 60 * 500;
    return s3.getSignedUrl("getObject", {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file,
      Expires: signedUrlExpireSeconds,
    });
  } catch (e) {
    console.log(e);
    return null;
  }
}

const uploadFileFromStorage = (path, name) => {
  fs.readFile(path, (err, data) => {
    console.log("path", data);
    if (err) throw err;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: name,
      Body: data,
    };
    return s3.upload(params).promise();
  });
};

const uploadFileBase64Format = (file, name) => {
  const fileType = file.substring(
    file.indexOf("data:") + 5,
    file.indexOf(";base64")
  );

  const base64String = file.replace(/^data:image\/\w+;base64,/, "");
  const fileData = new Buffer(base64String, "base64");

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: name,
    Body: fileData,
    ContentType: fileType,
  };
  return s3.upload(params).promise();
};

module.exports.getUrl = getUrl;
module.exports.uploadFile = uploadFile;
module.exports.uploadFileFromStorage = uploadFileFromStorage;
module.exports.uploadFileBase64Format = uploadFileBase64Format;
