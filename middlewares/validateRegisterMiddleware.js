const express = require('express');
const { check } = require('express-validator');
const path = require("path");

const validations = [
    check('name')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    check('lastName')
        .notEmpty().withMessage('Debes completar el apellido').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    check('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    check('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener almenos 8 caracteres'),
    check('img').custom((value, { req }) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg','.png','.gif'];

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

module.exports = validations;