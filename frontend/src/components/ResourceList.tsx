import React, { useEffect, useState, ChangeEvent } from "react";
import { getResources, deleteResource, updateResource } from "../api/backend";
import { Student } from "../types/Student";

const ResourceList: React.FC = () => {
  const [resources, setResources] = useState<Student[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await getResources();
      setResources(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteResource(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const startEdit = (student: Student): void => {
    setEditingId(student.id);
    setEditName(student.name || "");
    setEditEmail(student.email || "");
  };

  const cancelEdit = (): void => {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
  };

  const saveEdit = async (): Promise<void> => {
    if (!editingId) return;
    
    try {
      await updateResource(editingId, { name: editName, email: editEmail });
      cancelEdit();
      fetchData();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleEditNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditName(e.target.value);
  };

  const handleEditEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditEmail(e.target.value);
  };

  if (isLoading) {
    return <div className="loading">Loading students...</div>;
  }

  return (
    <div className="resource-list">
      <h2>Student List</h2>
      {resources.length === 0 ? (
        <p className="no-data">No students found. Add one above!</p>
      ) : (
        <ul>
          {resources.map((student: Student) => (
            <li key={student.id} className="student-item">
              {editingId === student.id ? (
                <span className="edit-mode">
                  <input
                    type="text"
                    value={editName}
                    onChange={handleEditNameChange}
                    placeholder="Student Name"
                    required
                  />
                  <input
                    type="email"
                    value={editEmail}
                    onChange={handleEditEmailChange}
                    placeholder="Student Email"
                  />
                  <button onClick={saveEdit} className="save-btn">Save</button>
                  <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                </span>
              ) : (
                <span className="view-mode">
                  <span className="student-info">
                    {student.name} {student.email ? `(${student.email})` : ""}
                  </span>
                  <button onClick={() => startEdit(student)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(student.id)} className="delete-btn">Delete</button>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourceList;
