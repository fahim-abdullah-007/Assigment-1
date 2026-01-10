import React, { useState } from "react";
import ResourceList from "./components/ResourceList";
import ResourceForm from "./components/ResourceForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  function refreshList() {
    setRefresh(!refresh);
  }

  return (
    <div>
      <h1>Assignment 1 Frontend</h1>
      <ResourceForm onAdd={refreshList} />
      <ResourceList key={refresh} />
    </div>
  );
}

export default App;
