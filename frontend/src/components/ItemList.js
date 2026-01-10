import React from "react";

function ItemList({ items, onEdit, onDelete }) {
  return (
    <div>
      <h2>Item List</h2>
      {items.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.description}
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
