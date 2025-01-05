import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function RegisterPage() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const { singup, isAuthenticated, errors: registerErrors } = useAuth(); // Aquí se obtiene la función singup del contexto AuthContext.
    const navigate = useNavigate(); // Obtén la función navigate del hook

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated]);

    const handleOnSubmit = handleSubmit (async (values) => { // Aquí se define la función handleOnSubmit que recibe los valores del formulario.
        singup(values); // Aquí se llama a la función singup del contexto AuthContext y se le pasa el objeto values.
    });

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            {
                registerErrors.map((error, i) => ( // Aquí se recorren los errores y se muestran en pantalla.
                    <div className="bg-red-500 p-2 text-white" key={i}> {/* Aquí se muestra el error en pantalla.  */}
                        {error}
                    </div>
                ))
            }
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Usuario"
                    {...register('username',{ required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                {errors.username && <p className="text-red-500">Username is required</p>}

                <input
                    type="email"
                    placeholder="Correo"
                    {...register('email',{ required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                {errors.email && <p className="text-red-500">Email is required</p>}

                <input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                {errors.password && <p className="text-red-500">Password is required</p>}

                <Button type="primary" htmlType="submit">Register</Button>
            </form>

            <p className="flex gap-x-2 justify-between">
                ¿Ya tienes una cuenta? {" "} <Link to="/login"
                className="text-sky-500">Login</Link>
            </p>
        </div>
    )
}

export default RegisterPage
