import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const handleAdd = async () => {
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    const newUser = await res.json();
    setUsers([...users, newUser]);
    setName("");
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE"
    });
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} <button onClick={() => handleDelete(u.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <input
        placeholder="Nom de l'utilisateur"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Ajouter</button>
    </div>
  );
}

export default App;
