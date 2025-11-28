import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx'; 
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    
    const { login } = useAuth(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await login(email, password); 
        } catch (errorMsg) {
            alert(`Erro: ${errorMsg}`);
        }
    };

  return (
    <div className="container">
      {/* Ocupa a tela inteira e centraliza o formulário */}
      <div className="flex justify-center items-center min-h-screen bg-[#f8f6f3]"> 
        <form onSubmit={handleSubmit}>
            <h1>Acesse ao PetsHotel</h1>
            <div className='input-field'> 
                <input 
                    type="email" 
                    placeholder='E-mail' 
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />
                <FaUser className='Icon'/>
                </div>
            <div className='input-field'>
                <input 
                    type="password" 
                    placeholder='Senha'
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                />
                </div>

                <div className='recall-forget'>
                    <label>
                        <input type="checkbox" />
                        Lembre de mim
                    </label>
                    <Link to="#">Esqueceu a senha?</Link> 
                </div>
                <button type="submit">Entrar</button>

                <div className="signup-link">
                    <p>Não tem conta? <Link to="/register">Cadastre-se</Link></p>
                </div>
        </form>
      </div>
    </div>
  )
}

export default Login