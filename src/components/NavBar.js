import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './NavBar.css';
import './Register.css'; // Assuming you have a Button.css for styling buttons

export default function NavBar() {
    const { currentUser, logout } = useAuth();

    async function handleLogout() {
        try {
            await logout();
        } catch {
            console.error('Error logout');
        }
    }

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-link">Home</Link>
            {!currentUser && (
                <>
                    <Link to="/register" className="navbar-link">Register</Link>
                    <Link to="/login" className="navbar-link">Login</Link>
                </>
            )}
            {currentUser && (
                <>
                    <Link to="/meus-projectes" className="navbar-link">Projectes</Link>
                    <Link to="/crear-projecte" className="navbar-link">Nou projecte</Link>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
}
