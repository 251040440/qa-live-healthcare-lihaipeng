// 医生用户响应类型
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

// 创建医生用户请求类型
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

// 医生统计信息类型
export interface DoctorStatistics {
  totalDoctors: number;
  activeDoctors: number;
}