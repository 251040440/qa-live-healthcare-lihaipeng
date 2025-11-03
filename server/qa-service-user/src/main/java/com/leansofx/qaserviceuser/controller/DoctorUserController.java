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
import java.util.Optional;

@RestController
@RequestMapping("/api/doctors")
public class DoctorUserController {
    
    private final DoctorUserService doctorUserService;
    
    @Autowired
    public DoctorUserController(DoctorUserService doctorUserService) {
        this.doctorUserService = doctorUserService;
    }
    
    /**
     * 获取所有医生用户
     * @return 医生用户列表
     */
    @GetMapping
    public ResponseEntity<List<DoctorUserResponse>> getAllDoctors() {
        List<DoctorUserResponse> doctors = doctorUserService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }
    
    /**
     * 根据ID获取医生用户
     * @param id 医生用户ID
     * @return 医生用户
     */
    @GetMapping("/{id}")
    public ResponseEntity<DoctorUserResponse> getDoctorById(@PathVariable String id) {
        Optional<DoctorUserResponse> doctor = doctorUserService.getDoctorById(id);
        return doctor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * 根据用户名获取医生用户
     * @param username 用户名
     * @return 医生用户
     */
    @GetMapping("/username/{username}")
    public ResponseEntity<DoctorUserResponse> getDoctorByUsername(@PathVariable String username) {
        Optional<DoctorUserResponse> doctor = doctorUserService.getDoctorByUsername(username);
        return doctor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * 创建医生用户
     * @param request 创建请求
     * @return 创建的医生用户
     */
    @PostMapping
    public ResponseEntity<DoctorUserResponse> createDoctor(@Valid @RequestBody DoctorUserCreateRequest request) {
        DoctorUserResponse doctor = doctorUserService.createDoctor(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(doctor);
    }
    
    /**
     * 更新医生用户
     * @param id 医生用户ID
     * @param request 更新请求
     * @return 更新后的医生用户
     */
    @PutMapping("/{id}")
    public ResponseEntity<DoctorUserResponse> updateDoctor(@PathVariable String id, 
                                                          @Valid @RequestBody DoctorUserCreateRequest request) {
        Optional<DoctorUserResponse> doctor = doctorUserService.updateDoctor(id, request);
        return doctor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * 删除医生用户
     * @param id 医生用户ID
     * @return 是否删除成功
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable String id) {
        boolean deleted = doctorUserService.deleteDoctor(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    /**
     * 获取所有活跃的医生用户
     * @return 活跃的医生用户列表
     */
    @GetMapping("/active")
    public ResponseEntity<List<DoctorUserResponse>> getActiveDoctors() {
        List<DoctorUserResponse> doctors = doctorUserService.getActiveDoctors();
        return ResponseEntity.ok(doctors);
    }
    
    /**
     * 根据科室获取医生用户
     * @param department 科室
     * @return 医生用户列表
     */
    @GetMapping("/department/{department}")
    public ResponseEntity<List<DoctorUserResponse>> getDoctorsByDepartment(@PathVariable String department) {
        List<DoctorUserResponse> doctors = doctorUserService.getDoctorsByDepartment(department);
        return ResponseEntity.ok(doctors);
    }
    
    /**
     * 根据科室获取活跃的医生用户
     * @param department 科室
     * @return 活跃的医生用户列表
     */
    @GetMapping("/department/{department}/active")
    public ResponseEntity<List<DoctorUserResponse>> getActiveDoctorsByDepartment(@PathVariable String department) {
        List<DoctorUserResponse> doctors = doctorUserService.getActiveDoctorsByDepartment(department);
        return ResponseEntity.ok(doctors);
    }
    
    /**
     * 根据职称获取医生用户
     * @param title 职称
     * @return 医生用户列表
     */
    @GetMapping("/title/{title}")
    public ResponseEntity<List<DoctorUserResponse>> getDoctorsByTitle(@PathVariable String title) {
        List<DoctorUserResponse> doctors = doctorUserService.getDoctorsByTitle(title);
        return ResponseEntity.ok(doctors);
    }
    
    /**
     * 根据专业领域获取医生用户
     * @param specialty 专业领域
     * @return 医生用户列表
     */
    @GetMapping("/specialty/{specialty}")
    public ResponseEntity<List<DoctorUserResponse>> getDoctorsBySpecialty(@PathVariable String specialty) {
        List<DoctorUserResponse> doctors = doctorUserService.getDoctorsBySpecialty(specialty);
        return ResponseEntity.ok(doctors);
    }
    
    /**
     * 验证医生用户登录
     * @param username 用户名
     * @param password 密码
     * @return 验证成功返回医生用户，失败返回401
     */
    @PostMapping("/authenticate")
    public ResponseEntity<DoctorUserResponse> authenticateDoctor(@RequestParam String username, 
                                                                 @RequestParam String password) {
        Optional<DoctorUserResponse> doctor = doctorUserService.authenticateDoctor(username, password);
        return doctor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
    
    /**
     * 获取医生统计信息
     * @return 统计信息
     */
    @GetMapping("/statistics")
    public ResponseEntity<DoctorStatistics> getDoctorStatistics() {
        long totalDoctors = doctorUserService.countAllDoctors();
        long activeDoctors = doctorUserService.countActiveDoctors();
        
        DoctorStatistics statistics = new DoctorStatistics(totalDoctors, activeDoctors);
        return ResponseEntity.ok(statistics);
    }
    
    /**
     * 医生统计信息内部类
     */
    public static class DoctorStatistics {
        private long totalDoctors;
        private long activeDoctors;
        
        public DoctorStatistics(long totalDoctors, long activeDoctors) {
            this.totalDoctors = totalDoctors;
            this.activeDoctors = activeDoctors;
        }
        
        public long getTotalDoctors() {
            return totalDoctors;
        }
        
        public void setTotalDoctors(long totalDoctors) {
            this.totalDoctors = totalDoctors;
        }
        
        public long getActiveDoctors() {
            return activeDoctors;
        }
        
        public void setActiveDoctors(long activeDoctors) {
            this.activeDoctors = activeDoctors;
        }
    }
}