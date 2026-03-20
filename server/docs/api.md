# API 接口文档

本文档描述后端微服务提供的 RESTful API 接口。

## 服务概览

| 服务 | 基础路径 | 端口 | 说明 |
|------|----------|------|------|
| 用户服务 | http://localhost:8080 | 8080 | 用户管理、认证 |
| 问题服务 | http://localhost:8081 | 8081 | 问题管理、回答 |
| 统计服务 | 待配置 | 待定 | 数据统计、分析 |

---

## 用户服务 API (端口 8080)

### 基础信息

- **服务名称**: qa-service-user
- **版本**: 0.0.1-SNAPSHOT
- **基础路径**: http://localhost:8080

### 测试接口

#### GET /api/test/cors

测试 CORS 配置。

**请求**:
```
GET /api/test/cors
```

**响应**:
```json
{
  "message": "CORS configuration is working!",
  "timestamp": 1699000000000,
  "service": "qa-service-user"
}
```

#### POST /api/test/cors

测试 POST 请求 CORS。

**请求**:
```
POST /api/test/cors
Content-Type: application/json

{
  "testData": "example",
  "userId": 123
}
```

**响应**:
```json
{
  "message": "POST request with CORS is working!",
  "receivedData": {
    "testData": "example",
    "userId": 123
  },
  "timestamp": 1699000000000,
  "service": "qa-service-user"
}
```

### Actuator 端点

#### GET /actuator/health

健康检查端点。

**响应**:
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

#### GET /actuator/info

获取应用信息。

**响应**:
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

#### GET /actuator/metrics

获取应用指标列表。

#### GET /actuator/metrics/{metricName}

获取指定指标详情。

#### GET /actuator/env

获取环境变量信息。

#### GET /actuator/beans

获取 Spring Bean 信息。

#### GET /actuator/loggers

获取日志配置信息。

---

## 问题服务 API (端口 8081)

### 基础信息

- **服务名称**: qa-service-question
- **版本**: 0.0.1-SNAPSHOT
- **基础路径**: http://localhost:8081

### 接口规划

> 注：当前服务处于开发阶段，以下为规划接口。

#### GET /api/questions

获取问题列表。

**查询参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| doctorId | String | 否 | 医生ID |
| patientId | String | 否 | 患者ID |
| status | String | 否 | 状态：pending/answered |
| page | Integer | 否 | 页码，默认1 |
| size | Integer | 否 | 每页数量，默认10 |

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
        "id": "q001",
        "patientId": "patient001",
        "patientName": "张三",
        "doctorId": "doc001",
        "doctorName": "李医生",
        "question": "问题描述...",
        "submitTime": "2025-11-03T10:00:00",
        "status": "pending",
        "answer": null,
        "answerTime": null
      }
    ]
  }
}
```

#### POST /api/questions

提交新问题。

**请求体**:
```json
{
  "patientId": "patient001",
  "patientName": "张三",
  "doctorId": "doc001",
  "doctorName": "李医生",
  "question": "问题描述..."
}
```

**响应**:
```json
{
  "code": 200,
  "message": "问题提交成功",
  "data": {
    "id": "q002",
    "patientId": "patient001",
    "doctorId": "doc001",
    "question": "问题描述...",
    "submitTime": "2025-11-03T10:30:00",
    "status": "pending"
  }
}
```

#### PUT /api/questions/{id}/answer

回答问题。

**请求体**:
```json
{
  "answer": "医生回复内容..."
}
```

**响应**:
```json
{
  "code": 200,
  "message": "回答成功",
  "data": {
    "id": "q001",
    "status": "answered",
    "answer": "医生回复内容...",
    "answerTime": "2025-11-03T11:00:00"
  }
}
```

---

## 通用响应格式

### 成功响应

```json
{
  "code": 200,
  "message": "操作成功",
  "data": { ... }
}
```

### 错误响应

```json
{
  "timestamp": "2025-11-03T10:15:30.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "错误详情",
  "path": "/api/xxx"
}
```

---

## 错误码定义

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## CORS 配置

所有服务已配置跨域支持：

- **允许来源**: `*`（所有来源）
- **允许方法**: GET, POST, PUT, DELETE, OPTIONS
- **允许头部**: `*`
- **允许凭证**: true
- **缓存时间**: 3600秒

---

## 使用示例

### cURL 示例

```bash
# 测试 CORS
curl -X GET http://localhost:8080/api/test/cors

# 健康检查
curl -X GET http://localhost:8080/actuator/health

# POST 请求
curl -X POST http://localhost:8080/api/test/cors \
  -H "Content-Type: application/json" \
  -d '{"testData": "example"}'
```

### HTTPie 示例

```bash
# 测试 CORS
http GET http://localhost:8080/api/test/cors

# 健康检查
http GET http://localhost:8080/actuator/health
```

---

## 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| 0.0.1-SNAPSHOT | 2025-11-03 | 初始版本，基础 CORS 测试和 Actuator 监控 |
