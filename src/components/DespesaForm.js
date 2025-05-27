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

    export default function DespesaForm({ projectId, participants, onSaved, initialData = null, editId = null }) {

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
    if (initialData) {
        set({
        concepte: initialData.concepte,
        quantia: initialData.quantia,
        pagatPer: initialData.pagatPer,
        divideix: initialData.divideix,
        });
        setTotsSeleccionats(initialData.divideix.length === participants.length);
    } else {
        set({
        concepte: '',
        quantia: '',
        pagatPer: currentUser.uid,
        divideix: participants.map(p => p.uid),
        });
        setTotsSeleccionats(true);
    }
    }, [initialData, currentUser, participants]);


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

        const data = {
            ...fields,
            quantia: parseFloat(fields.quantia),
            createdAt: serverTimestamp(),
        };

        if (editId) {
            const ref = doc(db, 'projects', projectId, 'despeses', editId);
            await updateDoc(ref, data);
        } else {
            await addDoc(collection(db, 'projects', projectId, 'despeses'), data);
        }

        await updateDoc(doc(db, 'projects', projectId), {
            participants: Array.from(new Set([...participants.map(p => p.uid), currentUser.uid])),
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
            {editId ? 'Actualitzar' : 'Desar'}
        </button>

    </form>
);
}
