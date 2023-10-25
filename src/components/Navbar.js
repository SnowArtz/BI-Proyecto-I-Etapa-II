import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';

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
                <span className="navbar-logo">Mi Logo</span>
            </div>
            {menuOpen && (
                <div className="sidebar-menu" ref={sidebarRef}>
                    <a href="#inicio" onClick={() => setMenuOpen(false)}>
                        <i className="fa fa-home" aria-hidden="true"></i> Inicio
                    </a>
                    <a href="#acerca" onClick={() => setMenuOpen(false)}>
                        <i className="fa fa-info-circle" aria-hidden="true"></i> Acerca de
                    </a>
                    <a href="#contacto" onClick={() => setMenuOpen(false)}>
                        <i className="fa fa-envelope" aria-hidden="true"></i> Contacto
                    </a>
                </div>
            )}
        </div>
    );
}

export default Navbar;
