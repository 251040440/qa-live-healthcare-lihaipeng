package com.leansofx.qaserviceuser.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public class DoctorUserCreateRequest {
    
    @NotBlank(message = "用户名不能为空")
    @Size(max = 100, message = "用户名长度不能超过100个字符")
    private String username;
    
    @NotBlank(message = "密码不能为空")
    @Size(max = 100, message = "密码长度不能超过100个字符")
    private String password;
    
    @NotBlank(message = "姓名不能为空")
    @Size(max = 100, message = "姓名长度不能超过100个字符")
    private String name;
    
    @Size(max = 100, message = "职称长度不能超过100个字符")
    private String title;
    
    @Size(max = 100, message = "科室长度不能超过100个字符")
    private String department;
    
    @Size(max = 500, message = "头像URL长度不能超过500个字符")
    private String avatar;
    
    @Size(max = 200, message = "经验描述长度不能超过200个字符")
    private String experience;
    
    private List<String> specialties;
    
    private Boolean isActive;
    
    // 默认构造函数
    public DoctorUserCreateRequest() {}
    
    // 全参数构造函数
    public DoctorUserCreateRequest(String username, String password, String name, String title, 
                                 String department, String avatar, String experience, 
                                 List<String> specialties, Boolean isActive) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.title = title;
        this.department = department;
        this.avatar = avatar;
        this.experience = experience;
        this.specialties = specialties;
        this.isActive = isActive;
    }
    
    // Getter和Setter方法
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public String getAvatar() {
        return avatar;
    }
    
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    
    public String getExperience() {
        return experience;
    }
    
    public void setExperience(String experience) {
        this.experience = experience;
    }
    
    public List<String> getSpecialties() {
        return specialties;
    }
    
    public void setSpecialties(List<String> specialties) {
        this.specialties = specialties;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}