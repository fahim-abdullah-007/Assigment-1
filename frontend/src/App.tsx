import React, { useState } from "react";
import ResourceList from "./components/ResourceList";
import ResourceForm from "./components/ResourceForm";
import "./App.css";

const App: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false);

  const refreshList = (): void => {
    setRefresh(!refresh);
  };

  return (
    <div className="app-container">
      <h1>Student Management System</h1>
      <ResourceForm onAdd={refreshList} />
      <ResourceList key={String(refresh)} />
    </div>
  );
};

export default App;
