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

    Optional<DoctorUser> findByUsername(String username);

    List<DoctorUser> findByIsActive(Boolean isActive);

    List<DoctorUser> findByDepartment(String department);

    List<DoctorUser> findByIsActiveAndDepartment(Boolean isActive, String department);

    @Query("SELECT d FROM DoctorUser d WHERE d.name LIKE %:name%")
    List<DoctorUser> findByNameContaining(@Param("name") String name);

    @Query("SELECT d FROM DoctorUser d WHERE d.department = :department AND d.isActive = true")
    List<DoctorUser> findActiveDoctorsByDepartment(@Param("department") String department);

    boolean existsByUsername(String username);
}