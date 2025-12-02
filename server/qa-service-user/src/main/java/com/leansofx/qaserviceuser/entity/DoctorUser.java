package com.leansofx.qaserviceuser.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "doctor_users")
public class DoctorUser {
    
    @Id
    @Column(name = "id", length = 50)
    private String id;
    
    @Column(name = "username", length = 100, nullable = false, unique = true)
    private String username;
    
    @Column(name = "password", length = 255, nullable = false)
    private String password;
    
    @Column(name = "name", length = 100, nullable = false)
    private String name;
    
    @Column(name = "title", length = 50)
    private String title;
    
    @Column(name = "department", length = 100)
    private String department;
    
    @Column(name = "avatar", length = 500)
    private String avatar;
    
    @Column(name = "experience", length = 200)
    private String experience;
    
    @ElementCollection
    @CollectionTable(name = "doctor_specialties", joinColumns = @JoinColumn(name = "doctor_id"))
    @Column(name = "specialty")
    private List<String> specialties;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    public DoctorUser() {
    }

    public DoctorUser(String id, String username, String password, String name, String title, 
                     String department, String avatar, String experience, List<String> specialties, Boolean isActive) {
        this.id = id;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    @Override
    public String toString() {
        return "DoctorUser{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", title='" + title + '\'' +
                ", department='" + department + '\'' +
                ", avatar='" + avatar + '\'' +
                ", experience='" + experience + '\'' +
                ", specialties=" + specialties +
                ", isActive=" + isActive +
                '}';
    }
}