module.exports = function(sequelize, dataTypes) {
    
    let alias = "ProdCategory"; 
    
    let cols = {  //cada columna es un objeto literal
        id_prod_category: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: dataTypes.STRING
        }  
    }
    
    let config = {
        tableName: "prod_category",
        timestamps: false
    }
    let ProdCategory = sequelize.define(alias, cols, config);

    ProdCategory.associate = function(models){
        ProdCategory.hasMany(models.Product, {
            as: "product",
            foreignKey: "id_prod_category"
        }); 

    }

    return ProdCategory;

}