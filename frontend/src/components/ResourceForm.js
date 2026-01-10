import React, { useState } from "react";
import { createResource } from "../api/backend";

export default function ResourceForm({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await createResource({ name, email });
    setName("");
    setEmail("");
    onAdd(); // Refresh list
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        placeholder="Student Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        value={email}
        placeholder="Student Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add Student</button>
    </form>
  );
}
