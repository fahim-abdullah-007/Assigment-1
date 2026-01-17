# Advanced OOP - Lab Tests

**Course:** Advanced Object-Oriented Programming  
**Repository:** Full-Stack CRUD Application with Java Collections  
**Status:** ✅ Lab Test One Complete | 🔄 Lab Test Two In Progress

---

## 📋 Lab Test One: Full-Stack CRUD Application (10 Marks) ✅

### Part 1: GitHub Codespaces Configuration ✅
- [x] Development environment configured
- [x] All tools installed (Java 17, Node.js, npm)
- [x] Ready to run frontend and backend

### Part 2: Backend - Spring Boot REST API ✅
- [x] GET /students (retrieve all)
- [x] GET /students/{id} (retrieve one by ID)
- [x] POST /students (create new)
- [x] PUT /students/{id} (update entire resource)
- [x] PATCH /students/{id} (partial update resource)
- [x] DELETE /students/{id} (delete resource)

### Part 3: Frontend - React Application ✅
- [x] User interface displaying resources
- [x] Form for creating resources
- [x] Form for updating resources
- [x] Delete functionality
- [x] Complete backend integration

---

## 📋 Lab Test Two: Java Collections (10 Marks) 🔄

### Task 1: Load Students from CSV
- [ ] Read students from CSV file (`lab-test-two/students.csv`)
- [ ] Store students in an `ArrayList`
- [ ] Ignore duplicate IDs using a `HashSet`

### Task 2: Sorting
- [ ] Implement `Comparable` to sort students by `id`
- [ ] Implement `Comparator` to sort students by `cgpa` (descending order)

### Task 3: Delete Using Iterator
- [ ] Remove a student by `id`
- [ ] Use `Iterator` for safe removal during iteration

### Task 4: REST API Exposure
- [ ] **GET** `/students` → Return all students
- [ ] **GET** `/students/sort/cgpa` → Return students sorted by CGPA (descending)

### Student Attributes for Lab Test Two
| Attribute | Type |
|-----------|------|
| id | int |
| name | String |
| cgpa | double |

---

## 🚀 Quick Start (30 seconds)

### Lab Test One - Full-Stack Application

#### Terminal 1 - Backend
```bash
cd /workspaces/Assigment-1/backend/backend
./mvnw spring-boot:run
```

### Terminal 2 - Frontend
```bash
cd /workspaces/Assigment-1/frontend
npm start
```

**Then open:** http://localhost:3002

---

## 📋 Quick Start (Copy & Paste)

### Terminal 1 - Start Backend
```bash
cd /workspaces/Assigment-1/backend/backend && ./mvnw spring-boot:run
```

### Terminal 2 - Start Frontend  
```bash
cd /workspaces/Assigment-1/frontend && npm start
```

Then open in browser: **http://localhost:3002**

