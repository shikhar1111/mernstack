import React from "react";
import {Link, withRouter} from "react-router-dom";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#2ecc72"}
    } else {
        return {color: "white"}
    }
};

const Menu = ({history}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark py-3">
                <li className="nav-item">
                    <Link to="/" style={currentTab(history, "/")} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/cart" style={currentTab(history, "/cart")} className="nav-link">Cart</Link>
                </li>
                <li className="nav-item">
                    <Link to="/user/dashboard" style={currentTab(history, "/user/dashboard")} className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/dashboard" style={currentTab(history, "/admin/dashboard")} className="nav-link">Admin Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to="/signup" style={currentTab(history, "/signup")} className="nav-link">Signup</Link>
                </li>
                <li className="nav-item">
                    <Link to="/signin" style={currentTab(history, "/signin")} className="nav-link">Signin</Link>
                </li>
                <li className="nav-item">
                    <Link to="/signout" style={currentTab(history, "/signout")} className="nav-link">Signout</Link>
                </li>

            </ul>
        </div>
    )
};

export default withRouter(Menu);
