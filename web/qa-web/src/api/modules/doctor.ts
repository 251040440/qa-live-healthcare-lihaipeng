import request from '../request';
import type { DoctorUserResponse, DoctorUserCreateRequest, DoctorStatistics } from '../types';

// 获取所有医生用户
export const getAllDoctors = (): Promise<DoctorUserResponse[]> => {
  return request.get('/doctors');
};

// 根据ID获取医生用户
export const getDoctorById = (id: string): Promise<DoctorUserResponse> => {
  return request.get(`/doctors/${id}`);
};

// 根据用户名获取医生用户
export const getDoctorByUsername = (username: string): Promise<DoctorUserResponse> => {
  return request.get(`/doctors/username/${username}`);
};

// 创建医生用户
export const createDoctor = (data: DoctorUserCreateRequest): Promise<DoctorUserResponse> => {
  return request.post('/doctors', data);
};

// 更新医生用户
export const updateDoctor = (id: string, data: DoctorUserCreateRequest): Promise<DoctorUserResponse> => {
  return request.put(`/doctors/${id}`, data);
};

// 删除医生用户
export const deleteDoctor = (id: string): Promise<void> => {
  return request.delete(`/doctors/${id}`);
};

// 获取所有活跃的医生用户
export const getActiveDoctors = (): Promise<DoctorUserResponse[]> => {
  return request.get('/doctors/active');
};

// 根据科室获取医生用户
export const getDoctorsByDepartment = (department: string): Promise<DoctorUserResponse[]> => {
  return request.get(`/doctors/department/${department}`);
};

// 根据科室获取活跃的医生用户
export const getActiveDoctorsByDepartment = (department: string): Promise<DoctorUserResponse[]> => {
  return request.get(`/doctors/department/${department}/active`);
};

// 根据职称获取医生用户
export const getDoctorsByTitle = (title: string): Promise<DoctorUserResponse[]> => {
  return request.get(`/doctors/title/${title}`);
};

// 根据专业领域获取医生用户
export const getDoctorsBySpecialty = (specialty: string): Promise<DoctorUserResponse[]> => {
  return request.get(`/doctors/specialty/${specialty}`);
};

// 验证医生用户登录
export const authenticateDoctor = (username: string, password: string): Promise<DoctorUserResponse> => {
  return request.post('/doctors/authenticate', null, {
    params: { username, password }
  });
};

// 获取医生统计信息
export const getDoctorStatistics = (): Promise<DoctorStatistics> => {
  return request.get('/doctors/statistics');
};