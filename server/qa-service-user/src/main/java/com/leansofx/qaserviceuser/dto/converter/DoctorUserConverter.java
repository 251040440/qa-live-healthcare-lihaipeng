package com.leansofx.qaserviceuser.dto.converter;

import com.leansofx.qaserviceuser.dto.request.DoctorUserCreateRequest;
import com.leansofx.qaserviceuser.dto.response.DoctorUserResponse;
import com.leansofx.qaserviceuser.entity.DoctorUser;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class DoctorUserConverter {
    
    public DoctorUserResponse toResponse(DoctorUser entity) {
        if (entity == null) {
            return null;
        }
        
        return new DoctorUserResponse(
            entity.getId(),
            entity.getUsername(),
            entity.getName(),
            entity.getTitle(),
            entity.getDepartment(),
            entity.getAvatar(),
            entity.getExperience(),
            entity.getSpecialties(),
            entity.getIsActive()
        );
    }
    
    public DoctorUser toEntity(DoctorUserCreateRequest request) {
        if (request == null) {
            return null;
        }
        
        // 生成唯一ID
        String id = "doc" + UUID.randomUUID().toString().substring(0, 8);
        
        return new DoctorUser(
            id,
            request.getUsername(),
            request.getPassword(),
            request.getName(),
            request.getTitle(),
            request.getDepartment(),
            request.getAvatar(),
            request.getExperience(),
            request.getSpecialties(),
            request.getIsActive() != null ? request.getIsActive() : true
        );
    }
    
    public void updateEntity(DoctorUser entity, DoctorUserCreateRequest request) {
        if (entity == null || request == null) {
            return;
        }
        
        entity.setUsername(request.getUsername());
        entity.setPassword(request.getPassword());
        entity.setName(request.getName());
        entity.setTitle(request.getTitle());
        entity.setDepartment(request.getDepartment());
        entity.setAvatar(request.getAvatar());
        entity.setExperience(request.getExperience());
        entity.setSpecialties(request.getSpecialties());
        entity.setIsActive(request.getIsActive());
    }
}