import React, { useEffect, useState } from "react";
import { getResources, deleteResource } from "../api/backendApi";

export default function ResourceList() {
  const [resources, setResources] = useState([]);

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

  return (
    <div>
      <h2>Resource List</h2>
      <ul>
        {resources.map((res) => (
          <li key={res.id}>
            {res.name} 
            <button onClick={() => handleDelete(res.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
