import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx'; 
import "./Login.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await register({ name, email, password });
        } catch (errorMsg) {
            alert(`Erro: ${errorMsg}`);
        }
    };

  return (
    <div className="container">
      <div className="flex justify-center items-center min-h-screen bg-[#f8f6f3]"> 
        <form onSubmit={handleSubmit}>
            <h1>Crie sua conta</h1>
            
            <div className='input-field'> 
                <input type="text" placeholder='Nome' 
                onChange={(e) => setName(e.target.value)} required />
                <FaUser className='Icon'/>
            </div>
            
            <div className='input-field'> 
                <input type="email" placeholder='E-mail' 
                onChange={(e) => setEmail(e.target.value)} required />
                <FaEnvelope className='Icon'/>
            </div>
            
            <div className='input-field'>
                <input type="password" placeholder='Senha'
                onChange={(e) => setPassword(e.target.value)} required />
                <FaLock className='Icon'/>
            </div>

            <button type="submit">Cadastrar</button>

            <div className="signup-link">
                <p>Já tem conta? <Link to="/login">Acesse agora</Link></p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Register;