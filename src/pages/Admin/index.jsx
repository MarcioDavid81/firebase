/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import './admin.css';
import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'

export default function Admin() {

  const [tarefa, setTarefa] = useState('');

  const [user, setUser] = useState({});

  const [tarefas, setTarefas] = useState([]);

  const [edit, setEdit] = useState({});

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));

      if (userDetail){
        const data = JSON.parse(userDetail);
        const tarefaRef = collection(db, 'tarefas');
        const q = query(tarefaRef, where('userUid', '==', data?.uid), orderBy('created', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })
          setTarefas(lista);
        })

      }


    }
    loadTarefas();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    if(tarefa.trim() === '') {
      toast.warn('Digite uma tarefa para continuar!');
      return;
    }

    if(edit?.id) {
      handleUpdateTarefa();
      return;
    }

    await addDoc(collection(db, 'tarefas'), {
      tarefa: tarefa,
      created: new Date(),
      userUid: user?.uid
    })
    .then(() => {
      toast.success('Tarefa adicionada com sucesso!');
      setTarefa('');
    })
    .catch((error) => {
      toast.error('Error adding document: ' + error);
    })
  }

  async function handleLogout() {
    await signOut(auth);
    toast.info('Deslogado com sucesso!');
  }

  async function deleteTarefa(id) {
    const docRef = doc(db, 'tarefas', id);
    await deleteDoc(docRef);
    toast.success('Parabéns, tarefa concluída com sucesso!')
  }

  async function editTarefa(item) {
    setTarefa(item.tarefa);
    setEdit(item);
  }

  async function handleUpdateTarefa() {
    const docRef = doc(db, 'tarefas', edit?.id);
    await updateDoc(docRef, {
      tarefa: tarefa
    })
    .then(() => {
      toast.success('Tarefa atualizada com sucesso!');
      setTarefa('');
      setEdit({});
    })
    .catch((error) => {
      toast.error('Error updating document: ' + error);
      setTarefa('');
      setEdit({});
    })
  }

  return (
    <div className="admin_container">

      <img src="./clock.webp" alt="Logo Poupa Tempo App" />

      <h1>MINHAS TAREFAS</h1>

      <form className='form' onSubmit={handleRegister}>
        <textarea  
          placeholder="Digite sua tarefa aqui"
          cols="30"
          rows="10"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
        />
        {Object.keys(edit).length > 0 ? (
          <button className='btn_register' style={{backgroundColor: 'tomato'}} type='submit'>Editar</button>
        ) : (
          <button className='btn_register' type='submit'>Adicionar</button>
        )}
      </form>

      {tarefas.map((item) => (
        <article key={item.id} className='list'>
          <p>{item.tarefa}</p>
          <div>
            <button onClick={ () => editTarefa(item)} className='btn_edit'>Editar</button>
            <button onClick={ () => deleteTarefa(item.id) } className='btn_delete'>Concluir</button>
          </div>
        </article>
      ))}

      <button className='btn_logout' onClick={handleLogout}>Lougout</button>

    </div>
  );
}