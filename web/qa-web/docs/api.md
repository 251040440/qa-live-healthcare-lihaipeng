# API 接口文档

本文档描述前端应用与后端服务之间的 API 接口规范。

> 注意：当前项目使用本地模拟数据，未来将对接后端 API。

## 基础配置

### API 基础路径

| 环境 | 基础路径 | 说明 |
|------|----------|------|
| 开发环境 | `http://localhost:8080` | 用户服务 |
| 开发环境 | `http://localhost:8081` | 问题服务 |
| 生产环境 | 待配置 | 生产服务器 |

### 请求规范

- **请求格式**: JSON
- **响应格式**: JSON
- **字符编码**: UTF-8
- **认证方式**: JWT Token（规划中）

---

## 用户服务 API (端口 8080)

### 1. 用户注册

**POST** `/api/users/register`

注册新用户。

**请求体**:
```json
{
  "username": "string",
  "password": "string",
  "name": "string",
  "phone": "string",
  "email": "string"
}
```

**响应**:
```json
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "id": "string",
    "username": "string",
    "name": "string"
  }
}
```

### 2. 用户登录

**POST** `/api/users/login`

用户登录认证。

**请求体**:
```json
{
  "username": "string",
  "password": "string"
}
```

**响应**:
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "id": "string",
    "username": "string",
    "name": "string",
    "token": "string"
  }
}
```

### 3. 获取用户信息

**GET** `/api/users/{userId}`

获取指定用户信息。

**响应**:
```json
{
  "code": 200,
  "data": {
    "id": "string",
    "username": "string",
    "name": "string",
    "phone": "string",
    "email": "string",
    "avatar": "string",
    "createdAt": "string"
  }
}
```

---

## 问题服务 API (端口 8081)

### 1. 提交问题

**POST** `/api/questions`

患者提交问诊问题。

**请求体**:
```json
{
  "patientId": "string",
  "patientName": "string",
  "doctorId": "string",
  "doctorName": "string",
  "question": "string"
}
```

**响应**:
```json
{
  "code": 200,
  "message": "问题提交成功",
  "data": {
    "id": "string",
    "patientId": "string",
    "doctorId": "string",
    "question": "string",
    "submitTime": "string",
    "status": "pending"
  }
}
```

### 2. 获取问题列表

**GET** `/api/questions`

获取问题列表，支持筛选。

**查询参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| doctorId | string | 医生 ID（可选） |
| patientId | string | 患者 ID（可选） |
| status | string | 状态：pending/answered（可选） |
| page | number | 页码，默认 1 |
| size | number | 每页数量，默认 10 |

**响应**:
```json
{
  "code": 200,
  "data": {
    "total": 100,
    "page": 1,
    "size": 10,
    "list": [
      {
        "id": "string",
        "patientId": "string",
        "patientName": "string",
        "doctorId": "string",
        "doctorName": "string",
        "question": "string",
        "submitTime": "string",
        "status": "pending",
        "answer": null,
        "answerTime": null
      }
    ]
  }
}
```

### 3. 获取问题详情

**GET** `/api/questions/{questionId}`

获取单个问题详情。

**响应**:
```json
{
  "code": 200,
  "data": {
    "id": "string",
    "patientId": "string",
    "patientName": "string",
    "doctorId": "string",
    "doctorName": "string",
    "question": "string",
    "submitTime": "string",
    "status": "answered",
    "answer": "string",
    "answerTime": "string"
  }
}
```

### 4. 回答问题

**PUT** `/api/questions/{questionId}/answer`

医生回答问题。

**请求体**:
```json
{
  "answer": "string"
}
```

**响应**:
```json
{
  "code": 200,
  "message": "回答成功",
  "data": {
    "id": "string",
    "status": "answered",
    "answer": "string",
    "answerTime": "string"
  }
}
```

---

## 医生服务 API

### 1. 获取医生列表

**GET** `/api/doctors`

获取医生列表。

**查询参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| department | string | 科室筛选（可选） |
| active | boolean | 是否在线（可选） |

**响应**:
```json
{
  "code": 200,
  "data": [
    {
      "id": "string",
      "username": "string",
      "name": "string",
      "title": "string",
      "department": "string",
      "avatar": "string",
      "experience": "string",
      "specialties": ["string"],
      "isActive": true
    }
  ]
}
```

### 2. 获取医生详情

**GET** `/api/doctors/{doctorId}`

获取医生详细信息。

**响应**:
```json
{
  "code": 200,
  "data": {
    "id": "string",
    "username": "string",
    "name": "string",
    "title": "string",
    "department": "string",
    "avatar": "string",
    "experience": "string",
    "specialties": ["string"],
    "isActive": true
  }
}
```

---

## 统计服务 API

### 1. 获取统计数据

**GET** `/api/statistics`

获取平台统计数据。

**响应**:
```json
{
  "code": 200,
  "data": {
    "totalDoctors": 5,
    "totalQuestions": 100,
    "activeSessions": 10,
    "totalSessions": 4
  }
}
```

---

## 数据类型定义

### Doctor (医生)

```typescript
interface Doctor {
  id: string;
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
```

### Patient (患者)

```typescript
interface Patient {
  id: string;
  name: string;
  birthday: string;
  phone: string;
  gender: string;
}
```

### Question (问题)

```typescript
interface Question {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  question: string;
  submitTime: string;
  status: 'pending' | 'answered';
  answer: string | null;
  answerTime: string | null;
}
```

---

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权/登录失效 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 当前模拟数据

目前前端使用本地 JSON 数据模拟，未来 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 当前模拟数据

项目当前使用本地 JSON 文件模拟数据：

- `src/data/doctor-user-list.json` - 医生数据
- `src/data/patient-user.json` - 患者数据
- `src/data/question-list.json` - 问题数据

状态管理在 `src/store/index.ts` 中实现，提供以下方法：

| 方法 | 说明 |
|------|------|
| `loginDoctor(username, password)` | 医生登录 |
| `logoutDoctor()` | 医生登出 |
| `verifyPatient(name, birthday)` | 患者验证 |
| `logoutPatient()` | 患者登出 |
| `getQuestionsByDoctor(doctorId)` | 获取医生的问题列表 |
| `getQuestionsByPatient(patientId)` | 获取患者的问题列表 |
| `addQuestion(question)` | 添加新问题 |
| `answerQuestion(questionId, answer)` | 回答问题 |
| `getActiveDoctors()` | 获取在线医生 |
| `getStatistics()` | 获取统计数据 |
