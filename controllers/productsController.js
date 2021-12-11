const fs = require("fs");
const path = require("path");
// acceso a BD
let db = require("../database/models");
// const ProdCategory = require("../database/models/ProdCategory");
const Op = db.Sequelize.Op;

const productsFilePath = path.join(__dirname, "../data/productos.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function grabaRegistros(products) {
  let prdoctsJSON = JSON.stringify(products, null, 2);
  fs.writeFileSync(productsFilePath, prdoctsJSON);
}


const controlProducts = {  
  list: function (req, res) {
    // Show all products from BD
    db.Product.findAll({include: [{association: "prod_price" }, {association: "prod_image" }]})
        .then(function(products){
            res.render('productList', { products: products} )
        })
  },
  // Shows one product
  detail: function (req, res) {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let product;
    for (prod of products) {
      if (prod.prodId == req.params.id) {
        product = prod;
        break;
      }
    }
    res.render("productDescription", { selectedProduct: product });
  },
  create: function (req, res) {
    // console.log("estoy en el CREATE");
    // res.render("product_create");
    let promProduct = db.Product.findAll();
    let promColor = db.Color.findAll();
    let promProdCat = db.ProdCategory.findAll();
    let promProdPrice = db.ProdPrice.findAll();
    let promProdSize = db.ProdSize.findAll();

    Promise.all([promProduct, promColor, promProdCat, promProdPrice, promProdSize])
      .then(([allProducts, allColors, allProdCats, allProdPrices, allProdSizes]) => {
        return res.render(path.resolve(__dirname, "..", "views", "product_create"), {
          allProducts,
          allColors,
          allProdCats,
          allProdPrices,
          allProdSizes
        });
      })
      .catch((error) => res.send(error));
  },
  store: function (req, res) {
    // const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    // let prodToCreate = {};
    // let img = "default-img.png";
    // if (req.file != undefined) {
    //   img = req.file.filename;
    // }
    // prodToCreate.prodId = products[products.length - 1].prodId + 1;
    // prodToCreate.nombre = req.body.name;
    // prodToCreate.descripcion = req.body.descripcion;
    // prodToCreate.precio = req.body.precio;
    // prodToCreate.imagen = img;
    // prodToCreate.categoria = req.body.categoria;
    // prodToCreate.medidas = req.body.medidas;
    // prodToCreate.alto = req.body.alto;
    // prodToCreate.ancho = req.body.ancho;
    // prodToCreate.profundidad = req.body.profundidad;
    // prodToCreate.color = req.body.color;
    // prodToCreate.fechaCreacion = Date();
    // prodToCreate.fechaModificacion = null;
    // products.push(prodToCreate);
    // //console.log(prodToCreate);
    // let productsJSON = JSON.stringify(products, null, 2);
    // fs.writeFileSync(
    //   path.join(__dirname, "../data/productos.json"),
    //   productsJSON
    // );
    // res.redirect("/products/list");
    db.Product.create({
        description: req.body.descripcion,
        brand: null,
        creation_date: null,
        modif_date: null,
        active: 1,
        id_colors: req.body.color,
        id_prod_category: req.body.categoria,
        id_prod_price: req.body.precio,
    

      })
        .then(() => {
          return res.redirect("/users/login");
        })
        .catch((error) => res.send(error));
  },
  //
  edit: (req, res) => {

    // const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    // let product;
    // for (prod of products) {
    //   if (prod.prodId == req.params.id) {
    //     product = prod;
    //     break;
    //   }
    // }
    // res.render("product_edit", { product: product });

    //

    let productId = req.params.id;

    let promProduct = db.Product.findByPk(productId,{include: ['color','prod_category','prod_size','prod_price','prod_image']});
    let promColor = db.Color.findAll();
    let promProdCat = db.ProdCategory.findAll();
    let promProdPrice = db.ProdPrice.findAll();
    let promProdSize = db.ProdSize.findAll();

    Promise.all([promProduct, promColor, promProdCat, promProdPrice, promProdSize])
      .then(([Products, allColors, allProdCats, allProdPrices, allProdSizes]) => {
        return res.render(path.resolve(__dirname, "..", "views", "product_create"), {
          Products,
          allColors,
          allProdCats,
          allProdPrices,
          allProdSizes
        });
      })
      .catch((error) => res.send(error));


  },
  //
  update: (req, res) => {
    //
    // const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    // let prodToUpadate = {};
    // for (i = 0; i < products.length; i++) {
    //   //
    //   if (products[i].prodId == req.body.prodId) {
    //     prodToUpadate.prodId = req.body.prodId;
    //     prodToUpadate.nombre = req.body.nombre;
    //     prodToUpadate.descripcion = req.body.descripcion;
    //     prodToUpadate.precio = req.body.precio;
    //     if (req.file) {
    //       prodToUpadate.imagen = req.file.filename;
    //     } else {
    //       prodToUpadate.imagen = products[i].imagen;
    //     }
    //     prodToUpadate.categoria = req.body.categoria;
    //     prodToUpadate.medidas = req.body.medidas;
    //     prodToUpadate.alto = req.body.alto;
    //     prodToUpadate.ancho = req.body.ancho;
    //     prodToUpadate.profundidad = req.body.profundidad;
    //     prodToUpadate.color = req.body.color;
    //     prodToUpadate.fechaCreacion = products[i].fechaCreacion;
    //     prodToUpadate.fechaModificacion = new Date();
    //     products[i] = prodToUpadate;
    //     break;
    //   }
    // }
    // grabaRegistros(products);
    // res.render("productDescription", { selectedProduct: prodToUpadate });
      
    //
    // db.Product
    // .update(
    //     {
    //       description: req.body.descripcion,
    //       brand: null,
    //       creation_date: null,
    //       modif_date: null,
    //       active: 1,
    //       id_colors: req.body.color,
    //       id_prod_category: req.body.categoria,
    //       id_prod_price: req.body.precio,
    //     },
    //     {
    //         where: {id_product: productId}
    //     })
    // .then(()=> {
    //     return res.redirect('/')})            
    // .catch(error => res.send(error))
    let productId = req.params.id;
    db.Product.findOne({where: {id_product: 1}})
.then(record => {
  
  if (!record) {
    throw new Error('No record found')
  }

  console.log(`retrieved record ${JSON.stringify(record,null,2)}`) 

  let values = {
    description: req.body.descripcion,
          brand: null,
          creation_date: null,
          modif_date: null,
          active: 1,
          id_colors: req.body.color,
          id_prod_category: req.body.categoria,
          id_prod_price: req.body.precio,
  }
  
  record.update(values).then( updatedRecord => {
    console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
    // login into your DB and confirm update
  })

})
.catch((error) => {
  // do seomthing with the error
  throw new Error(error)
})

  },
  delete: (req, res) => {
    //
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let id = req.params.id;
    let productsNew = products.filter(removeID);
    function removeID(prod) {
      return prod.prodId != id;
    }
    grabaRegistros(productsNew);
    // res.send('estamos en el detele!!');
    res.redirect("/products/list");
  },
  formDelete: (req, res) => {
    //
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let product;
    for (prod of products) {
      if (prod.prodId == req.params.id) {
        product = prod;
        break;
      }
    }
    res.render("product_delete", { product: product });
  }
};

module.exports = controlProducts;
