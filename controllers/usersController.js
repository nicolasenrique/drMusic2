const fs = require("fs");
const { validationResult } = require('express-validator');
const path = require("path");
const bcryptjs = require("bcryptjs");
const usersFilePath = path.join(__dirname, "../data/usuarios.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const User = require("../models/Users");
const UserDb = require("../models/UsersDb");

// acceso a BD
let db = require("../database/models");
const Op = db.Sequelize.Op;

const controlUsers = {
  register: function (req, res) {
    let promUser = db.User.findAll();
    let promUserCat = db.UserCategory.findAll();
    let promUserSta = db.UserStatus.findAll();

    Promise.all([promUser, promUserCat, promUserSta])
      .then(([allUsers, allUserCats, allUserSta]) => {
        return res.render(path.resolve(__dirname, "..", "views", "register"), {
          allUsers,
          allUserCats,
          allUserStas,
        });
      })
      .catch((error) => res.send(error));

    res.render("register");
  },
  store: function (req, res) {
    //Primero me traigo los resultados de la validación del formulario

    const resultValidation = validationResult(req);

    console.log(resultValidation);

    if (resultValidation.isEmpty()) {
      //sino hay errores, seguimos adelante
      let encryptedPass = bcryptjs.hashSync(req.body.password, 10);
      // let userToCreate = {};
      let img = "default-img.png";
      if (req.file !== undefined) {
        img = req.file.filename;
      }

      db.User.create({
        first_name: req.body.name,
        last_name: req.body.lastName,
        email: req.body.email,
        password: encryptedPass,
        phone_number: null,
        address: null,
        creation_date: null,
        last_login: null,
        id_user_category: 1,
        id_user_status: 1,
        avatar: img,
      })
        .then(() => {
          return res.redirect("/users/login");
        })
        .catch((error) => res.send(error));

    } else {
      //Hay errores, entonces volvemos al formulario
      return res.render('register', { errors: resultValidation.mapped(), oldData: req.body });
    }
  },
  login: function (req, res) {
    res.render("login");
  },
  loginProcess: function (req, res) {
    // let userToLogin = User.findByField("email", req.body.email);
    let userToLogin = User.findByFieldMin("email", req.body.email) //datos minimos necesarios
    console.log("userToLogin.rol->" + userToLogin.rol);

    if (userToLogin) {
      let isOkThePassword = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );

      if (isOkThePassword) {
        delete userToLogin.password;
        // console.log('userToLogin: ' + JSON.stringify(userToLogin));
        req.session.userLogged = userToLogin; //si todo esta bien, antes de redirigir a profile, quiero guardar el usuario en session

        if (req.body.recordarme != undefined) {
          // si el usuario tildó el checkbox 'recordarme' guarda en la cookie el valor del usuario
          res.cookie("recordarme", userToLogin, { maxAge: 60000 });
        }
        return res.redirect("/users/profile");
      }
    }
    return res.render("login", {
      errors: {
        email: {
          msg: "Las credenciales son inválidas",
        }
      },
    });
  },  
  loginProcessDb: function (req, res) {
    let userToLogin =  Promise.resolve(UserDb.findByEMail(req.body.email));

    userToLogin.then((value)=> {
      userJson = JSON.parse(JSON.stringify(value));


      if (userJson.length > 0) {
        let isOkThePassword = bcryptjs.compareSync(
          req.body.password,
          userJson[0].password
        );

        if (isOkThePassword) {

          let userLoggedAux = { 
            firstName:  userJson[0].first_name,
            email:      userJson[0].email,
            rol:        userJson[0].category.name,
            estado:     userJson[0].status.type,
            avatar:     userJson[0].avatar
          };
          req.session.userLogged = userLoggedAux; 
  
          if (req.body.recordarme != undefined) {
            // si el usuario tildó el checkbox 'recordarme' guarda en la cookie el valor del usuario
            res.cookie("recordarme", userLoggedAux, { maxAge: 60000 });
          }
          // res.render("userProfile");
          return res.redirect("/users/profile");
        }


      }; 
      return res.render("login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas, revisa tu usuario y/o contraseña!",
            // old: req.body
          }          
        },
        old : req.body.email,
      });


    });

    
    // res.send('userToLogin');
    //

  },
  profile: function (req, res) {
    let months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Agos", "Sep", "Oct", "Nov", "Dic"];
    let userToLogin =  Promise.resolve(UserDb.findByEMail(req.session.userLogged.email));
    userToLogin.then((user)=> {
    let now = new Date();
    user[0].fecha_creacion      = user[0].creation_date.getDay() + '-'+ months[user[0].creation_date.getMonth()] + '-'+ user[0].creation_date.getFullYear();  
    user[0].fecha_ultimo_login  = now.getDay() + '-'+ months[now.getMonth()] + '-'+ now.getFullYear();   
      res.render('userProfile', { userInfo : user});
    })
    
    // return res.render("userProfile", {
    //   user: req.session.userLogged,
    // });
  },
  edit: function (req, res) {

    db.User.findByPk(req.params.id)
     .then(function(user){
       res.render("userEdit", { user:user } );
      })
  },
  update: function(req, res) {
    db.User.update(
      { 
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number,
        address: req.body.address,
        alt_phone_numnber: req.body.alt_phone_numnber
      },
      {
        where: { id_user: req.params.id}
        }
    )
      .then(function(){
        res.send("usuario modificado")
    })
  },
  logout: function (req, res) {
    req.session.destroy(); // Este método borra cualquier cosa que esté en session
    return res.redirect("/");
  },

  // API
  userList: function (req, res) {
    // lista de usuarios
    let userList = db.User.findAll({
      include: [{association: "category"},{association: "status"}]
    });

    // ultimo usuario creado
    let lastUserCreated = db.User.findAll({   
      include:  [{association: "category"},{association: "status"}],  
      order :   db.Sequelize.literal('User.creation_date DESC'),
      limit: 1
      
    });

    Promise.all([userList, lastUserCreated])
    .then(function([usrs, lastUserCreated]){
      let aux_users = usrs.map(function(u){
        u.dataValues.detailUrl = 'http://localhost:3000/users/api/userdetail/'+u.dataValues.id_user;
        delete u.dataValues.password;
        return u;
      });
      lastUserCreated[0].dataValues.detailUrl = 'http://localhost:3000/users/api/userdetail/'+lastUserCreated[0].dataValues.id_user;
      delete lastUserCreated[0].dataValues.password;
      //
      return res.status(200)
      .json({
          users:              aux_users,
          lastUserCreated:    lastUserCreated,
          usersCount:         usrs.length,
          status:             200
      })

    })
    .catch(function (err) {
      return res.status(200).json({
        error:      err,
        status:     500

      });
    });
  },
  userDetail: function (req, res) {
    //
    db.User.findByPk(req.params.id,{
      include: [{association: "category"},{association: "status"}]
    })
    .then(function(user){
      return res.status(200).json({
        data: user,
        status: 200

      });
     })
    .catch(function (err) {
      return res.status(200).json({
        error: err,
        status: 500

      });
    });
  }

};

module.exports = controlUsers;
