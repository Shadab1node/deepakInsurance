
const multer = require("multer");
var path = require("path")
var image = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/Image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
var image = multer({ storage: image });

const imageUplods = image.fields([
  { name: 'incimage', maxCount: 1 },
  { name: 'rcimage', maxCount: 1 },
  { name: 'modelimage', maxCount: 1 },
  { name: 'emissionimage', maxCount: 1 },
  // { name: 'documentimage', maxCount: 1 },
  // { name: 'insuranceimage', maxCount: 1 },
]);
const router = require("express").Router();
const Controller = require("../controller/vehicalController");
const auth = require("../middleware/auth")


router.route("/addvehical").post(auth.userloggedIn, imageUplods, Controller.addvehical);
// router.route("/getvehical").get(Controller.getallvehical)
router.route("/getvehical").get(auth.userloggedIn, Controller.getvehical)
// router.route("/updatevehicalbyid/:id").put(image.none(), Controller.updatevehicalbyid)
router.route("/deletevehical").delete(auth.userloggedIn, Controller.deletevehical)

module.exports = router;