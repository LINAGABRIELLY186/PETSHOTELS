// src/components/Footer.jsx
import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-main"> {/* Usando classe CSS Pura */}
      <div className="footer-grid"> {/* Usando classe CSS Pura */}
        
        {/* Logo + tagline */}
        <div>
          <h2 style={{fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '12px'}}>Pets Hotels</h2>
          <p className="text-xs-footer">
            O segundo melhor amigo do seu animal de estimação (depois de você!). Oferecemos cuidados de primeira linha, banho e tosa, alimentação e muito mais.
          </p>
          <div style={{display: 'flex', gap: '16px', marginTop: '16px'}}>
            <FaInstagram style={{cursor: 'pointer'}} />
            <FaFacebookF style={{cursor: 'pointer'}} />
            <FaTwitter style={{cursor: 'pointer'}} />
            <FaYoutube style={{cursor: 'pointer'}} />
          </div>
        </div>

        {/* Quick Links (Estilização simplificada) */}
        <div>
          <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px'}}>Quick Links</h3>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem'}}>
            <li><a href="/" style={{color: 'inherit'}}>Home</a></li>
            <li><a href="/tutores" style={{color: 'inherit'}}>Tutores</a></li>
            <li><a href="/pets" style={{color: 'inherit'}}>Pets</a></li>
          </ul>
        </div>

        {/* ... (Services e Contact Info - Estilização similar) ... */}

        <div>
          <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px'}}>Nossos serviços</h3>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem'}}>
            <li>Hospedagem</li>
            <li>Adestramento</li>
            <li>Consultas com Veterinários</li>
            <li>Banho e tosa</li>
          </ul>
        </div>

        <div>
          <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px'}}>Contatos</h3>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem'}}>
            <li>Email: support@petshotel.com</li>
            <li>Telefone: +86 98184 3210</li>
            <li>Aberto: Seg - Sex, 9h - 18h</li>
            <li>Location: Teresina, Piauí</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{borderTop: '1px solid #93d1fa', marginTop: '48px', paddingTop: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem'}}>
         @copyright developed by Lina, Teresa e Meir | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;