const router = require("express").Router();
const ImageController = require("../controllers/image");
const upload = require("../middlewares/image");

router.post("/", upload.single("file"), ImageController.createImage);
router.delete("/:id", ImageController.deleteImage);
module.exports = router;
