// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom"; 
import heroImg from "../../../assets/hero.jpg"; // Manter o caminho para sua imagem

const Hero = () => {
  return (
    // Usa classes CSS puras para layout
    <section className="page-container flex-col-reverse" style={{padding: '60px 80px', flexDirection: 'column-reverse', gap: '40px', alignItems: 'center', justifyContent: 'space-between'}}>
      {/* Left Content */}
      <div style={{flex: 1}}>
        <p style={{fontSize: '0.875rem', color: '#003785', fontWeight: '500', marginBottom: '8px', borderLeft: '4px solid #003785', paddingLeft: '8px'}}>
          Cuidados com animais de estimação, feitos sob medida com amor.
        </p>
        <h1 className="sub-heading" style={{lineHeight: 1.2}}>
          Seu <span className="text-accent">Pet</span> Merece <br /> A
          Melhor Família.
        </h1>
        <div className="flex-row-start" style={{marginTop: '32px'}}>

          <Link
            to="/tutores"
            className="btn-accent" 
          >
            Gerenciar Tutores
          </Link>

          <Link 
          to="/pets"
          className="btn-primary-blue"> 
            Gerenciar Pets
          </Link>

        </div>
      </div>

      {/* Right Image */}
     {/* Right Image (Substituído por novas classes CSS) */}
      <div className="hero-image-container"> {/* Usa a nova classe de contêiner */}
        <img src={heroImg} alt="Pet" className="hero-image" /> {/* Usa a nova classe de imagem */}
        
        {/* Removido o placeholder, pois a imagem real deve aparecer agora */}
      </div>
    
    </section>
  );
};

export default Hero;