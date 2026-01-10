const BASE_URL = "http://localhost:8080"; // Spring Boot backend

export async function getResources() {
  const response = await fetch(`${BASE_URL}/resources`);
  return response.json();
}

export async function createResource(data) {
  const response = await fetch(`${BASE_URL}/resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteResource(id) {
  await fetch(`${BASE_URL}/resources/${id}`, {
    method: "DELETE",
  });
}
