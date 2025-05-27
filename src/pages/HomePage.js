import TaulaUsuaris from '../components/TaulaUsuaris';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function HomePage() {

    const { currentUser } = useAuth();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
        const snap = await getDocs(collection(db, 'projects'));
        const arr = [];
        for (let docSnap of snap.docs) {
            const data = docSnap.data();
            arr.push({ id: docSnap.id, ...data });
        }
        setProjects(arr);
        }
        fetchProjects();
    }, []);

    return (
        <div>
        <center><h1>Benvinguts a la pàgina d'inici</h1>
        <p>Només els usuaris autenticats poden veure'n el contingut.</p>
        </center>
        <hr></hr>
        <TaulaUsuaris />
        <hr></hr>
        <h1>Els meus projectes</h1>
      <table>
        <thead><tr><th>Nom projecte</th><th>Despeses</th><th>Accions</th></tr></thead>
        <tbody>
          {projects.map(p=>
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{(p.expenses||[]).map(e=><div key={e.id}>{e.concepte} - {e.quantia}€</div> )}</td>
              <td><Link to={`/crear-despesa/${p.id}`}>Afegir despesa</Link></td>
            </tr>
          )}
        </tbody>
      </table>
            </div>
        );
}