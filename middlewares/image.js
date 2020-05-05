const multer = require("multer");
const uuid = require("uuid/v1")
/**
 * create temporary directory for file
 * rename the file with new Date()
 */
//cb(null, `${uuid()}_${new Date().toISOString()}_${file.originalname}`);
const fileStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${uuid()}_${new Date().toISOString().replace(/:/g, '-')}_${file.originalname}`);
  }
});

/**
 * function for checking file type
 * req -
 * file?: Object - file from user
 * cb?: Function - callback provided by multer
 */
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||  file.mimetype === "application/pdf" ||  file.mimetype === "image/png" || file.mimetype === "video/mp4"
  ) {
    console.log('masuuuk filter')
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/**
 * object to check file size and amount of file
 * for this case, multer only accept 1 file and the size is 5MB
 */
const fileLimit = {
  files: 1,
  fileSize: 5 * 1024 * 1024
};

const upload = multer({
  storage: fileStorage,
  limits: fileLimit,
  fileFilter: fileFilter
});

module.exports = upload;
