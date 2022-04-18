import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import config from "../config/config.js";

aws.config.update({
  accessKeyId: config.AWS_ACCESS_ID,
  secretAccessKey: config.MY_AWS_ACCESS_KEY,
  region: "ap-south-1",
});


var s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "smallpost-storage",
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
});

export default upload;
