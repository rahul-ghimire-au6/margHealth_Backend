const multer = require("multer");
const randomstring = require("randomstring");
let storage = multer.diskStorage({
  //-------------------------------logic to upload images at destination
  destination: (req, file, cb) => {
    cb(null, "uploads/excel");
  },
  //-------------------------------logic t
  filename: (req, file, cb) => {
    let val = file.originalname;
    let val1 = val.split(".");
    cb(null, file.fieldname + randomstring.generate(5) + "." + val1[1]);
  },
});

let upload = multer({
  //multer settings
  storage: storage,
  //-------------------------------logic to upload only images
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "text/csv" || file.mimetype === "text/xlsx"
    ) {
      cb(null, true);
    } else {
      var newError = new Error("file type is incorrect");
      newError.name == "multerError";
      cb(newError, false);
    }
  },
//   limits: {
//     fileSize: 1024 * 1024 * 10,  //use this to set any limits
//   },
});
//  console.log(storage.filename)
module.exports = upload;
