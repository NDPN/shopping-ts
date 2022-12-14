const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

// Setup upload folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "./uploadImg/"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage: storage });

// Config validate signin
exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};
