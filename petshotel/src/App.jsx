
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; 

// Importar os componentes de página
import Hero from "./components/Login/sections/Hero";
import Tutores from "./components/Login/sections/Tutores";
import Pets from "./components/Login/sections/Pets";

// Importar os componentes de Auth e Rotas
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import PrivateRoute from "./routes/PrivateRoute";

// Componente temporário de redirecionamento (Página inicial)
const DashboardRedirect = () => <Navigate to="/home" replace />;


const App = () => {
  const { loading } = useAuth(); 

  
  if (loading) {
  }

  return (
    // REMOVIDO: <BrowserRouter> e o Loader condicional.
    <div className="App">
      <Routes>
        {/* ROTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* ROTAS PROTEGIDAS (Usando PrivateRoute para envolver as páginas) */}
        <Route path="/home" element={<PrivateRoute><Hero /></PrivateRoute>} />
        <Route path="/tutores" element={<PrivateRoute><Tutores /></PrivateRoute>} />
        <Route path="/pets" element={<PrivateRoute><Pets /></PrivateRoute>} />

        {/* Rota Raiz: Redireciona para a Home Protegida */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Rota para lidar com caminhos não encontrados (404) */}
        <Route path="*" element={<Navigate to="/home" replace />} /> 
      </Routes>
    </div>
  );
};

export default App;
