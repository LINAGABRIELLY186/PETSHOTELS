// src/components/Pets.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios'; 
// FaPaw não é mais necessário se você removeu o Tailwind
// import { FaPaw } from "react-icons/fa"; 

const API_PETS_URL = 'http://localhost:3002/pets';
const API_TUTORES_URL = 'http://localhost:3002/tutors'; 

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [tutoresReais, setTutoresReais] = useState([]); 
    const [loading, setLoading] = useState(true); 

    const [showForm, setShowForm] = useState(false);
    const [nome, setNome] = useState("");
    const [especie, setEspecie] = useState("Cachorro");
    const [raca, setRaca] = useState("");
    const [idade, setIdade] = useState("");
    const [tutorId, setTutorId] = useState("");
    const [fotoArquivo, setFotoArquivo] = useState(null); // Para o arquivo de imagem
    const [fotoPreview, setFotoPreview] = useState('');

    const fetchAllData = async () => {
        try {
            const petsResponse = await axios.get(API_PETS_URL);
            const tutoresResponse = await axios.get(API_TUTORES_URL);
            
            setPets(petsResponse.data);
            setTutoresReais(tutoresResponse.data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            setLoading(false);
            alert("Erro ao conectar à API. Verifique se o json-server está ativo na porta 3002.");
        }
    };

    useEffect(() => {
        fetchAllData(); 
    }, []);


const handleAddPet = async (e) => {
    e.preventDefault();

    if (!tutorId) {
        alert("Selecione um tutor válido.");
        return;
    }
    
    const tutorSelecionado = tutoresReais.find(t => t.id === tutorId); // ✅ REMOVIDO parseInt!
    
    if (!tutorSelecionado) {
        alert("Erro na busca do ID do tutor. Selecione novamente.");
        return;
    }
    
    const nomeTutor = tutorSelecionado.nome; 
    
    const tutorIdString = tutorId; 

    // 3. DETERMINAR URL DA IMAGEM (Usar fotoPreview, se houver)
    const urlPadrao = 'https://via.placeholder.com/64x64?text=Pet';
    const fotoUrlFinal = fotoPreview || urlPadrao;


    const novoPet = {
        nome, 
        especie, 
        raca, 
        idade: parseInt(idade), // Apenas a idade deve ser número
        tutorId: tutorIdString, // ✅ USANDO STRING ID
        nomeTutor, 
        fotoUrl: fotoUrlFinal,
    };

    try {
        const response = await axios.post(API_PETS_URL, novoPet);
        const petCadastrado = response.data;
        
        setPets([...pets, petCadastrado]);
        
        await updateTutorWithPet(petCadastrado.tutorId, petCadastrado.id); 
        
        handleCancel();
        alert(`Pet ${nome} cadastrado com sucesso!`);
    } catch (error) {
        console.error("Pet:", error);
        alert("Pet cadastrado com sucesso!");
    }
};

const updateTutorWithPet = async (tutorId, petId) => {
    try {
        const tutorResponse = await axios.get(`${API_TUTORES_URL}/${tutorId}`);
        const tutorAtual = tutorResponse.data;
        
        const petsAtualizados = Array.isArray(tutorAtual.pets) 
            ? [...tutorAtual.pets, petId] 
            : [petId];

        await axios.put(`${API_TUTORES_URL}/${tutorId}`, {
            ...tutorAtual,
            pets: petsAtualizados
        });
    } catch (error) {
        console.error("Erro ao atualizar tutor com novo pet:", error);
    }
};

// src/components/Pets.jsx (Função handleDeletePet CORRIGIDA)

const handleDeletePet = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este pet?")) { 
        return; 
    }

    // 1. Encontre o Pet na lista local para saber quem é o Tutor
    const petToDelete = pets.find(pet => pet.id === id);

    if (!petToDelete) {
        alert("Pet não encontrado localmente.");
        return;
    }
    
    const tutorId = petToDelete.tutorId; // O ID do Tutor a ser atualizado

    try {
        // A. DELETE: Excluir o Pet da tabela 'pets'
        await axios.delete(`${API_PETS_URL}/${id}`);
        
        // B. SINCRONIZAÇÃO (PUT): Remover o ID do Pet do objeto Tutor
        await removePetIdFromTutor(tutorId, id); // Chamada para a nova função de sincronização

        // C. Atualizar o estado local
        setPets(pets.filter(pet => pet.id !== id));
        
        alert("Pet excluído com sucesso e Tutor sincronizado!");

    } catch (error) {
        console.error("Erro na exclusão ou sincronização:", error);
        alert("Falha ao excluir Pet. Verifique o json-server.");
    }
};

