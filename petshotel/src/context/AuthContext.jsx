// src/context/AuthContext.jsx

import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
// ✅ 1. Importar useNavigate
import { useNavigate } from 'react-router-dom'; 

const API_URL = 'http://localhost:3002/users'; 
const USER_STORAGE_KEY = 'petsHotelUser'; 

const initialState = {
  isAuthenticated: false,
  user: null, 
  loading: true, 
};

// --- Reducer ---
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'RESTORE_SESSION': 
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(action.payload.user)); 
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false, 
      };
    case 'LOGOUT':
      localStorage.removeItem(USER_STORAGE_KEY); 
      return {
        ...initialState,
        loading: false, 
      };
    case 'FINISH_LOADING':
        return {
            ...state,
            loading: false,
        };
    default:
      return state;
  }
};


export const AuthContext = createContext(initialState);


// --- Provider ---
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // ✅ 2. Declarar useNavigate dentro do componente
  const navigate = useNavigate(); 

  
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'RESTORE_SESSION', payload: { user } });
      } catch (e) {
        console.error("Erro ao parsear o usuário do localStorage:", e);
        localStorage.removeItem(USER_STORAGE_KEY);
        dispatch({ type: 'FINISH_LOADING' }); 
      }
    } else {
        dispatch({ type: 'FINISH_LOADING' }); 
    }
  }, []);

  // --- Funções de Autenticação ---
  
  const register = async (userData) => {
    try {
        // 1. Verificar se o e-mail já existe
        const checkUser = await axios.get(`${API_URL}?email=${userData.email}`);
        if (checkUser.data.length > 0) {
            throw new Error("Este e-mail já está cadastrado.");
        }

        // 2. Criar novo usuário
        const res = await axios.post(API_URL, { 
            ...userData, 
            role: 'tutor' 
        });
        
        // 3. Login
        dispatch({
            type: 'LOGIN',
            payload: { user: res.data },
            
        });
        // ✅ 3. Redirecionar após sucesso
        navigate('/home'); 
        return true;
    } catch (error) {
        throw error.message || 'Erro no Cadastro'; 
    }
  };

  const login = async (email, password) => {
    try {
        // 1. Buscar o usuário com email E senha (query do json-server)
        const res = await axios.get(`${API_URL}?email=${email}&password=${password}`);
        const user = res.data[0];

        if (!user) { // Se a busca não retornar usuário (length === 0)
            throw new Error('E-mail ou senha inválidos.');
        }

        // 2. Login
        dispatch({
            type: 'LOGIN',
            payload: { user: user },
        });
        // ✅ 4. Redirecionar após sucesso
        navigate('/home'); 
        return true;
    } catch (error) {
        throw error.message || 'Erro no Login';
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };


  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext); 
};