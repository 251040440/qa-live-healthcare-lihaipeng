package com.leansofx.qaserviceuser.dto.converter;

import com.leansofx.qaserviceuser.dto.request.DoctorUserCreateRequest;
import com.leansofx.qaserviceuser.dto.response.DoctorUserResponse;
import com.leansofx.qaserviceuser.entity.DoctorUser;
import org.springframework.stereotype.Component;

@Component
public class DoctorUserConverter {

    public DoctorUser convertToEntity(DoctorUserCreateRequest request) {
        if (request == null) {
            return null;
        }

        DoctorUser doctorUser = new DoctorUser();
        doctorUser.setUsername(request.getUsername());
        doctorUser.setPassword(request.getPassword());
        doctorUser.setName(request.getName());
        doctorUser.setTitle(request.getTitle());
        doctorUser.setDepartment(request.getDepartment());
        doctorUser.setAvatar(request.getAvatar());
        doctorUser.setExperience(request.getExperience());
        doctorUser.setSpecialties(request.getSpecialties());
        doctorUser.setIsActive(request.getIsActive());

        return doctorUser;
    }

    public DoctorUserResponse convertToResponse(DoctorUser entity) {
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
}