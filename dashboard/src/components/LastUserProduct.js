import { useState, useEffect } from "react";
import './LastUserProduct.css'


function DoubleFetch() {

    const [products, setProducts] = useState();
    const [users, setUsers] = useState();


    useEffect(async ()=>{
        console.log('%cse montó el componente','color: green');
        const products  = await fetch('http://localhost:3000/products/api/productlist').then (response => response.json());
        const users     = await fetch('http://localhost:3000/users/api/userlist').then (response => response.json());

        Promise.all([products, users])
        .then(function([resultadoProducts, resultadoUsers]){            
            setProducts(resultadoProducts.lastProductCreated[0]);
            setUsers(resultadoUsers.lastUserCreated[0]);
            // 
        })
        .catch(error => console.error(error));
    }, []);

    useEffect(()=>{
        console.log('%cse ACTUALIZÓ el componente','color: blue');
        console.log('products-->' + products);
        console.log('users-->' + users);


        if (products ==='undefined'){
            console.log('es distinto, la concha de la lora!!');
        }
     }, [products, users]);


    return(
        <div>
            { 
                products === 'undefined' && <p>Cargando</p>               
            }
             {
                // ultimo !== 'undefined' && 
                <div>
                    {
                     products && users && 
                     <div>
                        <div className="catBox"> 
                                <h2><b>Ultimo producto creado</b></h2>
                                <br/>
                                <h4><b>ID: </b>{products.id_product}</h4>
                                <h4><b>Descripción: </b>{products.description}</h4>
                                <h4><b>Marca: </b>{products.brand}</h4>
                                <h4><b>Fecha Creación: </b>{products.creation_date}</h4>

                        </div> 
  
                        <div className="catBox"> 
                                <h2><b>Ultimo usuario creado</b></h2>
                                <br/>
                                <h4><b>ID: </b>{users.id_user}</h4>
                                <h4><b>Nombre: </b>{users.first_name}</h4>
                                <h4><b>Apellido: </b>{users.last_name}</h4>
                                <h4><b>Fecha Creación: </b>{users.creation_date}</h4>

                        </div>   
                    </div>

                    }
                </div>
            }
        </div>
    )
}

export default DoubleFetch;