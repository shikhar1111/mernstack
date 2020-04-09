import React from "react";
import ImageHelper from "./helper/ImageHepler";

const Card = ({product, addToCart = true, removeFromCart = false}) => {

    const showAddtoCart = addToCart => {
        return (
            addToCart && (
                <button
                    onClick={() => {
                    }}
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
            <div className="card-header lead">A photo from pexels</div>
            <div className="card-body">
                <div className="rounded border border-success p-2">
                    <ImageHelper product={product}/>
                </div>
                <p className="lead bg-success font-weight-normal text-wrap p-3">
                    this photo looks great
                </p>
                <h4 className="btn btn-success rounded  btn-sm px-4">$ 5</h4>
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
