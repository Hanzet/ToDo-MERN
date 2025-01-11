import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function ProtectedRoute() {
    const {user, isAuthenticated} = useAuth(); // Utiliza los métodos de useAuth, el user y el isAuthenticated del useState
    console.log(user, isAuthenticated)

    if(!isAuthenticated) return <Navigate to="/login" replace />; // Si no está autenticado, redirige a la página de login, replace para que no vuelva a la ruta anterior

    return <Outlet /> /* Outlet es un componente de react-router-dom que se utiliza para anidar rutas */
}

export default ProtectedRoute