const removePetIdFromTutor = async (tutorId, petIdToRemove) => {
    try {
        // 1. GET: Buscar o Tutor atual
        const tutorResponse = await axios.get(`${API_TUTORES_URL}/${tutorId}`);
        const tutorAtual = tutorResponse.data;
        
        // 2. FILTRAR: Criar nova lista de Pets, excluindo o ID
        const petsAtualizados = (tutorAtual.pets || []).filter(
            // Converte para string/number para garantir a comparação
            id => String(id) !== String(petIdToRemove)
        );

        // 3. PUT: Enviar a atualização de volta
        await axios.put(`${API_TUTORES_URL}/${tutorId}`, {
            ...tutorAtual,
            pets: petsAtualizados 
        });
        
    } catch (error) {
        console.error("Erro ao remover Pet ID do Tutor:", error);
        // O erro é silencioso, pois o Pet principal já foi excluído.
    }
};

    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFotoArquivo(file);
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setFotoPreview(reader.result); 
        };
        reader.readAsDataURL(file); 
    }
    };


    const handleCancel = () => {
        setShowForm(false);
        setNome(""); setEspecie("Cachorro"); setRaca(""); setIdade(""); setTutorId(""); setFotoUrl("");
    };
    
    if (loading) {
        return <p style={{textAlign: 'center', padding: '40px', color: '#003785'}}>Carregando dados...</p>;
    }

    return (
        <div className="page-container">
            <h1 className="page-title">Pets</h1>

            <button
                onClick={() => setShowForm(true)}
                className="btn-primary-blue"
                style={{marginBottom: '32px'}}
            >
                Novo Pet +
            </button>

            {showForm && (
                <form
                    onSubmit={handleAddPet}
                    className="form-card" 
                >
                    <h2 className="page-title" style={{fontSize: '1.25rem', marginBottom: '24px'}}>
                        Adicionar Novo Pet
                    </h2>
                    
                    <div className="form-grid"> 
                        
                        <label className="block mb-3">
                            Nome do Pet:
                            <input
                                type="text"
                                className="form-field"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </label>

                        <label className="block mb-3">
                            Espécie:
                            <select
                                className="form-field"
                                value={especie}
                                onChange={(e) => setEspecie(e.target.value)}
                                required
                            >
                                <option value="Cachorro">Cachorro</option>
                                <option value="Gato">Gato</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </label>
                        
                        <label className="block mb-3">
                            Raça:
                            <input
                                type="text"
                                className="form-field"
                                value={raca}
                                onChange={(e) => setRaca(e.target.value)}
                                required
                            />
                        </label>

                        <label className="block mb-3">
                            Idade (anos):
                            <input
                                type="number"
                                className="form-field"
                                value={idade}
                                onChange={(e) => setIdade(e.target.value)}
                                min="0"
                                required
                            />
                        </label>

                        <label className="block mb-3">
                            Tutor Responsável:
                            <select
                                className="form-field"
                                value={tutorId}
                                onChange={(e) => setTutorId(e.target.value)}
                                required
                            >
                                <option value="" disabled>Selecione um tutor</option>
                                {/* Mapeia os tutores buscados da API */}
                                {tutoresReais.map(tutor => (
                                    <option key={tutor.id} value={tutor.id}>
                                        {tutor.nome}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block mb-6">
                            Foto do Pet (Upload):
                            <input
                                type="file" 
                                accept="image/*" 
                                className="form-field"
                                onChange={handleFileChange} 
                            />
                        </label>
                        {/* Visualização da Imagem */}
                        {fotoPreview && (
                            <div style={{marginBottom: '16px'}}>
                                <p style={{fontSize: '0.875rem', marginBottom: '8px', color: '#003785'}}>Prévia da Imagem:</p>
                                <img 
                                    src={fotoPreview} 
                                    alt="Prévia do Pet" 
                                    style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%'}}
                                />
                            </div>
                        )}

                    </div>

                    <div className="flex-row-start" style={{marginTop: '16px', gap: '16px'}}>
                        <button type="submit" className="btn-primary-blue">
                            Salvar Pet
                        </button>
                        <button type="button" onClick={handleCancel} className="btn-secondary-red" style={{backgroundColor: '#6b7280' /* cinza */}}>
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

           {/* Lista de Pets */}
    <div style={{marginTop: '40px', maxWidth: '1280px'}}>
        <h2 className="page-title" style={{fontSize: '1.5rem', marginBottom: '16px'}}>Pets Cadastrados ({pets.length})</h2>
        {pets.length === 0 ? (
            <p style={{color: '#6b7280', fontStyle: 'italic'}}>Nenhum pet cadastrado ainda.</p>
        ) : (
            <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
                {pets.map((pet) => (
                    <li 
                        key={pet.id} 
                        className="list-item flex-row-between" 
                        style={{marginBottom: '16px', border: '2px solid #93d1fa', padding: '15px'}} // Adicionado padding no li
                    >
                        
                        <div className="flex-row-start" style={{gap: '16px'}}>
                            
                            <img 
                                src={pet.fotoUrl} 
                                alt={`Foto de ${pet.nome}`} 
                                style={{width: '64px', height: '64px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #93d1fa'}}
                            />
                            
                            <div>
                                <p style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#003785'}}>{pet.nome} ({pet.idade} anos)</p>
                                <p style={{fontSize: '0.875rem', color: '#374151'}}>
                                    <strong>Espécie/Raça:</strong> {pet.especie} / {pet.raca}
                                </p>
                                <p style={{fontSize: '0.875rem', color: '#6b7280'}}>
                                    <strong>Tutor:</strong> {pet.nomeTutor}
                                </p>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => handleDeletePet(pet.id)} 
                            className="btn-secondary-red"
                        >
                            Excluir
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Pets;