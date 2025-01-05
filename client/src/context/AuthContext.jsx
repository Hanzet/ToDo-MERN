import { createContext, useContext, useState, useEffect } from 'react';
import { registerRequest, loginRequest } from '../api/auth';

export const AuthContext = createContext(); // Aquí se crea el contexto AuthContext que actuará como un contenedor global para compartir datos relacionados con la autenticación.

export const useAuth = () => { // Aquí se define el hook useAuth que permite acceder a los valores del contexto.
    const context = useContext(AuthContext); // Aquí se obtienen los valores del contexto.
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context; // Aquí se retornan los valores del contexto.
}

export const AuthProvider = ({ children }) => { // Aquí se define el componente AuthProvider que envolverá a los componentes hijos y les proporcionará acceso al contexto.
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const singup = async (user) => { // Aquí se define la función singup que recibe un objeto user.
        try {
            const res = await registerRequest(user); // Aquí se hace la petición a la API para registrar un usuario.
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => { // Aquí se define la función login que recibe un objeto user.
        try {
            const res = await loginRequest(user); // Aquí se hace la petición a la API para iniciar sesión.
            console.log(res.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) { // Aquí se verifica si el error es un array.
                return setErrors(error.response.data); // Aquí se establecen los errores.
            }
            setErrors([error.response.data.message]); // Aquí se establecen los errores.
        }
    }

    useEffect(() => { // Aquí se define el efecto que se ejecutará cuando cambie el estado de errors.
        if ( errors.length > 0 ) { // Aquí se verifica si hay errores.
            const timer = setTimeout(() => { // Aquí se define un temporizador.
                setErrors([]); // Aquí se limpian los errores y elimina errors.
            }, 5000); // Aquí se define el tiempo en milisegundos.
            return () => clearTimeout(timer); // Aquí se limpia el temporizador.
        }
    }, [errors]); // Aquí se define la dependencia del efecto.

    return (
        <AuthContext.Provider // Aquí se envían los valores del contexto a los componentes hijos. (El componente AuthProvider envuelve a otros componentes ({children}) y les proporciona acceso al contexto.)
            value={{ // Aquí se definen los valores que se compartirán con los componentes hijos.
                singup, // Aquí se definen las funciones y los estados que se compartirán con los componentes hijos.
                signin, // Aquí se definen las funciones y los estados que se compartirán con los componentes hijos.
                user,
                isAuthenticated, // Aquí se definen las funciones y los estados que se compartirán con los componentes hijos.
                errors,
            }}
        >
            {children} {/* Aquí se envuelven los componentes hijos con el contexto. */}
        </AuthContext.Provider>
    )
};
