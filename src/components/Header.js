
import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    openMenu() {
        document.getElementById("menu").classList.add('active');
    }
    render() {
        return (
                <header>
                    <a className="menuIcon" href="/" onClick={()=>this.openMenu()}>&#9776;</a>
                    <a href="/" title="Funko Store">Funko Store</a>
                    <Link to="/admin">Admin</Link>
                </header>
            );
    }
}
export default Header;