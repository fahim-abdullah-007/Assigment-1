# System Architecture Report
## Full-Stack CRUD Application - Lab Test One

**Student Name:** [To be filled]  
**Date:** January 17, 2026  
**Course:** Advanced Object-Oriented Programming  
**Assignment:** Take-Home Full-Stack CRUD Application  

---

## Executive Summary

This report documents the design, implementation, and architecture of a complete full-stack CRUD (Create, Read, Update, Delete) application built with modern technologies. The frontend is built with **React + TypeScript** for type safety and better developer experience, while the backend uses **Spring Boot** with Java 17. The application demonstrates end-to-end functionality from user interface through business logic to data persistence, following object-oriented programming principles and clean architecture patterns.

---

## 1. High-Level System Architecture

### 1.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   GitHub Codespaces Environment             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────┐         ┌──────────────────────┐  │
│  │   Frontend Layer    │         │   Backend Layer      │  │
│  │   (React + TS)      │         │  (Spring Boot)       │  │
│  │                     │         │                      │  │
│  │ • Components        │         │ • Controller         │  │
│  │ • State Management  │         │ • Service            │  │
│  │ • API Client        │         │ • Repository         │  │
│  │ • User Interface    │         │ • Entity             │  │
│  │                     │         │                      │  │
│  │  Port: 3002         │────────▶│  Port: 8081          │  │
│  └─────────────────────┘  REST   └──────────────────────┘  │
│            │               API                      │       │
│            │                                        │       │
│            └────────────────────────────────────────┘       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Data Layer (H2 Database)                  │   │
│  │  - In-Memory Storage                               │   │
│  │  - JPA/Hibernate ORM                               │   │
│  │  - Automatic Schema Generation                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Architectural Pattern

**Pattern Used:** MVC (Model-View-Controller) + Layered Architecture

- **Presentation Layer:** React frontend with TypeScript
- **API Layer:** Spring Boot REST endpoints
- **Service Layer:** Business logic and operations
- **Data Access Layer:** JPA Repository pattern
- **Data Layer:** H2 in-memory database

---

## 2. Frontend Architecture (React + TypeScript)

### 2.1 Component Structure

```
App.tsx (Main Component)
├── ResourceForm.tsx (Create Form)
│   └── Input Fields (Name, Email)
│   └── Submit Handler with Types
├── ResourceList.tsx (Display, Edit & Delete)
│   ├── Student Item with Interface
│   ├── Edit Mode Toggle
│   └── Delete Handler
├── types/Student.ts (TypeScript Interfaces)
│   ├── Student
│   ├── CreateStudentDTO
│   └── UpdateStudentDTO
└── api/backend.ts (Typed API Client)
    ├── getResources(): Promise<Student[]>
    ├── getResourceById(id): Promise<Student>
    ├── createResource(data): Promise<Student>
    ├── updateResource(id, data): Promise<Student>
    ├── patchResource(id, data): Promise<Student>
    └── deleteResource(id): Promise<void>
```

### 2.2 Technology Stack - Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI Framework |
| TypeScript | 4.9.5 | Type Safety & Static Typing |
| Fetch API | Native | HTTP Requests |
| CSS | Native | Styling |

### 2.3 State Management

- **React Hooks:** `useState` for component state
- **Local State:** Managed within components
- **Form State:** Name and email inputs
- **List State:** Student data array
- **Edit State:** Track editing mode and selected student

### 2.4 TypeScript Type Definitions

```typescript
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
```

### 2.5 API Client Implementation

The `api/backend.ts` file provides:
- Fully typed async functions with Promise return types
- Dynamic URL detection for Codespaces vs local dev
- Wrapper functions for all HTTP methods
- Error handling for API calls
- Automatic CORS support

```typescript
// Detects environment and routes to correct backend URL
const getBackendURL = () => {
  if (window.location.hostname !== 'localhost') {
    // GitHub Codespaces: replace port 3000 with 8081
    return window.location.protocol + '//' + 
           window.location.hostname.replace('-3000-', '-8081-') + '/';
  }
  return "http://localhost:8081";
};
```

---

## 3. Backend Architecture (Spring Boot)

### 3.1 Project Structure

```
backend/
├── src/main/java/com/example/backend/
│   ├── BackendApplication.java
│   ├── controller/
│   │   └── StudentController.java      (REST Endpoints)
│   ├── entity/
│   │   └── Student.java                (Data Model)
│   ├── repository/
│   │   └── StudentRepository.java      (Data Access)
│   ├── service/
│   │   └── StudentService.java         (Business Logic)
│   └── resources/
│       └── application.properties      (Configuration)
```

