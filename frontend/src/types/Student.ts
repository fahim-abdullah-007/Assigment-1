// Student entity type matching backend model
export interface Student {
  id: number;
  name: string;
  email: string;
}

// Type for creating a new student (no ID required)
export interface CreateStudentDTO {
  name: string;
  email: string;
}

// Type for updating a student (partial fields allowed)
export interface UpdateStudentDTO {
  name?: string;
  email?: string;
}
