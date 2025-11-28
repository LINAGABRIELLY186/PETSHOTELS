// src/components/Navbar.jsx
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 
// Removidas as imports de ícones não essenciais para evitar erros

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { logout, user } = useAuth(); 

  const handleChange = () => {
    setMenu(!menu);
  };

  return (
    <header className="header-main"> {/* Usando classe CSS Pura */}
      <div className="header-content"> {/* Usando classe CSS Pura */}
        {/* Logo */}
        <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#003785', fontWeight: 'bold', fontSize: '1.5rem'}}>
          <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span style={{backgroundColor: '#93d1fa', padding: '8px', borderRadius: '50%'}}>
                <FaPaw />
            </span>
            <span>Pets Hotels</span>
          </Link>
        </div>

        {/* Menu Desktop */}
        <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}> 
            <nav style={{display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.875rem', fontWeight: '500', color: '#003785'}}>
                <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>Home</Link>
                <Link to="/tutores" style={{textDecoration: 'none', color: 'inherit'}}>Tutores</Link>
                <Link to="/pets" style={{textDecoration: 'none', color: 'inherit'}}>Pets</Link>
            </nav>

            {/* Logout Button */}
            <div style={{fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '16px'}}>
                <p style={{color: '#003785', fontWeight: '500'}}>Olá, {user?.nome || 'Usuário'}</p>
                <button
                    onClick={logout} 
                    style={{backgroundColor: '#ef4444', color: 'white', padding: '4px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer'}}
                >
                    Sair
                </button>
            </div>
        </div>
        
        {/* Hamburger (Você pode estilizar este menu mobile em outro arquivo CSS) */}
        <div style={{display: 'none'}}> 
          {menu ? (
            <FiX size={25} onClick={handleChange} />
          ) : (
            <FiMenu size={25} onClick={handleChange} />
          )}
        </div>
      </div>
      {/* Mobile Menu (Classes removidas, terá que estilizar em CSS Puro) */}
      <div style={{display: menu ? 'flex' : 'none', flexDirection: 'column', position: 'absolute', width: '100%'}}>
        {/* ... links de mobile aqui ... */}
      </div>
    </header>
  );
};

export default Navbar;