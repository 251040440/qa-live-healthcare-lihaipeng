package com.leansofx.qaserviceuser.controller;

import com.leansofx.qaserviceuser.dto.request.DoctorUserCreateRequest;
import com.leansofx.qaserviceuser.dto.response.DoctorUserResponse;
import com.leansofx.qaserviceuser.service.DoctorUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
public class DoctorUserController {

    private final DoctorUserService doctorUserService;

    @Autowired
    public DoctorUserController(DoctorUserService doctorUserService) {
        this.doctorUserService = doctorUserService;
    }

    @PostMapping
    public ResponseEntity<DoctorUserResponse> createDoctorUser(@Valid @RequestBody DoctorUserCreateRequest request) {
        try {
            DoctorUserResponse response = doctorUserService.createDoctorUser(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("创建医生用户失败: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<DoctorUserResponse>> getAllDoctorUsers() {
        List<DoctorUserResponse> doctors = doctorUserService.getAllDoctorUsers();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorUserResponse> getDoctorUserById(@PathVariable String id) {
        try {
            DoctorUserResponse response = doctorUserService.getDoctorUserById(id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            throw new RuntimeException("获取医生用户失败: " + e.getMessage());
        }
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<DoctorUserResponse> getDoctorUserByUsername(@PathVariable String username) {
        return doctorUserService.getDoctorUserByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/active")
    public ResponseEntity<List<DoctorUserResponse>> getActiveDoctorUsers() {
        List<DoctorUserResponse> doctors = doctorUserService.getActiveDoctorUsers();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/department/{department}")
    public ResponseEntity<List<DoctorUserResponse>> getDoctorUsersByDepartment(@PathVariable String department) {
        List<DoctorUserResponse> doctors = doctorUserService.getDoctorUsersByDepartment(department);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/department/{department}/active")
    public ResponseEntity<List<DoctorUserResponse>> getActiveDoctorUsersByDepartment(@PathVariable String department) {
        List<DoctorUserResponse> doctors = doctorUserService.getActiveDoctorUsersByDepartment(department);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/search")
    public ResponseEntity<List<DoctorUserResponse>> searchDoctorUsersByName(@RequestParam String name) {
        List<DoctorUserResponse> doctors = doctorUserService.searchDoctorUsersByName(name);
        return ResponseEntity.ok(doctors);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorUserResponse> updateDoctorUser(@PathVariable String id, 
                                                               @Valid @RequestBody DoctorUserCreateRequest request) {
        try {
            DoctorUserResponse response = doctorUserService.updateDoctorUser(id, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            throw new RuntimeException("更新医生用户失败: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteDoctorUser(@PathVariable String id) {
        try {
            doctorUserService.deleteDoctorUser(id);
            return ResponseEntity.ok(Map.of("message", "医生用户删除成功"));
        } catch (RuntimeException e) {
            throw new RuntimeException("删除医生用户失败: " + e.getMessage());
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<DoctorUserResponse> authenticate(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().build();
        }

        return doctorUserService.authenticate(username, password)
                .map(user -> ResponseEntity.ok(doctorUserService.getDoctorUserByUsername(username).orElse(null)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @GetMapping("/exists/{username}")
    public ResponseEntity<Map<String, Boolean>> checkUsernameExists(@PathVariable String username) {
        boolean exists = doctorUserService.existsByUsername(username);
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getDoctorCount() {
        long count = doctorUserService.getAllDoctorUsers().size();
        return ResponseEntity.ok(Map.of("count", count));
    }
}