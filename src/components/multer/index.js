const multer = require("multer");
const path = require("path");
const appRoot = require("app-root-path");

const saveImage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(appRoot.path, "public", "messages", "images"));
    },
    filename: function (req, file, cb) {
      cb(null, `${req.image_file_id}.${req.image_extension}`);
    },
  }),
  limits: {
    fileSize: 8388608,
  },
  fileFilter(req, file, cb) {
    const allowedExtension = [".jpeg", ".png"];
    const extname = path.extname(file.originalname);
    if (!allowedExtension.includes(extname)) {
      const error = new Error(
        "Invalid file extension. You can only upload jpeg and png file."
      );
      return cb(error);
    }
    cb(null, true);
  },
});

module.exports = { saveImage };
