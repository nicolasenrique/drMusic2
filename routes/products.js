const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require("../controllers/productsController");
const multer = require("multer");
const { check } = require('express-validator');

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


const validateCreateProduct = [
    check('name').notEmpty().withMessage("Debes completar el campo nombre")
]


router.get("/list",                               productsController.list); // Sugerencia Nico router.get("/", productsController.list);
router.get("/create",   authAdminMiddleware,      productsController.create);
router.post("/create", validateCreateProduct,  upload.single("img"),    productsController.store);
router.get('/:id/edit', authAdminMiddleware,      productsController.edit);
router.put('/:id/update',   upload.single('img'),  productsController.update);
router.get('/:id/delete', authAdminMiddleware,    productsController.formDelete);
router.delete('/:id/delete',authAdminMiddleware,  productsController.delete);
router.get("/search",                             productsController.search);
router.get("/:id",                                productsController.detail);
 


module.exports = router;
