import React, { useState, FormEvent, ChangeEvent } from "react";
import { createResource } from "../api/backend";

// Props interface for ResourceForm component
interface ResourceFormProps {
  onAdd: () => void;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ onAdd }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createResource({ name, email });
      setName("");
      setEmail("");
      onAdd(); // Refresh list
    } catch (error) {
      console.error("Error creating student:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="resource-form">
      <input
        type="text"
        value={name}
        placeholder="Student Name"
        onChange={handleNameChange}
        required
        disabled={isSubmitting}
      />
      <input
        type="email"
        value={email}
        placeholder="Student Email"
        onChange={handleEmailChange}
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Student"}
      </button>
    </form>
  );
};

export default ResourceForm;
