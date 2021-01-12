import React from 'react';

export default class Menu extends React.Component{
    closeMenu() {
        //document.getElementsByClassName("menu").classList.remove('active');
        document.getElementById("menu").classList.remove('active');
    }
    render() {
        return (
            <div id="menu" className="menu activex">
                <span className="closeMenu" onClick={()=>this.closeMenu()}>x</span>
                <ul>
                    <li>Cart</li>
                    <li>Admin</li>
                </ul>
            </div>
        );
    }
}