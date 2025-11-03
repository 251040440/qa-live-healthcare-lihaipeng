package com.leansofx.qaserviceuser.service.impl;

import com.leansofx.qaserviceuser.dto.converter.DoctorUserConverter;
import com.leansofx.qaserviceuser.dto.request.DoctorUserCreateRequest;
import com.leansofx.qaserviceuser.dto.response.DoctorUserResponse;
import com.leansofx.qaserviceuser.entity.DoctorUser;
import com.leansofx.qaserviceuser.repository.DoctorUserRepository;
import com.leansofx.qaserviceuser.service.DoctorUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorUserServiceImpl implements DoctorUserService {
    
    private final DoctorUserRepository doctorUserRepository;
    private final DoctorUserConverter doctorUserConverter;
    
    @Autowired
    public DoctorUserServiceImpl(DoctorUserRepository doctorUserRepository, DoctorUserConverter doctorUserConverter) {
        this.doctorUserRepository = doctorUserRepository;
        this.doctorUserConverter = doctorUserConverter;
    }
    
    @Override
    public List<DoctorUserResponse> getAllDoctors() {
        List<DoctorUser> doctors = doctorUserRepository.findAll();
        return doctors.stream()
                .map(doctorUserConverter::toResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public Optional<DoctorUserResponse> getDoctorById(String id) {
        return doctorUserRepository.findById(id)
                .map(doctorUserConverter::toResponse);
    }
    
    @Override
    public Optional<DoctorUserResponse> getDoctorByUsername(String username) {
        return doctorUserRepository.findByUsername(username)
                .map(doctorUserConverter::toResponse);
    }
    
    @Override
    public DoctorUserResponse createDoctor(DoctorUserCreateRequest request) {
        DoctorUser doctor = doctorUserConverter.toEntity(request);
        DoctorUser savedDoctor = doctorUserRepository.save(doctor);
        return doctorUserConverter.toResponse(savedDoctor);
    }
    
    @Override
    public Optional<DoctorUserResponse> updateDoctor(String id, DoctorUserCreateRequest request) {
        return doctorUserRepository.findById(id)
                .map(doctor -> {
                    doctorUserConverter.updateEntity(doctor, request);
                    DoctorUser updatedDoctor = doctorUserRepository.save(doctor);
                    return doctorUserConverter.toResponse(updatedDoctor);
                });
    }
    
    @Override
    public boolean deleteDoctor(String id) {
        if (doctorUserRepository.existsById(id)) {
            doctorUserRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    @Override
    public List<DoctorUserResponse> getActiveDoctors() {
        List<DoctorUser> doctors = doctorUserRepository.findByIsActiveTrue();
        return doctors.stream()
                .map(doctorUserConverter::toResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<DoctorUserResponse> getDoctorsByDepartment(String department) {
        List<DoctorUser> doctors = doctorUserRepository.findByDepartment(department);
        return doctors.stream()
                .map(doctorUserConverter::toResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<DoctorUserResponse> getActiveDoctorsByDepartment(String department) {
        List<DoctorUser> doctors = doctorUserRepository.findByDepartmentAndIsActiveTrue(department);
        return doctors.stream()
                .map(doctorUserConverter::toResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<DoctorUserResponse> getDoctorsByTitle(String title) {
        List<DoctorUser> doctors = doctorUserRepository.findByTitle(title);
        return doctors.stream()
                .map(doctorUserConverter::toResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<DoctorUserResponse> getDoctorsBySpecialty(String specialty) {
        List<DoctorUser> doctors = doctorUserRepository.findBySpecialty(specialty);
        return doctors.stream()
                .map(doctorUserConverter::toResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public Optional<DoctorUserResponse> authenticateDoctor(String username, String password) {
        return doctorUserRepository.findByUsernameAndPassword(username, password)
                .map(doctorUserConverter::toResponse);
    }
    
    @Override
    public long countActiveDoctors() {
        return doctorUserRepository.countActiveDoctors();
    }
    
    @Override
    public long countAllDoctors() {
        return doctorUserRepository.countAllDoctors();
    }
}