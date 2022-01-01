window.onload = function(){

    let form = document.querySelector('form.register');
    let fieldName = document.querySelector('input.name');
    let fieldLastName = document.querySelector('input.lastName');
    let fieldEmail = document.querySelector('input.mail');
    let fieldPassword = document.querySelector('input.password');
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");


    form.addEventListener("submit", function(event){

        let errors = [];

    
        if(fieldName.value == ""){
            errors.push("El campo nombre no debe estar vacío");
           } else if (fieldName.value.length < 2) {
            errors.push("El nombre debe tener al menos 2 caracteres");               
           };

        if(fieldLastName.value == ""){
            errors.push("El campo apellido no debe estar vacío");
           } else if (fieldLastName.value.length < 2) {
            errors.push("El apellido debe tener al menos 2 caracteres");               
           };

        if(fieldEmail.value == ""){
            errors.push("El campo email no debe estar vacío");
            }

        if (regex.test(fieldEmail.value) == false) {
            errors.push("debes escribir un email válido");
        }
            


        if(fieldPassword.value == ""){
            errors.push("El campo contraseña no debe estar vacío");
           }  
        
        if(errors.length > 0){

            event.preventDefault();

            let errorName = document.querySelector(".errorName p");
            for (let i = 0 ; i < errors.length ; i++) {
                if (errors[i] != "" && errors[i].indexOf('nombre') != -1) {
                    errorName.innerHTML += errors[i];
                }
            }

            let errorLastName = document.querySelector(".errorLastName p");
            for (let i = 0 ; i < errors.length ; i++) {
                if (errors[i] != "" && errors[i].indexOf('apellido') != -1) {
                    errorLastName.innerHTML += errors[i];
                }
            }

            let errorEmail = document.querySelector(".errorEmail p");
            for (let i = 0 ; i < errors.length ; i++) {
                if (errors[i] != "" && errors[i].indexOf('email') != -1) {
                    errorEmail.innerHTML += errors[i];
                }
            }

            let errorPassword = document.querySelector(".errorPassword p");
            for (let i = 0 ; i < errors.length ; i++) {
                if (errors[i] != "" && errors[i].indexOf('contraseña') != -1) {
                    errorPassword.innerHTML += errors[i];
                }
            }

        }

    });


    


    

}