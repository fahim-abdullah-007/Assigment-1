import React, { useState } from "react";
import { createResource } from "../api/backendApi";

export default function ResourceForm({ onAdd }) {
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await createResource({ name });
    setName("");
    onAdd(); // Refresh list
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        placeholder="Resource Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Resource</button>
    </form>
  );
}