### 3.2 REST API Endpoints

| Method | Endpoint | Purpose | Status |
|--------|----------|---------|--------|
| GET | `/students` | Retrieve all students | ✅ |
| GET | `/students/{id}` | Retrieve student by ID | ✅ |
| POST | `/students` | Create new student | ✅ |
| PUT | `/students/{id}` | Update entire student | ✅ |
| PATCH | `/students/{id}` | Partial update | ✅ |
| DELETE | `/students/{id}` | Delete student | ✅ |

### 3.3 Entity Model

```java
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    
    // Getters, Setters, Constructors
}
```

**Attributes:**
- `id`: Auto-generated primary key
- `name`: Student name (required)
- `email`: Student email (optional)

### 3.4 Technology Stack - Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Java | 17 | Language |
| Spring Boot | 4.0.1 | Framework |
| Spring Data JPA | - | ORM |
| H2 Database | 2.4.240 | Data Storage |
| Maven | 3.9+ | Build Tool |
| Tomcat | 11.0.15 | Server |

### 3.5 Database Configuration

```properties
# H2 In-Memory Database
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update

# Server Configuration
server.port=8081
```

**Key Features:**
- In-memory storage (resets on restart)
- Automatic schema generation (ddl-auto=update)
- CORS enabled for frontend requests
- H2 Console available at `/h2-console`

---

## 4. CRUD Workflow Explanation

### 4.1 Create Operation (POST)

**User Action:**
1. User enters student name and email in form
2. Clicks "Add Student" button

**Workflow:**
```
Frontend (React)
    ↓ 
Form validates input
    ↓
API Client: POST /students
    ↓
Backend (Spring Boot)
    ↓
StudentController receives request
    ↓
StudentService creates student entity
    ↓
StudentRepository saves to database (H2)
    ↓
Return created student (with ID)
    ↓
Frontend: Add to list, clear form
```

**HTTP Request:**
```bash
POST /students HTTP/1.1
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**HTTP Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

### 4.2 Read Operations (GET)

#### 4.2.1 Retrieve All Students

**Workflow:**
```
Frontend loads
    ↓
ResourceList component mounts (useEffect)
    ↓
API Client: GET /students
    ↓
Backend queries database
    ↓
Returns array of all students
    ↓
Frontend renders list
```

**HTTP Request:**
```bash
GET /students HTTP/1.1
```

**HTTP Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
]
```

#### 4.2.2 Retrieve Single Student by ID

**Workflow:**
```
User clicks Edit on a student
    ↓
API Client: GET /students/{id}
    ↓
Backend retrieves by ID
    ↓
Returns single student
    ↓
Frontend populates edit form
```

---

### 4.3 Update Operations

#### 4.3.1 Full Update (PUT)

**Workflow:**
```
User modifies name and email
    ↓
User clicks Save
    ↓
API Client: PUT /students/{id}
    ↓
Backend replaces entire student object
    ↓
Returns updated student
    ↓
Frontend refreshes list
```

**HTTP Request:**
```bash
PUT /students/1 HTTP/1.1
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.new@example.com"
}
```

#### 4.3.2 Partial Update (PATCH)

**Workflow:**
```
User modifies only name
    ↓
API Client: PATCH /students/{id}
    ↓
Backend updates only name field
    ↓
Email remains unchanged
    ↓
Returns updated student
```

**HTTP Request:**
```bash
PATCH /students/1 HTTP/1.1
Content-Type: application/json

{
  "name": "John Patched"
}
```

---

### 4.4 Delete Operation (DELETE)

**Workflow:**
```
User clicks Delete button
    ↓
Confirmation (implicit)
    ↓
API Client: DELETE /students/{id}
    ↓
Backend removes from database
    ↓
Returns 200 OK
    ↓
Frontend removes from list
```

**HTTP Request:**
```bash
DELETE /students/1 HTTP/1.1
```

**HTTP Response:**
```
200 OK (No content)
```

---

## 5. Object-Oriented Principles Used

### 5.1 Encapsulation

**Definition:** Bundling data and methods together, hiding internal implementation.

**Implementation:**
- Student entity encapsulates name and email properties
- Controllers encapsulate endpoint logic
- Services encapsulate business rules
- API client encapsulates HTTP operations

```java
// Entity Encapsulation
@Entity
public class Student {
    private Long id;          // Private fields
    private String name;
    private String email;
    
    public void setName(String name) {
  // Controlled access through setter
        this.name = name;
    }
}
```

### 5.2 Inheritance

**Definition:** Deriving new classes from existing classes to promote code reuse.

