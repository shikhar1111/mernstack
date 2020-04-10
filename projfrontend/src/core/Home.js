import React, {useEffect, useState} from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import {getAllProducts} from "../admin/helper/adminapicall";

export default function Home() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getAllProducts().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        loadAllProducts()
    }, []);


    return (
        <Base title="Home Page" description="Welcome to the T-shirt Store">
            <div className="row">
                <h1 className="text-white text-center">All Products</h1>
                <div className="row">
                    {products.map((product, index) => {
                        return (
                            <div key={index} className="col-4 mb-4 text-center">
                                <Card product={product}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    );
}
