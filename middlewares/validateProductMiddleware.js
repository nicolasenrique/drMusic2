const express = require('express');
const { check } = require('express-validator');
const path = require("path");

const validateCreateProduct = [

        check('descripcion')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),


        check('name')
        .not().isEmpty().withMessage("Debe introducir un nombre")
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres')

        .custom((value, { req }) =>{
        let file = req.file;
        let acceptedExtensions = ['.png','.jpeg','.gif','.jpg','.PNG','.JPEG','.GIF','.PNG'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error('Las extensiones permitidas son .jpg,.png,.gif');
        }
        return true;
        }
    })

]
module.exports = validateCreateProduct