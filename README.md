# 💸 Aplicació de Despeses per Projectes

Aquesta aplicació permet gestionar **projectes compartits amb despeses associades** entre diversos usuaris. Els usuaris poden **registrar-se i autenticar-se mitjançant Firebase**, crear projectes, afegir participants i repartir despeses de manera clara i senzilla.

---

## 🔐 Autenticació

L'aplicació utilitza **Firebase Authentication** per gestionar els usuaris:
- Registre d'usuari
- Inici de sessió
- Tancament de sessió
- Accés protegit a les pàgines internes

---

## 🧩 Funcionalitats principals

### ✅ Projectes
- Creació de projectes amb un **nom** i selecció de **participants** (usuaris de la base de dades).
- Cada projecte és visible només per als **participants**.
- Edició del projecte: canvi de nom i gestió de participants.
- Eliminació del projecte (amb confirmació).

### ✅ Despeses
- A cada projecte es poden afegir despeses amb:
  - **Concepte** (descripció)
  - **Quantia**
  - **Pagat per** (usuari responsable del pagament)
  - **Dividir entre** (checkbox amb usuaris participants)
- Càlcul automàtic de la part proporcional per cada participant.
- Possibilitat d’**editar o eliminar despeses**.

### ✅ Usuaris
- Visualització en taula dels usuaris registrats.
- Possibilitat d'eliminar usuaris (opcionalment amb control d'administrador).
- A cada projecte, només es poden seleccionar com a participants usuaris ja registrats.

---

## 🔧 Estructura tècnica

- **React** per la interfície d'usuari.
- **React Router** per la navegació entre pàgines.
- **Firebase** (Firestore i Auth) com a backend.
- Estils personalitzats + Bootstrap (si escau).
- Components modulars: `NavBar`, `Footer`, `DespesaForm`, `TaulaUsuaris`, etc.

---

## 🚀 Instal·lació

```bash
git clone https://github.com/CarlesCanals/app-despeses.git
cd app-despeses
npm install
