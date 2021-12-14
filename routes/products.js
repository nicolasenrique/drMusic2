<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require("../controllers/productsController");
const multer = require("multer");

// middlewares
const guestMiddleware = require("../middlewares/guestMiddleware");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/products");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

router.get("/list",                               productsController.list); // Sugerencia Nico router.get("/", productsController.list);
router.get("/create",   authAdminMiddleware,      productsController.create);
router.post("/create",  upload.single("img"),     productsController.store);
router.get('/:id/edit', authAdminMiddleware,      productsController.edit);
router.put('/:id/update',   upload.single('imagen'),  productsController.update);
router.get('/:id/delete', authAdminMiddleware,    productsController.formDelete);
router.delete('/:id/delete',authAdminMiddleware,  productsController.delete);
router.get("/search",                             productsController.search);
router.get("/:id",                                productsController.detail);



module.exports = router;
=======
const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require("../controllers/productsController");
const multer = require("multer");

// middlewares
const guestMiddleware = require("../middlewares/guestMiddleware");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/products");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

router.get("/list",                               productsController.list); // Sugerencia Nico router.get("/", productsController.list);
router.get("/create",   authAdminMiddleware,      productsController.create);
router.post("/create",  upload.single("img"),     productsController.store);
router.get('/:id/edit', authAdminMiddleware,      productsController.edit);
router.put('/:id/update',   upload.single('imagen'),  productsController.update);
router.get('/:id/delete', authAdminMiddleware,    productsController.formDelete);
router.delete('/:id/delete',authAdminMiddleware,  productsController.delete);
router.get("/:id",                                productsController.detail);




module.exports = router;
>>>>>>> fdf8e76b98cc8be3c265fd0460e07eec76323aca
