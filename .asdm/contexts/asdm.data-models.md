# 数据模型

## 概述
本文档描述了QA医疗问诊系统的数据模型、关系和数据结构。基于当前项目状态，系统是一个基于Vue 3 + TypeScript的前端应用，使用内存存储数据，后端服务正在开发中。

## 项目结构
- **前端**: Vue 3 + TypeScript + Ant Design Vue
- **后端**: Spring Boot (开发中)
- **数据存储**: 当前使用JSON文件内存存储

## 实体定义

### 医生实体 (Doctor)
**用途**: 代表医疗系统中的医生用户

```typescript
interface Doctor {
  id: string;                    // 医生ID，如 "doc001"
  username: string;              // 用户名，登录用，如 "dr-zhang-wei"
  password: string;              // 密码（明文，当前为演示用）
  name: string;                  // 医生姓名，如 "张伟医生"
  title: string;                 // 职称，如 "主任医师"
  department: string;            // 科室，如 "心内科"
  avatar: string;                // 头像URL
  experience: string;            // 经验描述，如 "15年临床经验"
  specialties: string[];         // 专长领域，如 ["高血压", "冠心病", "心律失常"]
  isActive: boolean;             // 是否在线/可用
}
```

### 患者实体 (Patient)
**用途**: 代表医疗系统中的患者用户

```typescript
interface Patient {
  id: string;                    // 患者ID，如 "patient001"
  name: string;                  // 患者姓名，如 "赵明"
  birthday: string;              // 生日，格式 "YYYY-MM-DD"
  phone: string;                 // 电话，如 "138****1234"
  gender: string;                // 性别，如 "男"
}
```

### 问题实体 (Question)
**用途**: 代表患者向医生提出的医疗问题

```typescript
interface Question {
  id: string;                    // 问题ID，如 "q001"
  patientId: string;             // 患者ID
  patientName: string;           // 患者姓名
  doctorId: string;              // 医生ID
  doctorName: string;            // 医生姓名
  question: string;              // 问题内容
  submitTime: string;            // 提交时间，ISO格式
  status: 'pending' | 'answered'; // 问题状态
  answer: string | null;         // 医生回答
  answerTime: string | null;     // 回答时间，ISO格式
}
```

## 数据关系

### 一对一关系
1. **问题 ↔ 回答**: 一个问题对应一个回答

### 一对多关系
1. **医生 → 问题**: 一个医生可以回答多个问题
2. **患者 → 问题**: 一个患者可以提出多个问题

### 多对多关系
1. **医生 ↔ 专长**: 一个医生可以有多个专长领域

## 数据存储

### 前端数据文件
- `web/qa-web/src/data/doctor-user-list.json`: 医生数据
- `web/qa-web/src/data/patient-user.json`: 患者数据  
- `web/qa-web/src/data/question-list.json`: 问题数据

### 后端服务
- `server/qa-service-user`: 用户服务 (Spring Boot)
- `server/qa-service-question`: 问题服务 (Spring Boot)
- `server/qa-service-statistic`: 统计服务 (目录结构)

## 数据访问模式

### 前端Store接口
```typescript
// 医生相关操作
loginDoctor(username: string, password: string): Doctor | null
logoutDoctor(): void
getDoctorByUsername(username: string): Doctor | undefined
getActiveDoctors(): Doctor[]

// 患者相关操作
verifyPatient(name: string, birthday: string): Patient
logoutPatient(): void

// 问题相关操作
getQuestionsByDoctor(doctorId: string): Question[]
getQuestionsByPatient(patientId: string): Question[]
addQuestion(question: Partial<Question>): Question
answerQuestion(questionId: string, answer: string): void
markQuestionAsAnswered(questionId: string): void

// 统计相关
getStatistics(): {
  totalDoctors: number;
  totalQuestions: number;
  activeSessions: number;
  totalSessions: number;
}
```

## 示例数据

### 医生示例
```json
{
  "id": "doc001",
  "username": "dr-zhang-wei",
  "password": "123456",
  "name": "张伟医生",
  "title": "主任医师",
  "department": "心内科",
  "avatar": "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
  "experience": "15年临床经验",
  "specialties": ["高血压", "冠心病", "心律失常"],
  "isActive": true
}
```

### 患者示例
```json
{
  "id": "patient001",
  "name": "赵明",
  "birthday": "1985-03-15",
  "phone": "138****1234",
  "gender": "男"
}
```

### 问题示例
```json
{
  "id": "q001",
  "patientId": "patient001",
  "patientName": "赵明",
  "doctorId": "doc001",
  "doctorName": "张伟医生",
  "question": "最近总是感觉胸闷气短,特别是爬楼梯的时候,这是什么原因?",
  "submitTime": "2025-11-02T09:30:00",
  "status": "answered",
  "answer": "根据您的描述,可能是心脏功能问题。建议您做个心电图和心脏彩超检查,同时注意休息,避免剧烈运动。",
  "answerTime": "2025-11-02T09:45:00"
}
```

## 技术栈详情

### 前端技术栈
- **框架**: Vue 3 + TypeScript
- **UI组件库**: Ant Design Vue 4.2.6
- **路由**: Vue Router 4.6.3
- **构建工具**: Vite 5.4.8
- **日期处理**: Day.js 1.11.19

### 后端技术栈
- **qa-service-user**: Spring Boot 3.5.7 + Java 17 + Spring Web + Spring Actuator
- **qa-service-question**: Spring Boot 3.5.7 + Java 17 + Spring Web + Spring Actuator
- **qa-service-statistic**: 仅目录结构

## 当前状态

### 已实现功能
1. 医生列表展示
2. 患者身份验证
3. 问题提交和查看
4. 医生回答功能
5. 基本统计信息

### 待开发功能
1. 后端API实现
2. 数据库集成
3. 用户认证和授权
4. 实时通信
5. 医疗记录管理
6. 预约系统

## 数据流

### 问题提交流程
1. 患者验证身份
2. 选择医生
3. 提交问题
4. 医生查看并回答问题
5. 患者查看回答

### 身份验证流程
1. 患者输入姓名和生日
2. 系统验证或创建患者账户
3. 返回患者信息并建立会话

---

*本文档基于当前项目状态编写，反映了实际的数据结构和实现。随着项目开发，数据模型可能会发生变化。*