import React, {useState} from "react";
import ImageHelper from "./helper/ImageHepler";
import Redirect from "react-router-dom/es/Redirect";
import {addItemCart} from "./helper/carthelper";

const Card = ({product, addToCart = true, removeFromCart = false}) => {

    const [redirect, setRedirect] = useState(false);
    const [count,setCount] = useState(product.count);

    const cartTitle = product ? product.name : "A photo from pexels";
    const cartDescription = product ? product.description : "Default Description";
    const cartPrice = product ? product.price : "Default";

    const getRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart"/>
        }
    };

    const addCart = () => {
        addItemCart(product,() => setRedirect(true))
    };

    const showAddtoCart = addToCart => {
        return (
            addToCart && (
                <button
                    onClick={addCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        )

    };

    const showRemoveFromCart = removeFromCart => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    };

    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
                <div className="rounded border border-success p-2">
                    {getRedirect(redirect)}
                    <ImageHelper product={product}/>
                </div>
                <p className="lead bg-success font-weight-normal text-wrap p-3">
                    {cartDescription}
                </p>
                <h4 className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</h4>
                <div className="row">
                    <div className="col-12">
                        {showAddtoCart(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
