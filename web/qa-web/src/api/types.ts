// API 响应类型定义
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: number;
}

// 医生用户相关类型
export interface DoctorUserResponse {
  id: string;
  username: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  experience: string;
  specialties: string[];
  isActive: boolean;
}

export interface DoctorUserCreateRequest {
  username: string;
  password: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  experience: string;
  specialties: string[];
  isActive: boolean;
}

export interface TestResponse {
  message: string;
  timestamp: number;
  service: string;
  receivedData?: Record<string, any>;
}

// 认证请求类型
export interface AuthRequest {
  username: string;
  password: string;
}

// 通用响应类型
export interface CountResponse {
  count: number;
}

export interface ExistsResponse {
  exists: boolean;
}

export interface DeleteResponse {
  message: string;
}