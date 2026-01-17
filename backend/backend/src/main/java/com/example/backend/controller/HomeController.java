package com.example.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "running");
        response.put("application", "Student Management API");
        response.put("version", "1.0.0");
        response.put("endpoints", new String[]{
            "GET /students - Get all students",
            "GET /students/{id} - Get student by ID",
            "POST /students - Create new student",
            "PUT /students/{id} - Update student",
            "PATCH /students/{id} - Partial update student",
            "DELETE /students/{id} - Delete student"
        });
        return response;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Backend is running successfully");
        return response;
    }
}
