import { useForm } from 'react-hook-form';
import { registerRequest } from '../api/auth';

function RegisterPage() {
    const { register, handleSubmit } = useForm();

    const handleOnSubmit = handleSubmit (async (values) => {
        const res = await registerRequest(values);
        console.log(res);
    });

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Usuario"
                    {...register('username',{ required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="email"
                    placeholder="Correo"
                    {...register('email',{ required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage
