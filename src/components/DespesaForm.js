import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/firebase';
import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    updateDoc,
    } from 'firebase/firestore';

    export default function DespesaForm({ projectId, participants, onSaved }) {
    const { currentUser } = useAuth();

    const [fields, set] = useState({
        concepte: '',
        quantia: '',
        pagatPer: '',
        divideix: [],
    });

    const [totsSeleccionats, setTotsSeleccionats] = useState(true);

    // Inicialitza el formulari
    useEffect(() => {
        set({
        concepte: '',
        quantia: '',
        pagatPer: currentUser.uid,
        divideix: participants.map(p => p.uid),
        });

        // Calculate and log the amount each participant has to pay
        if (participants.length > 0) {
            const amountPerParticipant = parseFloat(fields.quantia || 0) / participants.length;
            console.log('Quantitat per participant:', amountPerParticipant.toFixed(2));
        }
        setTotsSeleccionats(true);
    }, [currentUser, participants]);

    const handleChange = (e) =>
        set(f => ({ ...f, [e.target.name]: e.target.value }));

    const toggle = (uid) =>
        set(f => ({
        ...f,
        divideix: f.divideix.includes(uid)
            ? f.divideix.filter(x => x !== uid)
            : [...f.divideix, uid],
        }));

    const toggleTots = () => {
        set(f => ({
        ...f,
        divideix: totsSeleccionats ? [] : participants.map(p => p.uid),
        }));
        setTotsSeleccionats(!totsSeleccionats);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, 'projects', projectId, 'despeses'), {
        ...fields,
        quantia: parseFloat(fields.quantia),
        createdAt: serverTimestamp(),
        });

        await updateDoc(doc(db, 'projects', projectId), {
        participants: Array.from(
            new Set([...participants.map(p => p.uid), currentUser.uid])
        ),
        });

        onSaved();
};

return (
    <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label className="form-label">
                Concepte
                <input
                    className="form-control"
                    name="concepte"
                    value={fields.concepte}
                    onChange={handleChange}
                    required
                />
            </label>
        </div>

        <div className="form-group">
            <label className="form-label">
                Quantia
                <input
                    className="form-control"
                    name="quantia"
                    type="number"
                    value={fields.quantia}
                    onChange={handleChange}
                    required
                />
            </label>
        </div>

        <div className="form-group">
            <label className="form-label">
                Pagat per
                <select
                    className="form-control"
                    name="pagatPer"
                    value={fields.pagatPer}
                    onChange={handleChange}
                    required
                >
                    {participants.map(p => (
                        <option key={p.uid} value={p.uid}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </label>
        </div>

        <fieldset className="form-group">
            <legend className="form-label">Dividir entre</legend>
            <button
                type="button"
                className="btn-primary"
                onClick={toggleTots}
                style={{ marginBottom: '0.5rem' }}
            >
                {totsSeleccionats ? 'Deselecciona tots' : 'Selecciona tots'}
            </button>
            {participants.map(p => (
                <label key={p.uid} className="form-label" style={{ display: 'block' }}>
                    <input
                        className="input-field"
                        type="checkbox"
                        checked={fields.divideix.includes(p.uid)}
                        onChange={() => toggle(p.uid)}
                    />
                    {p.name}
                </label>
            ))}
        </fieldset>

        <button className="submit-button" type="submit">
            Desar
        </button>
    </form>
);
}
