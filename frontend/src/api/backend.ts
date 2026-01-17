import { Student, CreateStudentDTO, UpdateStudentDTO } from '../types/Student';

// Dynamically construct backend URL to work in Codespaces and local dev
const getBackendURL = (): string => {
  // Check if running in browser
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // GitHub Codespaces detection
    if (hostname.includes('.app.github.dev')) {
      // Replace any port pattern (-3000-, -3001-, -3002-, -3003-, -3004-) with -8081-
      const backendHost = hostname.replace(/-\d{4,5}\./, '-8081.');
      return `${window.location.protocol}//${backendHost}`;
    }
    
    // Gitpod detection
    if (hostname.includes('.gitpod.io')) {
      const backendHost = hostname.replace(/\d{4,5}-/, '8081-');
      return `${window.location.protocol}//${backendHost}`;
    }
  }
  
  // Local development fallback
  return "http://localhost:8081";
};

const BASE_URL: string = getBackendURL();

// Log the URL for debugging
console.log('Backend URL:', BASE_URL);

// GET all students
export async function getResources(): Promise<Student[]> {
  try {
    const response = await fetch(`${BASE_URL}/students`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}

// GET student by ID
export async function getResourceById(id: number): Promise<Student> {
  const response = await fetch(`${BASE_URL}/students/${id}`);
  return response.json();
}

// POST create new student
export async function createResource(data: CreateStudentDTO): Promise<Student> {
  try {
    const response = await fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
}

// DELETE student by ID
export async function deleteResource(id: number): Promise<void> {
  await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
  });
}

// PUT update entire student
export async function updateResource(id: number, data: CreateStudentDTO): Promise<Student> {
  const response = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

// PATCH partial update student
export async function patchResource(id: number, data: UpdateStudentDTO): Promise<Student> {
  const response = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
