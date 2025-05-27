// src/pages/MeusProjectesPage.js

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function MeusProjectesPage() {
    const { currentUser } = useAuth();
    const [projectes, setProjectes] = useState([]);

    useEffect(() => {
        const carregarProjectes = async () => {
        const q = query(
            collection(db, 'projects'),
            where('participants', 'array-contains', currentUser.uid)
        );
        const snapshot = await getDocs(q);
        setProjectes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        carregarProjectes();
    }, [currentUser]);

    return (
        <div>
        <h1>Els meus projectes</h1>
        {projectes.length === 0 ? (
            <p>No tens cap projecte.</p>
        ) : (
            <ul>
            {projectes.map((p) => (
                <li key={p.id}>
                <Link to={`/projecte/${p.id}`}>{p.nom}</Link>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}
