package com.leansofx.qaserviceuser.repository;

import com.leansofx.qaserviceuser.entity.DoctorUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorUserRepository extends JpaRepository<DoctorUser, String> {
    
    /**
     * 根据用户名查找医生用户
     * @param username 用户名
     * @return 医生用户
     */
    Optional<DoctorUser> findByUsername(String username);
    
    /**
     * 根据用户名和密码查找医生用户
     * @param username 用户名
     * @param password 密码
     * @return 医生用户
     */
    Optional<DoctorUser> findByUsernameAndPassword(String username, String password);
    
    /**
     * 查找所有活跃的医生用户
     * @return 活跃的医生用户列表
     */
    List<DoctorUser> findByIsActiveTrue();
    
    /**
     * 根据科室查找医生用户
     * @param department 科室
     * @return 医生用户列表
     */
    List<DoctorUser> findByDepartment(String department);
    
    /**
     * 根据科室查找活跃的医生用户
     * @param department 科室
     * @return 活跃的医生用户列表
     */
    List<DoctorUser> findByDepartmentAndIsActiveTrue(String department);
    
    /**
     * 根据职称查找医生用户
     * @param title 职称
     * @return 医生用户列表
     */
    List<DoctorUser> findByTitle(String title);
    
    /**
     * 根据职称查找活跃的医生用户
     * @param title 职称
     * @return 活跃的医生用户列表
     */
    List<DoctorUser> findByTitleAndIsActiveTrue(String title);
    
    /**
     * 根据专业领域查找医生用户
     * @param specialty 专业领域
     * @return 医生用户列表
     */
    @Query("SELECT d FROM DoctorUser d JOIN d.specialties s WHERE s = :specialty")
    List<DoctorUser> findBySpecialty(@Param("specialty") String specialty);
    
    /**
     * 根据专业领域查找活跃的医生用户
     * @param specialty 专业领域
     * @return 活跃的医生用户列表
     */
    @Query("SELECT d FROM DoctorUser d JOIN d.specialties s WHERE s = :specialty AND d.isActive = true")
    List<DoctorUser> findBySpecialtyAndIsActiveTrue(@Param("specialty") String specialty);
    
    /**
     * 统计活跃医生数量
     * @return 活跃医生数量
     */
    @Query("SELECT COUNT(d) FROM DoctorUser d WHERE d.isActive = true")
    long countActiveDoctors();
    
    /**
     * 统计所有医生数量
     * @return 所有医生数量
     */
    @Query("SELECT COUNT(d) FROM DoctorUser d")
    long countAllDoctors();
}