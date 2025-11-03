package com.leansofx.qaserviceuser.service;

import com.leansofx.qaserviceuser.dto.request.DoctorUserCreateRequest;
import com.leansofx.qaserviceuser.dto.response.DoctorUserResponse;

import java.util.List;
import java.util.Optional;

public interface DoctorUserService {
    
    /**
     * 获取所有医生用户
     * @return 医生用户列表
     */
    List<DoctorUserResponse> getAllDoctors();
    
    /**
     * 根据ID获取医生用户
     * @param id 医生用户ID
     * @return 医生用户
     */
    Optional<DoctorUserResponse> getDoctorById(String id);
    
    /**
     * 根据用户名获取医生用户
     * @param username 用户名
     * @return 医生用户
     */
    Optional<DoctorUserResponse> getDoctorByUsername(String username);
    
    /**
     * 创建医生用户
     * @param request 创建请求
     * @return 创建的医生用户
     */
    DoctorUserResponse createDoctor(DoctorUserCreateRequest request);
    
    /**
     * 更新医生用户
     * @param id 医生用户ID
     * @param request 更新请求
     * @return 更新后的医生用户
     */
    Optional<DoctorUserResponse> updateDoctor(String id, DoctorUserCreateRequest request);
    
    /**
     * 删除医生用户
     * @param id 医生用户ID
     * @return 是否删除成功
     */
    boolean deleteDoctor(String id);
    
    /**
     * 获取所有活跃的医生用户
     * @return 活跃的医生用户列表
     */
    List<DoctorUserResponse> getActiveDoctors();
    
    /**
     * 根据科室获取医生用户
     * @param department 科室
     * @return 医生用户列表
     */
    List<DoctorUserResponse> getDoctorsByDepartment(String department);
    
    /**
     * 根据科室获取活跃的医生用户
     * @param department 科室
     * @return 活跃的医生用户列表
     */
    List<DoctorUserResponse> getActiveDoctorsByDepartment(String department);
    
    /**
     * 根据职称获取医生用户
     * @param title 职称
     * @return 医生用户列表
     */
    List<DoctorUserResponse> getDoctorsByTitle(String title);
    
    /**
     * 根据专业领域获取医生用户
     * @param specialty 专业领域
     * @return 医生用户列表
     */
    List<DoctorUserResponse> getDoctorsBySpecialty(String specialty);
    
    /**
     * 验证医生用户登录
     * @param username 用户名
     * @param password 密码
     * @return 验证成功返回医生用户，失败返回null
     */
    Optional<DoctorUserResponse> authenticateDoctor(String username, String password);
    
    /**
     * 统计活跃医生数量
     * @return 活跃医生数量
     */
    long countActiveDoctors();
    
    /**
     * 统计所有医生数量
     * @return 所有医生数量
     */
    long countAllDoctors();
}