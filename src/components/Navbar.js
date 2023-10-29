import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import logoODS from './assets/onu3.png';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const sidebarRef = useRef(null);
    const hamburgerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen && sidebarRef.current && !sidebarRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="hamburger-nav" ref={hamburgerRef} onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>
                <span className="navbar-logo">
                <img src={logoODS} alt="Logo ONU" style={{ width: '30%', height: '100%' }} />
            </span>
            </div>
            {menuOpen && (
                <div className="sidebar-menu" ref={sidebarRef}>
                    <a href="/" onClick={() => setMenuOpen(false)}>
                        <i className="fa fa-home" aria-hidden="true"></i> Inicio
                    </a>
                    <a href="/predecir" onClick={() => setMenuOpen(false)}>
                        <i className="fa fa-forward" aria-hidden="true"></i> Predecir
                    </a>
                    <a href="/entrenar" onClick={() => setMenuOpen(false)}>
                        <i className="fa fa-refresh" aria-hidden="true"></i> Entrenar
                    </a>
                </div>
            )}
        </div>
    );
}

export default Navbar;
