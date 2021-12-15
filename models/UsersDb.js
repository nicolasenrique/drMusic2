// acceso a BD
let db = require("../database/models");
const Op = db.Sequelize.Op;


const UsersDb = {
   findByEMail: async function(email){
        let aux;
        try {
            let users = await db.User.findAll({
                include: [
                    {association: "category" }, 
                    {association: "status" }
                ],
                where: {
                    email: {
                        [Op.eq]: email
                      }
                }    
            });
            
            return users;
        } 
        catch (error) {
            return "Ups, se produjo un error findByEMail-> " + error; 
        }
    }, 
}

module.exports = UsersDb;