// src/components/Tutores.jsx
/* eslint-disable react-hooks/purity */
import React, { useState, useEffect } from "react"; 
import axios from 'axios'; 

const API_TUTORES_URL = 'http://localhost:3002/tutors'; 

const Tutores = () => {
  const [tutores, setTutores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true); 

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState(""); 

  const fetchTutores = async () => {
    try {
      const response = await axios.get(API_TUTORES_URL);
      setTutores(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar tutores:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutores(); 
  }, []);

  const handleAddTutor = async (e) => {
    e.preventDefault();

    const novoTutor = {
      nome, email, telefone, endereco, pets: []
    };

    try {
      const response = await axios.post(API_TUTORES_URL, novoTutor);
      setTutores([...tutores, response.data]); 
      handleCancel();
      alert(`Tutor ${nome} cadastrado com sucesso!`);
    } catch (error) {
      console.error("Erro ao salvar tutor:", error);
      alert("Falha ao cadastrar tutor.");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setNome("");
    setEmail("");
    setTelefone("");
    setEndereco("");
  };

  if (loading) {
    return <p style={{textAlign: 'center', padding: '40px', color: '#003785'}}>Carregando tutores...</p>;
  }

  return (
    <div className="page-container"> {/* Usando classe CSS pura */}
      <h1 className="page-title">Tutores</h1> {/* Usando classe CSS pura */}

      <button
        onClick={() => setShowForm(true)}
        className="btn-primary-blue" // Usando classe CSS pura
        style={{marginBottom: '32px'}}
      >
        Novo Tutor +
      </button>

      {showForm && (
        <form
          onSubmit={handleAddTutor}
          style={{backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #ccc', maxWidth: '768px', marginBottom: '40px'}}
        >
          <h2 className="page-title" style={{fontSize: '1.25rem', marginBottom: '16px'}}>
            Adicionar Novo Tutor
          </h2>

          <label style={{display: 'block', marginBottom: '12px'}}>
            Nome completo:
            <input type="text" className="form-field" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </label>
          
          <label style={{display: 'block', marginBottom: '12px'}}>
            E-mail:
            <input type="email" className="form-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label style={{display: 'block', marginBottom: '12px'}}>
            Telefone:
            <input type="text" className="form-field" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
          </label>
          
          <label style={{display: 'block', marginBottom: '24px'}}>
            Endereço:
            <input type="text" className="form-field" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
          </label>

          <div className="flex-row-start" style={{gap: '16px'}}>
            <button
              type="submit"
              className="btn-primary-blue"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary-red"
              style={{backgroundColor: '#9ca3af'}}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Lista de tutores */}
      <div style={{marginTop: '40px', maxWidth: '768px'}}>
        {tutores.length === 0 ? (
          <p style={{color: '#6b7280', fontStyle: 'italic'}}>Nenhum tutor cadastrado ainda.</p>
        ) : (
          <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
            {tutores.map((tutor) => (
              <li key={tutor.id} className="list-item" style={{marginBottom: '16px'}}>
                <p><strong>Nome:</strong> {tutor.nome}</p>
                <p><strong>E-mail:</strong> {tutor.email}</p>
                <p><strong>Telefone:</strong> {tutor.telefone}</p>
                <p><strong>Endereço:</strong> {tutor.endereco}</p>
                <p>
                  <strong>Pets:</strong>{" "}
                  {tutor.pets.length > 0 ? tutor.pets.join(", ") : "Nenhum pet cadastrado"}
                </p>
                {/* Aqui você adicionaria botões de Editar/Excluir */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tutores;