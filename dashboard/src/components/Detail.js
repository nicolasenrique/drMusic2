import { useState, useEffect } from "react";
import '../Detail.css'

function Detail() {

    const [ultimo, setUltimo] = useState();



    useEffect(()=>{
        console.log('%cse montó el componente','color: green');
        fetch('http://localhost:3000/products/api/productlist')
        .then(response => response.json())
        .then(data => { 
            console.log('Data--> '+data.products[1].id_product);
            console.log('Data--> '+data.products[0].prod_price[0].price);
            console.log('Data2--> '+data.lastProductCreated[0].detailUrl);
            console.log('Data3--> '+data.lastProductCreated[0]);
            setUltimo(data.products);
        })
        .catch(error => console.error(error));

    }, []);

    useEffect(()=>{
        console.log('%cse ACTUALIZÓ el componente','color: blue');
        console.log('utlimo-->' + ultimo);
     }, [ultimo]);


    return(
        <div className="listContainer">
            
            { 
                ultimo === 'undefined' && <p>Cargando</p>               
            }
            {
                // ultimo !== 'undefined' && 
                
                <ul>
                    <h1>Listado de Productos</h1>
                    {
                        ultimo && ultimo.map((producto, i) => {
                            return(
                                <li key={i}>
                                    <div className="productContainer">
                                        
                                    <h4>Id de Producto:{producto.id_product}</h4>
                                    <h4>Descripción:{producto.description}</h4>
                                    <h4>Marca: {producto.brand}</h4>
                                    <h4>Fecha de Creación{producto.creation_date}</h4>
                                    

                                          {
                                        producto.prod_price.map((p, ia) => {
                                            return (
                                                <div key={ia}>
                                                    <h4>Precio${p.price}</h4>                                                                               
                                                </div>
                                            )
                                             
                                        })
                                    }
                                     </div>  
                                </li>

                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}

export default Detail;