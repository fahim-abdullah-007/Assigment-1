import React, { useEffect, useState } from "react";
import { getResources, deleteResource, updateResource } from "../api/backend";

export default function ResourceList() {
  const [resources, setResources] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getResources();
    setResources(data);
  }

  async function handleDelete(id) {
    await deleteResource(id);
    fetchData();
  }

  function startEdit(res) {
    setEditingId(res.id);
    setEditName(res.name || "");
    setEditEmail(res.email || "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
  }

  async function saveEdit() {
    if (!editingId) return;
    await updateResource(editingId, { name: editName, email: editEmail });
    cancelEdit();
    fetchData();
  }

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {resources.map((res) => (
          <li key={res.id}>
            {editingId === res.id ? (
              <span>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Student Name"
                  required
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="Student Email"
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </span>
            ) : (
              <span>
                {res.name} {res.email ? `(${res.email})` : ""}
                <button onClick={() => startEdit(res)}>Edit</button>
                <button onClick={() => handleDelete(res.id)}>Delete</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
