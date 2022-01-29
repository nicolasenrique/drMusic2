const express = require("express");
const router = express.Router();
const path = require("path");
const productsController = require("../controllers/productsController");
const multer = require("multer");


// middlewares
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");
const validateCreateProduct = require("../middlewares/validateProductMiddleware");


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





router.get("/list",              productsController.list); 
router.get("/create",   authAdminMiddleware,      productsController.create);
router.post("/create", upload.single('img') , validateCreateProduct  , productsController.store);
router.get('/:id/edit', authAdminMiddleware,      productsController.edit);
router.put('/:id/update',   upload.single('img'), validateCreateProduct  , productsController.update);
router.get('/:id/delete', authAdminMiddleware,    productsController.formDelete);
router.delete('/:id/delete',authAdminMiddleware,  productsController.delete);
router.get("/search",                             productsController.search);
router.get("/:id", authMiddleware,           productsController.detail);

// APIs
router.get("/api/productlist",                        productsController.productList);
router.get("/api/productdetail/:id",                  productsController.productDetail);

 


module.exports = router;
