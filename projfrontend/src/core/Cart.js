import React, {useEffect, useState} from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import {loadCart} from "./helper/carthelper";

const Cart = () => {

    const [products, setProducts] = useState([]);

    const loadAllProducts = () => {
        return (
            <div>
                <h2>This section is to load products</h2>
                {products.map((product, index) => {
                    return (
                        <Card key={index} product={product} removeFromCart={true} addToCart={false}/>
                    )
                })}
            </div>
        )
    };

    useEffect(() => {
        setProducts(loadCart())
    });

    const loadCheckout = () => {
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
    };

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    );
};

export default Cart;
