import React, { useState, useEffect } from "react";

function ItemForm({ selectedItem, onSave, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setDescription(selectedItem.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [selectedItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, description, id: selectedItem?.id });
  };

  return (
    <div>
      <h2>{selectedItem ? "Edit Item" : "Add Item"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
