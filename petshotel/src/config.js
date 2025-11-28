
export const BIN_ID = '692a055bae596e708f772186'; 


export const API_BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;


export const MASTER_KEY = import.meta.env.VITE_MASTER_KEY;

export const API_HEADERS = {
    'X-Master-Key': MASTER_KEY,
    'Content-Type': 'application/json'
};