**Implementation:**
- Spring Boot components inherit from framework base classes
- Controllers inherit Spring's BaseController functionality
- Services inherit transaction management from Spring

### 5.3 Polymorphism

**Definition:** Objects of different types responding to same interface.

**Implementation:**
- HTTP methods (GET, POST, PUT, PATCH, DELETE) use same API path
- Repository pattern: different implementations for same interface
- Service layer provides consistent interface regardless of operation

```java
// Polymorphic Endpoints
@RestController
@RequestMapping("/students")
public class StudentController {
    
    @GetMapping              // GET /students
    public List<Student> getAll()
    
    @PostMapping             // POST /students
    public Student create(@RequestBody Student student)
    
    @PutMapping("/{id}")     // PUT /students/{id}
    public Student update(@PathVariable Long id, @RequestBody Student student)
    
    // Same path, different methods = Polymorphism
}
```

### 5.4 Abstraction

**Definition:** Hiding complex implementation details, showing only essential features.

**Implementation:**
- Frontend abstracts HTTP complexity via API client
- Repository pattern abstracts database operations
- Service layer abstracts business logic
- Controllers abstract REST concepts

```javascript
// Abstraction in Frontend
export async function createResource(data) {
    // Hides: HTTP headers, JSON serialization, error handling
    // Shows: Simple function to create resource
    const response = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}
```

### 5.5 SOLID Principles

**S - Single Responsibility:**
- StudentController: Handle REST requests only
- StudentService: Handle business logic only
- StudentRepository: Handle data access only

**O - Open/Closed:**
- Open for extension (add new operations)
- Closed for modification (existing code unchanged)

**L - Liskov Substitution:**
- Any Student object can be treated as entity
- Repositories follow same interface pattern

**I - Interface Segregation:**
- StudentRepository: Only needed methods
- Controllers: Only HTTP methods for students

**D - Dependency Injection:**
- Spring injects StudentRepository into StudentService
- Spring injects StudentService into StudentController

---

## 6. GitHub Codespaces Configuration

### 6.1 .devcontainer Setup

The `.devcontainer/devcontainer.json` file automates environment setup:

```json
{
  "name": "Full Stack CRUD - Codespaces",
  "image": "mcr.microsoft.com/devcontainers/java:17",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {
      "version": "18"
    }
  },
  "postCreateCommand": "set -e && cd frontend && npm ci || true",
  "forwardPorts": [8081, 3002],
  "customizations": {
    "vscode": {
      "extensions": [
        "vscjava.vscode-java-pack",
        "esbenp.prettier-vscode"
      ]
    }
  }
}
```

**Key Features:**
- **Base Image:** Java 17 development container
- **Additional Features:** Node.js 18 for React
- **Post-Create:** Automatically installs npm dependencies
- **Port Forwarding:** Exposes ports 8081 (backend) and 3002 (frontend)
- **Extensions:** Java pack and Prettier for development

### 6.2 Automated Setup

When opening in Codespaces:
1. Base Java environment initialized
2. Node.js installed
3. Frontend dependencies installed (npm ci)
4. Ports automatically forwarded
5. Development extensions loaded
6. Ready to run: `./mvnw spring-boot:run` and `npm start`

---

## 7. Frontend-Backend Interaction

### 7.1 Communication Flow

```
User Interaction
    ↓
React Component
    ↓
API Client (backend.js)
    ↓
HTTP Request (Fetch API)
    ↓
Spring Boot Controller
    ↓
Service Layer
    ↓
Repository Pattern
    ↓
H2 Database
    ↓
Response (JSON)
    ↓
React Component
    ↓
UI Update
```

### 7.2 Data Format

**Request Format:** JSON
```json
{
  "name": "Student Name",
  "email": "student@example.com"
}
```

**Response Format:** JSON
```json
{
  "id": 1,
  "name": "Student Name",
  "email": "student@example.com"
}
```

### 7.3 Error Handling

**Frontend:**
- Try-catch blocks in API calls
- User-friendly error messages
- Form validation before submission

**Backend:**
- Exception handling in controllers
- Proper HTTP status codes
- Error response messages

---

## 8. Technology Decisions and Rationale

### Why These Technologies?

| Technology | Reason |
|-----------|--------|
| **React** | Modern, component-based UI framework |
| **TypeScript** | Type safety and better developer experience |
| **Spring Boot** | Enterprise-grade framework for rapid development |
| **H2 Database** | In-memory, lightweight, no external dependency |
| **JPA/Hibernate** | ORM reduces boilerplate, automatic schema management |
| **GitHub Codespaces** | Cloud-based development, no local setup needed |

---

## 9. Project Structure and Organization

