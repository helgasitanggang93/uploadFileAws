const router = require("express").Router();
const imageRoute = require("./image");

router.use("/upload", imageRoute);

module.exports = router;
