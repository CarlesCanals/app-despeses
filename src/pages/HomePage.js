import TaulaUsuaris from '../components/TaulaUsuaris';
import React, { useState, useEffect } from 'react';

import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function HomePage() {


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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <center><h1>Benvinguts a la pàgina d'inici</h1>
        <p>Només els usuaris autenticats poden veure'n el contingut.</p>
        </center>
        <hr></hr>
        <TaulaUsuaris />
        <hr></hr>
        <center><h1>Els meus projectes</h1></center>
            {projects.length === 0 ? (
                <p>No tens cap projecte.</p>
            ) : (
                <ul className="list-group" style={{ width: '90%' }}>
                    {projects.map((p) => (
                        <li key={p.id} className="list-group-item">
                            <Link to={`/projecte/${p.id}`}>{p.nom}</Link>
                        </li>
                    ))}
                </ul>
            )}
            </div>
        );
}


