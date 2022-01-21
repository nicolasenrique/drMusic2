import React from 'react';
import Category from './Category';
import './ContentRight.css';
import LastUserProduct from './LastUserProduct';

const ContentRight = () => {
    return (
        <div>
            <div className="ContentRight">
                <h1>Categorías de la Tienda</h1>
                <Category />            
            </div>
            <div className="ContentRight">
                <h1>Ultimo Usuario y Producto Creado</h1>
                <LastUserProduct />            
            </div>
        </div>
    )
}

export default ContentRight
