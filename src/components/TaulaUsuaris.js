import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import EliminarUsuari from './EliminarUsuari';
import './TaulaUsuaris.css';


const TaulaUsuaris = () => {
    const [usuaris, setUsuaris] = useState([]);
    const db = getFirestore();

    useEffect(() => {

        const fetchUsuaris = async () => {
            const usuarisCollection = collection(db, 'usuaris');
            const usuarisSnapshot = await getDocs(usuarisCollection);
            const usuarisList = usuarisSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsuaris(usuarisList);
        };

        fetchUsuaris();
    }, [db]);


    return (
        <table className="table table-striped table-hover table-bordered">
            <thead className="table-primary">
                <tr>
                    <th></th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Accions</th>
                </tr>
            </thead>
            <tbody>
                {usuaris.map((usuari) => (
                    <tr key={usuari.id}>
                        <td></td>
                        <td><b>{usuari.name}</b></td>
                        <td>{usuari.email}</td>
                        <td>
                            <EliminarUsuari
                                userId={usuari.id}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TaulaUsuaris;