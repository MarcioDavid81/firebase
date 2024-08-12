import { useState, useEffect } from 'react';
import './admin.css';
import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export default function Admin() {

  const [tarefa, setTarefa] = useState('');

  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));
    }
    loadTarefas();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    if(tarefa.trim() === '') {
      alert('A tarefa não pode ser vazia!');
      return;
    }
    await addDoc(collection(db, 'tarefas'), {
      tarefa: tarefa,
      created: new Date(),
      userUid: user?.uid
    })
    .then(() => {
      alert('Tarefa cadastrada com sucesso!');
      setTarefa('');
    })
    .catch((error) => {
      alert('Error adding document: ' + error);
    })
  }

  async function handleLogout() {
    await signOut(auth);
    alert('Deslogado com sucesso!');
  }

  return (
    <div className="admin_container">
      <h1>MINHAS TAREFAS</h1>

      <form className='form' onSubmit={handleRegister}>
        <textarea  
          placeholder="Digite sua tarefa aqui"
          cols="30"
          rows="10"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
        />
        <button className='btn_register' type='submit'>Adicionar</button>
      </form>

      <article className='list'>
        <h2>Título da tarefa</h2>
        <p>Descrição da tarefa</p>
        <div>
          <button className='btn_edit'>Editar</button>
          <button className='btn_delete'>Concluir</button>
        </div>
      </article>

      <button className='btn_logout' onClick={handleLogout}>Lougout</button>

    </div>
  );
}