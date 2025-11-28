import { getFullData, updateFullData } from '../api/dataManager';
import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
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
  const register = async (userData) => {
        const fullData = await getFullData(); 

        // 1. Verifica se o e-mail já existe
        if (fullData.users.some(u => u.email === userData.email)) {
            throw new Error("Este e-mail já está cadastrado.");
        }

        // 2. Cria o novo usuário (ID gerado para o JSONbin)
        const newUser = { id: Date.now().toString(), ...userData, role: 'tutor' };
        fullData.users.push(newUser);

        // 3. Salva o Bin completo de volta
        const success = await updateFullData(fullData);
        
        if (success) {
            dispatch({ type: 'LOGIN', payload: { user: newUser } });
            navigate('/home'); 
            return true;
        } else {
            throw new Error('Falha ao salvar dados no servidor.');
        }
    };

  const login = async (email, password) => {
        const fullData = await getFullData(); // Busca todos os dados

        // 1. Filtra localmente o usuário (BUSCA JSONBIN.IO)
        const user = fullData.users.find(u => u.email === email && u.password === password); 

        if (!user) {
            throw new Error('E-mail ou senha inválidos.');
        }

        // 2. Login bem-sucedido
        dispatch({ type: 'LOGIN', payload: { user: user } });
        navigate('/home');
        return true;
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
