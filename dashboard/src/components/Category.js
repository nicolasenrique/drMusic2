import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './Category.css'

function Category() {


    const [category, setCategory] = useState();



    useEffect(()=>{
        fetch('http://localhost:3000/products/api/productlist')
        .then(response => response.json())
        .then(data => { setCategory(data.categories) })
        .catch(error => console.error(error));

    }, []);

    useEffect(()=>{}, [category]);


    return(
        <div className="wrapperCat">            
            { 
                category === 'undefined' && <p>Cargando</p>               
            }
            {
                <ul>
                    {
                        category && category.map((cat, i) => {
                            return(
                                <li className="liCat" key={i}>
                                    <div className="categoryItem">
                                        <h4>{cat.description}</h4>
                                        <h4>Cantidad de Productos: {cat.countByIdCat}</h4>
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

export default Category;
