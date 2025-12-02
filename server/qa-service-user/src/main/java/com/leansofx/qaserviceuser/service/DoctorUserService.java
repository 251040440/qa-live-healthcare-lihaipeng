package com.leansofx.qaserviceuser.service;

import com.leansofx.qaserviceuser.dto.request.DoctorUserCreateRequest;
import com.leansofx.qaserviceuser.dto.response.DoctorUserResponse;
import com.leansofx.qaserviceuser.entity.DoctorUser;

import java.util.List;
import java.util.Optional;

public interface DoctorUserService {

    DoctorUserResponse createDoctorUser(DoctorUserCreateRequest request);

    List<DoctorUserResponse> getAllDoctorUsers();

    DoctorUserResponse getDoctorUserById(String id);

    Optional<DoctorUserResponse> getDoctorUserByUsername(String username);

    List<DoctorUserResponse> getActiveDoctorUsers();

    List<DoctorUserResponse> getDoctorUsersByDepartment(String department);

    List<DoctorUserResponse> getActiveDoctorUsersByDepartment(String department);

    List<DoctorUserResponse> searchDoctorUsersByName(String name);

    DoctorUserResponse updateDoctorUser(String id, DoctorUserCreateRequest request);

    void deleteDoctorUser(String id);

    boolean existsByUsername(String username);

    Optional<DoctorUser> authenticate(String username, String password);
}