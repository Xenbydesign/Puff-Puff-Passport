import React from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from "./layoutProvider";
import Logo from "../styles/logo.png"
import LogoDark from "../styles/logoDark.png"
import Nav from "../components/navigation/Nav"


function Header({ currentUser, handleLogout, setCurrentUser }) {
    const { theme, toggleTheme } = useLayout();


    return (
        <header>
            {currentUser ? (
                <div className="header-wrapper">
                    <div className="welcome">
                        <h1>Welcome, {currentUser.username || 'User'}!</h1>
                    </div>
                    <div className="user-links">
                        <Link to="#" className="app-link" onClick={handleLogout}>
                            Logout
                        </Link>
                        <Link to="/user/settings" className="app-link">
                            ⚙️
                        </Link>
                        <button onClick={toggleTheme}>
                            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                        </button>
                    </div>
                </div>
            ) : null}
            <Link to='/'>
                <img src={theme === 'dark' ? LogoDark : Logo} alt='Canna Keeper Logo' id='logo' />
            </Link>

            <Nav currentUser={currentUser} />
        </header>
    );
}

export default Header;
