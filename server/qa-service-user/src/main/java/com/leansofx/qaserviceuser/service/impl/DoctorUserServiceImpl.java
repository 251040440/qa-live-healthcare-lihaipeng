package com.leansofx.qaserviceuser.service.impl;

import com.leansofx.qaserviceuser.dto.request.DoctorUserCreateRequest;
import com.leansofx.qaserviceuser.dto.response.DoctorUserResponse;
import com.leansofx.qaserviceuser.dto.converter.DoctorUserConverter;
import com.leansofx.qaserviceuser.entity.DoctorUser;
import com.leansofx.qaserviceuser.repository.DoctorUserRepository;
import com.leansofx.qaserviceuser.service.DoctorUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class DoctorUserServiceImpl implements DoctorUserService {

    private final DoctorUserRepository doctorUserRepository;
    private final DoctorUserConverter doctorUserConverter;

    @Autowired
    public DoctorUserServiceImpl(DoctorUserRepository doctorUserRepository, DoctorUserConverter doctorUserConverter) {
        this.doctorUserRepository = doctorUserRepository;
        this.doctorUserConverter = doctorUserConverter;
    }

    @Override
    public DoctorUserResponse createDoctorUser(DoctorUserCreateRequest request) {
        if (existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("用户名已存在: " + request.getUsername());
        }

        DoctorUser doctorUser = doctorUserConverter.convertToEntity(request);
        doctorUser.setId(generateDoctorId());
        
        DoctorUser savedDoctorUser = doctorUserRepository.save(doctorUser);
        return doctorUserConverter.convertToResponse(savedDoctorUser);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DoctorUserResponse> getAllDoctorUsers() {
        return doctorUserRepository.findAll().stream()
                .map(doctorUserConverter::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DoctorUserResponse getDoctorUserById(String id) {
        DoctorUser doctorUser = doctorUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("医生用户不存在: " + id));
        return doctorUserConverter.convertToResponse(doctorUser);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DoctorUserResponse> getDoctorUserByUsername(String username) {
        return doctorUserRepository.findByUsername(username)
                .map(doctorUserConverter::convertToResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DoctorUserResponse> getActiveDoctorUsers() {
        return doctorUserRepository.findByIsActive(true).stream()
                .map(doctorUserConverter::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DoctorUserResponse> getDoctorUsersByDepartment(String department) {
        return doctorUserRepository.findByDepartment(department).stream()
                .map(doctorUserConverter::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DoctorUserResponse> getActiveDoctorUsersByDepartment(String department) {
        return doctorUserRepository.findActiveDoctorsByDepartment(department).stream()
                .map(doctorUserConverter::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DoctorUserResponse> searchDoctorUsersByName(String name) {
        return doctorUserRepository.findByNameContaining(name).stream()
                .map(doctorUserConverter::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DoctorUserResponse updateDoctorUser(String id, DoctorUserCreateRequest request) {
        DoctorUser existingDoctorUser = doctorUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("医生用户不存在: " + id));

        if (!existingDoctorUser.getUsername().equals(request.getUsername()) 
            && existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("用户名已存在: " + request.getUsername());
        }

        existingDoctorUser.setUsername(request.getUsername());
        existingDoctorUser.setPassword(request.getPassword());
        existingDoctorUser.setName(request.getName());
        existingDoctorUser.setTitle(request.getTitle());
        existingDoctorUser.setDepartment(request.getDepartment());
        existingDoctorUser.setAvatar(request.getAvatar());
        existingDoctorUser.setExperience(request.getExperience());
        existingDoctorUser.setSpecialties(request.getSpecialties());
        existingDoctorUser.setIsActive(request.getIsActive());

        DoctorUser updatedDoctorUser = doctorUserRepository.save(existingDoctorUser);
        return doctorUserConverter.convertToResponse(updatedDoctorUser);
    }

    @Override
    public void deleteDoctorUser(String id) {
        if (!doctorUserRepository.existsById(id)) {
            throw new RuntimeException("医生用户不存在: " + id);
        }
        doctorUserRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        return doctorUserRepository.existsByUsername(username);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DoctorUser> authenticate(String username, String password) {
        return doctorUserRepository.findByUsername(username)
                .filter(doctorUser -> doctorUser.getPassword().equals(password));
    }

    private String generateDoctorId() {
        return "doc" + String.format("%03d", (int) (Math.random() * 1000));
    }
}