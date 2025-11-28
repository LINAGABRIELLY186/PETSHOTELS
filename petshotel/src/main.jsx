
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './App.css';
import './Geral.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter deve envolver tudo */}
    <BrowserRouter> 
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)