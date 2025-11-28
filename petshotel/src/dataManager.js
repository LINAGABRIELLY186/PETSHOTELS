import axios from 'axios';
import { API_BIN_URL, API_HEADERS } from '../config/api'; 

// 1. FUNÇÃO DE LEITURA (GET)
export const getFullData = async () => {
    try {
        const response = await axios.get(API_BIN_URL);
        // O JSONbin.io retorna os dados em 'data.record'
        return response.data.record; 
    } catch (error) {
        console.error("Erro ao carregar dados do Bin:", error);
        return { users: [], tutors: [], pets: [] };
    }
};

export const updateFullData = async (newFullData) => {
    try {
        await axios.put(API_BIN_URL, newFullData, { headers: API_HEADERS });
        return true;
    } catch (error) {
        console.error("Erro ao salvar dados no Bin:", error);
        return false;
    }
};
