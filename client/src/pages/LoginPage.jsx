import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: signinErrors } = useAuth(); // Aquí se obtiene la función signin del contexto AuthContext.

    const handleOnSubmit = handleSubmit((data) => {
        signin(data); // Aquí se llama a la función signin del contexto AuthContext y se le pasa el objeto data.
    })

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            {
                signinErrors.map((error, i) => ( // Aquí se recorren los errores y se muestran en pantalla.
                    <div className="bg-red-500 p-2 text-white text-center my-2" key={i}> {/* Aquí se muestra el error en pantalla.  */}
                        {error}
                    </div>
                ))
            }
                <h1 className="text-2xl text-white font-bold">Inicio de Sesión</h1>
                <form onSubmit={handleOnSubmit}>
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

                    <Button className="rounded-md" type="primary" htmlType="submit">Register</Button>
                </form>

                <p className="flex gap-x-2 justify-between">
                    ¿No tienes una cuenta? <Link to="/register"
                    className="text-sky-500">Sing up</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
