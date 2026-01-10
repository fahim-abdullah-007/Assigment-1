// Dynamically construct backend URL to work in Codespaces and local dev
// In Codespaces, backend will be on same host but different port
const getBackendURL = () => {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // GitHub Codespaces: replace port 3000 with 8081
    return window.location.protocol + '//' + window.location.hostname.replace('-3000-', '-8081-') + '/';
  }
  // Local development
  return "http://localhost:8081";
};

const BASE_URL = getBackendURL();

export async function getResources() {
  const response = await fetch(`${BASE_URL}/students`);
  return response.json();
}

export async function createResource(data) {
  const response = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteResource(id) {
  await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
  });
}

export async function updateResource(id, data) {
  const response = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function patchResource(id, data) {
  const response = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
