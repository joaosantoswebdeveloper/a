import React from 'react';
import Products from "../Products";
import Sidebar from "../Sidebar";

class HomeScreen extends React.Component {
    render() {
        return (
            <div className="homeScreen">
                <Products></Products>
                <Sidebar></Sidebar>
            </div>
        );
    }
}
export default HomeScreen;

