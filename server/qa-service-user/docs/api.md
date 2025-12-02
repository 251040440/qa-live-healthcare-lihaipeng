# QA Service User API 文档

## 概述

QA Service User 是医疗问答系统的用户管理服务，基于 Spring Boot 3.5.7 构建。

**服务信息：**
- 服务名称：qa-service-user
- 版本：0.0.1-SNAPSHOT
- 端口：8080
- 基础路径：http://localhost:8080

## API 端点列表

### TestController

**文件位置：** [../src/main/java/com/leansofx/qaserviceuser/controller/TestController.java](../src/main/java/com/leansofx/qaserviceuser/controller/TestController.java)

测试控制器，主要用于 CORS 配置测试和服务健康检查。

| 方法 | 端点 | 描述 | 参数 | 请求体 | 响应 |
|--------|----------|-------------|------------|--------------|----------|
| GET | `/api/test/cors` | 测试 CORS 配置（GET 请求） | 无 | 无 | TestResponse |
| POST | `/api/test/cors` | 测试 CORS 配置（POST 请求） | 无 | Map<String, Object>（可选） | TestResponse |
| OPTIONS | `/api/test/cors` | 处理 CORS 预检请求 | 无 | 无 | 无内容 |

### DoctorUserController

**文件位置：** [../src/main/java/com/leansofx/qaserviceuser/controller/DoctorUserController.java](../src/main/java/com/leansofx/qaserviceuser/controller/DoctorUserController.java)

医生用户管理控制器，提供医生用户的增删改查、认证和相关查询功能。

| 方法 | 端点 | 描述 | 参数 | 请求体 | 响应 |
|--------|----------|-------------|------------|--------------|----------|
| POST | `/api/doctors` | 创建医生用户 | 无 | DoctorUserCreateRequest | DoctorUserResponse |
| GET | `/api/doctors` | 获取所有医生用户 | 无 | 无 | List<DoctorUserResponse> |
| GET | `/api/doctors/{id}` | 根据ID获取医生用户 | id: 用户ID | 无 | DoctorUserResponse |
| GET | `/api/doctors/username/{username}` | 根据用户名获取医生用户 | username: 用户名 | 无 | DoctorUserResponse |
| GET | `/api/doctors/active` | 获取所有活跃的医生用户 | 无 | 无 | List<DoctorUserResponse> |
| GET | `/api/doctors/department/{department}` | 根据科室获取医生用户 | department: 科室名称 | 无 | List<DoctorUserResponse> |
| GET | `/api/doctors/department/{department}/active` | 获取指定科室的活跃医生用户 | department: 科室名称 | 无 | List<DoctorUserResponse> |
| GET | `/api/doctors/search` | 根据姓名搜索医生用户 | name: 医生姓名 | 无 | List<DoctorUserResponse> |
| PUT | `/api/doctors/{id}` | 更新医生用户信息 | id: 用户ID | DoctorUserCreateRequest | DoctorUserResponse |
| DELETE | `/api/doctors/{id}` | 删除医生用户 | id: 用户ID | 无 | Map<String, String> |
| POST | `/api/doctors/authenticate` | 医生用户认证 | 无 | Map<String, String> | DoctorUserResponse |
| GET | `/api/doctors/exists/{username}` | 检查用户名是否存在 | username: 用户名 | 无 | Map<String, Boolean> |
| GET | `/api/doctors/count` | 获取医生用户总数 | 无 | 无 | Map<String, Long> |

#### 数据结构示例

**TestResponse（测试响应）**
```json
{
  "message": "CORS configuration is working!",
  "timestamp": 1699000000000,
  "service": "qa-service-user",
  "receivedData": {
    "key": "value"
  }
}
```

**请求体示例（POST /api/test/cors）**
```json
{
  "testData": "example",
  "userId": 123,
  "action": "test"
}
```

**DoctorUserCreateRequest（医生用户创建请求）**
```json
{
  "username": "doctor001",
  "password": "password123",
  "name": "张医生",
  "title": "主任医师",
  "department": "内科",
  "avatar": "https://example.com/avatar.jpg",
  "experience": "10年临床经验",
  "specialties": ["心血管", "高血压"],
  "isActive": true
}
```

**DoctorUserResponse（医生用户响应）**
```json
{
  "id": "doc_123456",
  "username": "doctor001",
  "name": "张医生",
  "title": "主任医师",
  "department": "内科",
  "avatar": "https://example.com/avatar.jpg",
  "experience": "10年临床经验",
  "specialties": ["心血管", "高血压"],
  "isActive": true
}
```

**认证请求体（POST /api/doctors/authenticate）**
```json
{
  "username": "doctor001",
  "password": "password123"
}
```

**删除成功响应（DELETE /api/doctors/{id}）**
```json
{
  "message": "医生用户删除成功"
}
```

**用户名存在检查响应（GET /api/doctors/exists/{username}）**
```json
{
  "exists": true
}
```

**医生用户总数响应（GET /api/doctors/count）**
```json
{
  "count": 50
}
```

## Spring Boot Actuator 端点

项目集成了 Spring Boot Actuator，提供了以下监控和管理端点：

