import { useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

export default function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        if (email !== '' && password !== '') {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin', { replace: true });
                    toast.success('Login efetuado com sucesso!');
                })
                .catch(() => {
                    toast.alert('Email ou senha incorretos!');
                    setEmail('');
                    setPassword('');
                });
        } else {
            toast.warn('Preencha todos os campos!');
        }

        
    }

    return (
        <div className='home_container'>

            <img src="./clock.webp" alt="Logo Poupa Tempo App" />

            <h1>LOGIN</h1>
            <span>Gerencie o seu tempo de forma fácil e eficaz!</span>

            <form className='form' onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder='Digite seu email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='******'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type='submit'>Entrar</button>
            </form>

            <Link className='button_link' to='/register'>Ainda não tem uma conta? Cadastre-se</Link>

        </div>
    );
}