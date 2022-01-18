import { useState, useEffect} from 'react'
import React from 'react'

const Detail = () => {
    const [products, setProducts] = useState ([]);

    useEffect (() => {
        console.log('%cse monto el componente', 'color: green');
        fetch(`http://localhost:3000/products/api/productlist`)
        .then(response => response.json())
        .then(data =>{
            setProducts(data.results)
        })
        .catch (error=>console.error(error));
      
    },[])
    
    useEffect(() =>{
        console.log('%cseactualizó el componente','color:yellow');
    },[products])

    useEffect(() =>{
        return () => console.log('%cse desmontó el componente', 'color:red');
    }, [])
    
    return (
       
        
            <div>
            <h2 >Soy el componente Detail</h2>            
            <ul>
           
            {
                products.map((product,i) =>{
                 return (
                     <li key={i}>
                        <h3>{product.id_product}</h3>
                        <img src={product.prod_image} width="150" alt='foto'/>
                     </li>
                 )   
                })
            }
            </ul>
        </div>
        
    )
}

export default Detail
