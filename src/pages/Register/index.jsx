import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        if (email !== '' && password !== '') {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/admin', { replace: true });
                    alert('Cadastro realizado com sucesso!');
                })
                .catch(() => {
                    alert('Email já cadastrado!');
        })
        } else {
            alert('Preencha todos os campos!');
        }

        
    }

    return (
        <div className='home_container'>

            <img src="./clock.webp" alt="Logo Poupa Tempo App" />

            <h1>REGISTRE-SE</h1>
            <span>Crie sua conta e comece a usar agora mesmo!</span>

            <form className='form' onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder='Digite seu email...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Crie uma senha...'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type='submit'>Cadastrar</button>
            </form>

            <Link className='button_link' to='/'>Já possui uma conta? Faça login</Link>

        </div>
    );
}