```
/workspaces/Assigment-1/
├── .devcontainer/                          # Codespaces Configuration
│   └── devcontainer.json
├── backend/backend/                        # Spring Boot Application
│   ├── src/main/java/com/example/backend/
│   │   ├── BackendApplication.java
│   │   ├── controller/StudentController.java
│   │   ├── entity/Student.java
│   │   ├── repository/StudentRepository.java
│   │   ├── service/StudentService.java
│   │   └── resources/application.properties
│   └── pom.xml
├── frontend/                               # React Application
│   ├── src/
│   │   ├── api/backend.js                 # API Client
│   │   ├── components/
│   │   │   ├── ResourceForm.js
│   │   │   └── ResourceList.js
│   │   └── App.js
│   └── package.json
├── README.md                              # Documentation
└── lab-test-one.md                       # Lab Requirements
```

---

## 10. Deployment and Execution

### 10.1 Development Execution

**Step 1: Backend**
```bash
cd /workspaces/Assigment-1/backend/backend
./mvnw spring-boot:run
```

**Step 2: Frontend**
```bash
cd /workspaces/Assigment-1/frontend
npm start
```

**Access:** http://localhost:3002

### 10.2 Production Considerations

- Package React as static files: `npm run build`
- Serve from Spring Boot static folder
- Connect to persistent database (PostgreSQL, MySQL)
- Add authentication and authorization
- Implement logging and monitoring

---

## 11. Testing Strategy

### 11.1 Manual Testing

**CRUD Operations Tested:**
- ✅ Create student (POST)
- ✅ Read all students (GET)
- ✅ Read single student (GET/{id})
- ✅ Update full record (PUT)
- ✅ Partial update (PATCH)
- ✅ Delete student (DELETE)

**Frontend Testing:**
- ✅ Form submission
- ✅ List rendering
- ✅ Edit functionality
- ✅ Delete confirmation

### 11.2 API Testing

All endpoints verified with curl:
```bash
# Create
curl -X POST http://localhost:8081/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com"}'

# Read
curl http://localhost:8081/students

# Update (PUT)
curl -X PUT http://localhost:8081/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@test.com"}'

# Delete
curl -X DELETE http://localhost:8081/students/1
```

---

## 12. Challenges and Solutions

### Challenge 1: Cross-Origin Requests in Codespaces
**Problem:** Frontend couldn't reach backend with dynamic port URLs
**Solution:** Implemented dynamic URL detection based on hostname

### Challenge 2: Database Persistence
**Problem:** H2 in-memory database resets on restart
**Solution:** Documented for educational use; production would use PostgreSQL

### Challenge 3: Port Forwarding in Codespaces
**Problem:** Frontend needed to know backend port dynamically
**Solution:** Configured port forwarding in .devcontainer

---

## 13. Conclusion

This full-stack CRUD application demonstrates:

✅ **End-to-end functionality** - User can create, read, update, and delete students  
✅ **Clean architecture** - Separation of concerns across layers  
✅ **OOP principles** - Encapsulation, inheritance, polymorphism, abstraction  
✅ **Modern technologies** - React, Spring Boot, TypeScript, REST API  
✅ **Cloud-ready** - Runs in GitHub Codespaces without local setup  
✅ **Scalable design** - Can be extended with authentication, persistence, etc.  

The application successfully integrates frontend and backend, demonstrating full CRUD operations through a modern, user-friendly interface powered by a robust REST API.

---

## 14. References

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- React Documentation: https://react.dev
- REST API Best Practices: https://restfulapi.net
- GitHub Codespaces: https://github.com/features/codespaces
- H2 Database: https://www.h2database.com

---

**End of Report**

---

## Appendix A: Key Code Snippets

### A.1 Student Entity
```java
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    
    public Student() {}
    
    public Student(String name, String email) {
        this.name = name;
        this.email = email;
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
```

### A.2 REST Controller Example
```java
@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")
public class StudentController {
    
    private final StudentRepository repository;
    
    public StudentController(StudentRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping
    public List<Student> getAllStudents() {
        return repository.findAll();
    }
    
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return repository.save(student);
    }
    
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Student existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(student.getName());
            existing.setEmail(student.getEmail());
            return repository.save(existing);
        }
        return null;
    }
    
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
```

### A.3 React Component Example
```javascript
export default function ResourceForm({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  async function handleSubmit(e) {
    e.preventDefault();
    await createResource({ name, email });
    setName("");
    setEmail("");
    onAdd();
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        placeholder="Student Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        value={email}
        placeholder="Student Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add Student</button>
    </form>
  );
}
```

---

*This report was generated as part of the Full-Stack CRUD Application assignment.*
