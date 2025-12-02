import request from '../request';
import {
  DoctorUserResponse,
  DoctorUserCreateRequest,
  AuthRequest,
  CountResponse,
  ExistsResponse,
  DeleteResponse,
} from '../types';

/**
 * 获取所有医生用户
 */
export const getAllDoctors = async (): Promise<DoctorUserResponse[]> => {
  return request.get('/doctors');
};

/**
 * 根据ID获取医生用户
 */
export const getDoctorById = async (id: string): Promise<DoctorUserResponse> => {
  return request.get(`/doctors/${id}`);
};

/**
 * 根据用户名获取医生用户
 */
export const getDoctorByUsername = async (username: string): Promise<DoctorUserResponse> => {
  return request.get(`/doctors/username/${username}`);
};

/**
 * 获取所有活跃的医生用户
 */
export const getActiveDoctors = async (): Promise<DoctorUserResponse[]> => {
  return request.get('/doctors/active');
};

/**
 * 根据科室获取医生用户
 */
export const getDoctorsByDepartment = async (department: string): Promise<DoctorUserResponse[]> => {
  return request.get(`/doctors/department/${department}`);
};

/**
 * 获取指定科室的活跃医生用户
 */
export const getActiveDoctorsByDepartment = async (department: string): Promise<DoctorUserResponse[]> => {
  return request.get(`/doctors/department/${department}/active`);
};

/**
 * 根据姓名搜索医生用户
 */
export const searchDoctorsByName = async (name: string): Promise<DoctorUserResponse[]> => {
  return request.get('/doctors/search', { params: { name } });
};

/**
 * 创建医生用户
 */
export const createDoctor = async (doctorData: DoctorUserCreateRequest): Promise<DoctorUserResponse> => {
  return request.post('/doctors', doctorData);
};

/**
 * 更新医生用户信息
 */
export const updateDoctor = async (id: string, doctorData: DoctorUserCreateRequest): Promise<DoctorUserResponse> => {
  return request.put(`/doctors/${id}`, doctorData);
};

/**
 * 删除医生用户
 */
export const deleteDoctor = async (id: string): Promise<DeleteResponse> => {
  return request.delete(`/doctors/${id}`);
};

/**
 * 医生用户认证
 */
export const authenticateDoctor = async (authData: AuthRequest): Promise<DoctorUserResponse> => {
  return request.post('/doctors/authenticate', authData);
};

/**
 * 检查用户名是否存在
 */
export const checkUsernameExists = async (username: string): Promise<ExistsResponse> => {
  return request.get(`/doctors/exists/${username}`);
};

/**
 * 获取医生用户总数
 */
export const getDoctorCount = async (): Promise<CountResponse> => {
  return request.get('/doctors/count');
};