| 方法 | 端点 | 描述 | 参数 | 请求体 | 响应 |
|--------|----------|-------------|------------|--------------|----------|
| GET | `/actuator/health` | 应用健康检查 | 无 | 无 | HealthResponse |
| GET | `/actuator/info` | 应用信息 | 无 | 无 | InfoResponse |
| GET | `/actuator/metrics` | 应用指标 | 无 | 无 | MetricsResponse |
| GET | `/actuator/env` | 环境信息 | 无 | 无 | EnvironmentResponse |
| GET | `/actuator/beans` | Spring Bean 信息 | 无 | 无 | BeansResponse |
| GET | `/actuator/loggers` | 日志配置信息 | 无 | 无 | LoggersResponse |

#### Actuator 数据结构示例

**HealthResponse（健康检查响应）**
```json
{
  "status": "UP",
  "components": {
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 499963174912,
        "free": 123456789012,
        "threshold": 10485760,
        "exists": true
      }
    },
    "ping": {
      "status": "UP"
    }
  }
}
```

**InfoResponse（应用信息响应）**
```json
{
  "app": {
    "name": "qa-service-user",
    "description": "QA Service User - Healthcare QA System User Management Service",
    "version": "0.0.1-SNAPSHOT",
    "encoding": "UTF-8",
    "java": {
      "version": "17"
    }
  },
  "team": "QA Healthcare Team",
  "environment": "development",
  "build": {
    "timestamp": "2025-11-03"
  },
  "features": "CORS,Actuator,Health Checks,User Management",
  "java": {
    "version": "17.0.x",
    "vendor": "Eclipse Adoptium"
  },
  "os": {
    "name": "Linux",
    "version": "x.x.x",
    "arch": "amd64"
  }
}
```

## CORS 配置

服务已配置跨域资源共享（CORS），支持以下配置：

- **允许的源**：`*`（所有源）
- **允许的方法**：`GET, POST, PUT, DELETE, OPTIONS`
- **允许的头部**：`*`（所有头部）
- **允许凭证**：`false`
- **最大缓存时间**：`3600` 秒

## 错误响应格式

当 API 调用出现错误时，服务会返回标准的错误响应格式：

```json
{
  "timestamp": "2025-11-03T10:15:30.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "详细错误信息",
  "path": "/api/test/cors"
}
```

## 使用示例

### 测试 CORS 配置

**GET 请求示例：**
```bash
curl -X GET http://localhost:8080/api/test/cors
```

**POST 请求示例：**
```bash
curl -X POST http://localhost:8080/api/test/cors \
  -H "Content-Type: application/json" \
  -d '{"testData": "example", "userId": 123}'
```

**健康检查示例：**
```bash
curl -X GET http://localhost:8080/actuator/health
```

### 医生用户管理

**创建医生用户：**
```bash
curl -X POST http://localhost:8080/api/doctors \
  -H "Content-Type: application/json" \
  -d '{
    "username": "doctor001",
    "password": "password123",
    "name": "张医生",
    "title": "主任医师",
    "department": "内科",
    "avatar": "https://example.com/avatar.jpg",
    "experience": "10年临床经验",
    "specialties": ["心血管", "高血压"],
    "isActive": true
  }'
```

**获取所有医生用户：**
```bash
curl -X GET http://localhost:8080/api/doctors
```

**根据ID获取医生用户：**
```bash
curl -X GET http://localhost:8080/api/doctors/doc_123456
```

**根据用户名获取医生用户：**
```bash
curl -X GET http://localhost:8080/api/doctors/username/doctor001
```

**获取活跃医生用户：**
```bash
curl -X GET http://localhost:8080/api/doctors/active
```

**根据科室获取医生用户：**
```bash
curl -X GET http://localhost:8080/api/doctors/department/内科
```

**搜索医生用户（按姓名）：**
```bash
curl -X GET "http://localhost:8080/api/doctors/search?name=张医生"
```

**更新医生用户信息：**
```bash
curl -X PUT http://localhost:8080/api/doctors/doc_123456 \
  -H "Content-Type: application/json" \
  -d '{
    "username": "doctor001",
    "password": "newpassword123",
    "name": "张医生",
    "title": "副主任医师",
    "department": "心内科",
    "avatar": "https://example.com/new_avatar.jpg",
    "experience": "12年临床经验",
    "specialties": ["心血管", "高血压", "心律失常"],
    "isActive": true
  }'
```

**删除医生用户：**
```bash
curl -X DELETE http://localhost:8080/api/doctors/doc_123456
```

**医生用户认证：**
```bash
curl -X POST http://localhost:8080/api/doctors/authenticate \
  -H "Content-Type: application/json" \
  -d '{
    "username": "doctor001",
    "password": "password123"
  }'
```

**检查用户名是否存在：**
```bash
curl -X GET http://localhost:8080/api/doctors/exists/doctor001
```

**获取医生用户总数：**
```bash
curl -X GET http://localhost:8080/api/doctors/count
```

## 注意事项

1. 当前项目处于开发阶段，仅包含测试端点
2. 所有 API 端点都支持 CORS
3. Actuator 端点提供了丰富的监控和管理功能
4. 建议在生产环境中限制 CORS 配置和 Actuator 端点的访问权限

## 版本历史

- **v0.0.1-SNAPSHOT**：初始版本，包含基础的 CORS 测试功能和 Actuator 监控
- **v0.0.2-SNAPSHOT**：新增医生用户管理功能，包括用户 CRUD 操作、认证、查询等功能