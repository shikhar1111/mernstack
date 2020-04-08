import React from "react";
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper";
import {Link} from "react-router-dom";

const AdminDashboard = () => {

    const {user: {name, email, role}} = isAuthenticated();

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link text-success" to="/admin/create/category">Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-success" to="/admin/create/product">Create Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-success" to="/admin/orders">Manage Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-success" to="/admin/products">Manage Products</Link>
                    </li>
                </ul>
            </div>
        )
    };

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Another Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <h4><span className="badge badge-success mr-2">Name:</span>{name}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4><span className="badge badge-success mr-2">Email:</span>{email}</h4>
                    </li>
                    <li className="list-group-item">
                        <h4 className="badge badge-danger"> Admin Area </h4>
                    </li>
                </ul>
            </div>
        )
    };

    return (
        <Base title="Welcome to Admin Area" description="Manage all your products here!!!"
              className="container bg-success p-4">
            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
        </Base>

    )
};

export default AdminDashboard;
