import { createContext, useContext, useState, useEffect } from 'react';
import { registerRequest, loginRequest, verifyTokenRequets } from '../api/auth';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'; // Aquí se importa la librería js-cookie para trabajar con cookies con el front-end.

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
    const [loading, setLoading] = useState(true);

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
            setIsAuthenticated(true);
            setUser(res.data);
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

    useEffect(() => {
        // Definimos una función asíncrona para verificar el estado de autenticación
        async function checkLogin() {
            // Obtenemos todas las cookies disponibles usando la librería js-cookie
            const cookies = Cookies.get();
    
            // Si no existe la cookie 'token', asumimos que el usuario no está autenticado
            if (!cookies.token) {
                setIsAuthenticated(false); // Actualizamos el estado para indicar que no está autenticado
                setLoading(false);         // Indicamos que la verificación ha terminado
                return setUser(null);      // Eliminamos cualquier información de usuario almacenada
            }
    
            try {
                // Llamamos a la API para verificar si el token es válido
                const res = await verifyTokenRequets(cookies.token);
    
                // Si la respuesta de la API no es válida, asumimos que el usuario no está autenticado
                if (!res.data) {
                    setIsAuthenticated(false); // Actualizamos el estado para indicar que no está autenticado
                    setLoading(false);         // Indicamos que la verificación ha terminado
                    return;                    // Salimos de la función
                }
            } catch (error) {
                // Si ocurre un error durante la verificación (por ejemplo, problemas de red)
                console.log(error);            // Registramos el error en la consola
                setIsAuthenticated(false);     // Actualizamos el estado para indicar que no está autenticado
                setUser(null);                 // Eliminamos cualquier información de usuario almacenada
                setLoading(false);             // Indicamos que la verificación ha terminado
            }
        }
    
        // Llamamos a la función de verificación cuando el componente se monta
        checkLogin();
    }, []); // El array vacío asegura que este efecto solo se ejecute una vez    

    return (
        <AuthContext.Provider // Aquí se envían los valores del contexto a los componentes hijos. (El componente AuthProvider envuelve a otros componentes ({children}) y les proporciona acceso al contexto.)
            value={{ // Aquí se definen los valores que se compartirán con los componentes hijos.
                singup, // Aquí se definen las funciones y los estados que se compartirán con los componentes hijos.
                signin, // Aquí se definen las funciones y los estados que se compartirán con los componentes hijos.
                loading,
                user,
                isAuthenticated, // Aquí se definen las funciones y los estados que se compartirán con los componentes hijos.
                errors,
            }}
        >
            {children} {/* Aquí se envuelven los componentes hijos con el contexto. */}
        </AuthContext.Provider>
    )
};

// Validación de propiedades con PropTypes.
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // children debe ser un nodo de React y es requerido.
};
