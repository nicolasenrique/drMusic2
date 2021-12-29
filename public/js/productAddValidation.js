window.addEventListener("load",function(){
    
    let formulario = document.querySelector(".formProduct");

    formulario.addEventListener("submit", function(e){
        

        let campoNombre = document.querySelector("#productName");
        let errores = [];

        if(campoNombre.value == ""){
            errores.push("El campo NOMBRE no puede estar vacío");
        } else if(campoNombre.value.length < 5){
            errores.push("El campo NOMBRE debe tener más de 5 caracteres")
        }

        let campoDescripcion = document.querySelector("#descripcion");

        if(campoDescripcion.value.length < 20){
            errores.push("El campo DESCRIPCION debe tener más de 20 caracteres");
        }

        let campoAncho = document.querySelector("#ancho");
        if(campoAncho.value == ""){
            errores.push("El campo ANCHO debe completarse");
        }
        let campoLargo = document.querySelector("#profundidad");
        if(campoLargo.value == ""){
            errores.push("El campo PROFUNDIDAD debe completarse");
        }
        let campoAlto = document.querySelector("#alto");
        if(campoAlto.value == ""){
            errores.push("El campo ALTO debe completarse");
        }

        let campoImagen = document.querySelector("#img");
        var isValid = /.(jpg|jpeg|png|gif)$/i.test(campoImagen.value);
        if (!isValid) {
            errores.push('Solo se permiten archivos JPEG, JPEG, PNG y GIF!');
          }
      
    

        
        if(errores.length > 0) {
            e.preventDefault();
        }

       
        let ulErrores = document.querySelector("div.errores ul")
        for (let i = 0; i < errores.length; i++){
            
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
        }

    })
})