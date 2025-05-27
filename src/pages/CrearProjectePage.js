// src/pages/CrearProjectePage.js

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function CrearProjectePage() {
    const { currentUser } = useAuth();
    const [nom, setNom] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const docRef = await addDoc(collection(db, 'projects'), {
        nom,
        creatPer: currentUser.uid,
        createdAt: serverTimestamp(),
        participants: [currentUser.uid],
        });

        navigate(`/projecte/${docRef.id}`);
    };

    return (
        <div>
        <h1>Crear Projecte</h1>
        <form onSubmit={handleSubmit}>
            <label>
            Nom del projecte:
            <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
            />
            </label>
            <button type="submit">Crear</button>
        </form>
        </div>
    );
}