---

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Running the Application](#running-the-application)
5. [API Endpoints & Examples](#api-endpoints--examples)
6. [Lab Test Two - Collections API](#lab-test-two---collections-api)
7. [Testing](#testing)
8. [Features](#features)
9. [Troubleshooting](#troubleshooting)
10. [Lab Requirements Checklist](#lab-requirements-checklist)

---

## 🎯 Project Overview

### What This Does
- Manages a list of students with name and email
- Create, read, update, and delete student records
- Real-time updates in the user interface
- RESTful API backend with Spring Boot
- Clean, responsive web interface with React + TypeScript

### Tech Stack
| Component | Technology |
|-----------|-----------|
| Frontend | React 18.2 |
| Backend | Spring Boot 4.0.1 |
| Frontend Lang | TypeScript 4.9 |
| Backend Lang | Java 17 |
| Database | H2 In-Memory |
| Build Tool | Maven |
| Package Manager | npm |

---

## 📦 Prerequisites

Verify you have these installed:

```bash
java -version    # Should show Java 17 or higher
node -v          # Should show Node 16 or higher
npm -v           # Should show npm 8 or higher
```

---

## 🚀 Installation & Setup

### Step 1: Install Frontend Dependencies
```bash
cd /workspaces/Assigment-1/frontend
npm install
```

### Step 2: You're Ready!
No additional setup needed. The backend uses Maven which handles its own dependencies.

---

## ▶️ Running the Application

### Recommended: Run in Separate Terminals

#### Terminal 1 - Backend (Spring Boot on port 8081)
```bash
cd /workspaces/Assigment-1/backend/backend
./mvnw spring-boot:run
```

**Wait for:** `Started BackendApplication in X.XXX seconds`

#### Terminal 2 - Frontend (React on port 3002)
```bash
cd /workspaces/Assigment-1/frontend
npm start
```

**Wait for:** `Compiled successfully!`

#### Open in Browser
Visit: **http://localhost:3002**

---

## 🔌 API Endpoints & Examples

### Base URL
```
http://localhost:8081
```

### 1. GET /students - List All Students
**Get all students:**
```bash
curl http://localhost:8081/students
```

**Response Example:**
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

---

### 2. GET /students/{id} - Get Single Student
**Get student with ID 1:**
```bash
curl http://localhost:8081/students/1
```

**Response Example:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

### 3. POST /students - Create New Student
**Add a new student:**
```bash
curl -X POST http://localhost:8081/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com"
  }'
```

**Response Example:**
```json
{
  "id": 3,
  "name": "Alice Johnson",
  "email": "alice@example.com"
}
```

---

### 4. PUT /students/{id} - Update Entire Student
**Update student with ID 1 (full replacement):**
```bash
curl -X PUT http://localhost:8081/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.new@example.com"
  }'
```

**Response Example:**
```json
{
  "id": 1,
  "name": "John Updated",
  "email": "john.new@example.com"
}
```

---

### 5. PATCH /students/{id} - Partial Update
**Update only the name (keep email unchanged):**
```bash
curl -X PATCH http://localhost:8081/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Patched"
  }'
```

**Response Example:**
```json
{
  "id": 1,
  "name": "John Patched",
  "email": "john.new@example.com"
}
```

---

### 6. DELETE /students/{id} - Delete Student
**Delete student with ID 1:**
```bash
curl -X DELETE http://localhost:8081/students/1
```

**Response:** HTTP 200 OK (Success, no content returned)

---

## 📊 Lab Test Two - Collections API

Lab Test Two extends the backend with Java Collections features. The following endpoints will be available once implemented:

### Sample CSV Data
Located at: `lab-test-two/students.csv`
```csv
id,name,cgpa
101,Arafat Rahman,3.75
102,Nusrat Jahan,3.90
103,Tanvir Hasan,3.40
104,Mehedi Ahmed,3.60
105,Sadia Islam,3.85
```

### Planned Endpoints

#### GET /students (from CSV)
Returns all students loaded from CSV with duplicates removed.

#### GET /students/sort/cgpa
Returns students sorted by CGPA in descending order.

```bash
# Test CGPA sorting (once implemented)
curl http://localhost:8081/students/sort/cgpa
```

### Implementation Notes
- Students are loaded from CSV into an `ArrayList`
- `HashSet` used to filter duplicate IDs
- `Comparable` interface for sorting by ID
- `Comparator` for sorting by CGPA (descending)
- `Iterator` for safe deletion during iteration

---

## ✅ Testing

### Quick Test - Run All CRUD Operations
```bash
#!/bin/bash

BASE_URL="http://localhost:8081"

echo "=== Testing Student API ==="

echo -e "\n✓ 1. GET all students"
curl -s $BASE_URL/students | jq '.'

echo -e "\n✓ 2. CREATE new student"
curl -s -X POST $BASE_URL/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Student","email":"test@example.com"}' | jq '.'

echo -e "\n✓ 3. GET all (verify creation)"
curl -s $BASE_URL/students | jq '.'

echo -e "\n✓ 4. UPDATE student (PUT)"
curl -s -X PUT $BASE_URL/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","email":"updated@example.com"}' | jq '.'

echo -e "\n✓ 5. PARTIAL UPDATE (PATCH)"
curl -s -X PATCH $BASE_URL/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Patched Name"}' | jq '.'

echo -e "\n✓ 6. DELETE student"
curl -s -X DELETE $BASE_URL/students/1

echo -e "\n=== All Tests Completed ==="
```

### Manual UI Testing Checklist

1. **Test Create:**
   - [ ] Open http://localhost:3002
   - [ ] Enter name: "Test User"
   - [ ] Enter email: "test@example.com"
   - [ ] Click "Add Student"
   - [ ] Verify appears in list

2. **Test Read:**
   - [ ] Verify all students display with name and email
   - [ ] List updates in real-time

3. **Test Update:**
   - [ ] Click "Edit" on any student
   - [ ] Modify name or email
   - [ ] Click "Save"
   - [ ] Verify changes appear immediately

4. **Test Delete:**
   - [ ] Click "Delete" on any student
   - [ ] Verify student disappears from list

---

## 🎨 Features

### Frontend Features
- ✅ Add new students with form
- ✅ Display all students in a list
- ✅ Edit student inline
- ✅ Delete students
- ✅ Real-time list updates
- ✅ Clean, responsive UI
- ✅ Works in GitHub Codespaces

### Backend Features
- ✅ RESTful API endpoints
- ✅ Full CRUD operations
- ✅ H2 in-memory database
- ✅ CORS support (cross-origin)
- ✅ Spring Data JPA
- ✅ Automatic schema creation
- ✅ Clean architecture (Controller-Service-Repository)

---

## 🔧 Troubleshooting

### Problem: "Failed to fetch" Error
**Cause:** Backend is not running  
**Solution:**
```bash
# Check backend
curl http://localhost:8081/students

# If error, start backend
cd /workspaces/Assigment-1/backend/backend
./mvnw spring-boot:run
```

### Problem: Port 8081 Already in Use
```bash
# Find process
lsof -i :8081

# Kill it
kill -9 <PID>
```

### Problem: Port 3002 Already in Use
```bash
# Find process
lsof -i :3002

# Kill it
kill -9 <PID>

# Or use different port
PORT=3003 npm start
```

### Problem: npm install Errors
```bash
cd /workspaces/Assigment-1/frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Problem: Maven Compilation Errors
```bash
cd /workspaces/Assigment-1/backend/backend
./mvnw clean compile
./mvnw spring-boot:run
```

### Problem: Want to Reset Database
```bash
# Stop backend (Ctrl+C)
# Start it again - data will be fresh
cd /workspaces/Assigment-1/backend/backend
./mvnw spring-boot:run
```

---

## 📋 Lab Requirements Checklist

### ✅ Lab Test One: Full-Stack CRUD (Complete)

#### Part 1: GitHub Codespaces Configuration
- [x] Development environment configured
- [x] All tools installed (Java, Node.js, npm, Maven)
- [x] Ready to run both applications

#### Part 2: Backend - Spring Boot REST API
- [x] GET /students (list all)
- [x] GET /students/{id} (get one by ID)
- [x] POST /students (create new)
- [x] PUT /students/{id} (full update)
- [x] PATCH /students/{id} (partial update)
- [x] DELETE /students/{id} (delete)
- [x] All endpoints functional and tested

#### Part 3: Frontend - React Application
- [x] User interface displaying all students
- [x] Form for creating students
- [x] Form for updating students (inline)
- [x] Delete functionality
- [x] Complete backend integration
- [x] Real-time UI updates

### 🔄 Lab Test Two: Java Collections (In Progress)

#### Task 1: Load Students from CSV
- [ ] Read students from CSV file
- [ ] Store in ArrayList
- [ ] Remove duplicates using HashSet

#### Task 2: Sorting
- [ ] Implement Comparable (sort by ID)
- [ ] Implement Comparator (sort by CGPA descending)

#### Task 3: Delete Using Iterator
- [ ] Safe removal during iteration

#### Task 4: REST API
- [ ] GET /students (from CSV)
- [ ] GET /students/sort/cgpa

### ✅ Overall Application
- [x] Both applications run without errors
- [x] All CRUD operations work correctly
- [x] Clean code structure
- [x] OOP principles applied
- [x] Proper error handling

---

## 📂 Project Structure

```
/workspaces/Assigment-1/
│
├── README.md                          # This file
├── lab-test-one.md                    # Lab Test One requirements
├── lab-test-two.md                    # Lab Test Two requirements
├── SUBMISSION_CHECKLIST.md            # Submission checklist
├── SYSTEM_ARCHITECTURE_REPORT.md      # Architecture documentation
│
├── backend/backend/
│   ├── src/main/java/com/example/backend/
│   │   ├── BackendApplication.java    # Main entry point
│   │   ├── controller/
│   │   │   └── StudentController.java # REST endpoints
│   │   ├── entity/
│   │   │   └── Student.java           # Data model (JPA)
│   │   ├── repository/
│   │   │   └── StudentRepository.java # Database access
│   │   └── service/
│   │       └── StudentService.java    # Business logic
│   ├── src/main/resources/
│   │   └── application.properties     # Database config
│   ├── pom.xml                        # Maven config
│   ├── mvnw                           # Maven wrapper
│   └── target/                        # Compiled classes
│
├── frontend/
│   ├── public/
│   │   └── index.html                 # HTML template
│   ├── src/
│   │   ├── index.tsx                  # Entry point (TypeScript)
│   │   ├── App.tsx                    # Main component (TypeScript)
│   │   ├── App.css                    # Styles
│   │   ├── types/
│   │   │   └── Student.ts             # TypeScript interfaces
│   │   ├── api/
│   │   │   └── backend.ts             # API functions (TypeScript)
│   │   └── components/
│   │       ├── ResourceForm.tsx       # Add form (TypeScript)
│   │       └── ResourceList.tsx       # List & edit/delete (TypeScript)
│   ├── tsconfig.json                  # TypeScript config
│   ├── package.json                   # npm config
│   └── node_modules/                  # Dependencies
│
└── lab-test-two/
    └── students.csv                   # Sample CSV data for Lab Test Two
```

---

## 📞 Quick Reference

### Services & URLs
| Service | Port | URL |
|---------|------|-----|
| Frontend | 3002 | http://localhost:3002 |
| Backend | 8081 | http://localhost:8081 |
| API | 8081 | http://localhost:8081/students |
| H2 Console | 8081 | http://localhost:8081/h2-console |

### Quick Commands
```bash
# Start backend
cd /workspaces/Assigment-1/backend/backend && ./mvnw spring-boot:run

# Start frontend
cd /workspaces/Assigment-1/frontend && npm start

# Test API
curl http://localhost:8081/students

# Create via API
curl -X POST http://localhost:8081/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com"}'
```

---

## 🎓 What You've Learned

By completing this assignment:

1. **Full-Stack Development** - Building complete applications
2. **REST API Design** - Creating RESTful endpoints
3. **CRUD Operations** - Implementing all four database operations
4. **Frontend Development** - React components and state
5. **Backend Development** - Spring Boot with databases
6. **Client-Server** - Frontend-backend communication
7. **Java Collections** - ArrayList, HashSet, Iterator usage
8. **Sorting** - Comparable and Comparator interfaces
9. **File I/O** - Reading CSV files
10. **Clean Code** - OOP principles and design patterns
11. **Developer Tools** - Maven, npm, Git, debugging

---

## ✨ Notes

- **H2 Database:** Data stored in memory, resets on restart
- **CORS:** Enabled for cross-origin requests
- **Codespaces:** Frontend automatically detects backend URL
- **No External DB:** Everything works in-memory during dev
- **CSV Data:** Lab Test Two uses `lab-test-two/students.csv`

---

**📊 Assignment Status:**  
- Lab Test One: ✅ Complete  
- Lab Test Two: 🔄 In Progress  

**Last Updated:** January 17, 2026  
**Fully Tested:** ✓ Lab Test One CRUD operations working
