# 数据模型文档

本文档描述后端系统的核心数据模型和实体设计。

## 数据模型概览

系统包含以下核心实体：

| 实体 | 说明 | 所属服务 |
|------|------|----------|
| User | 用户 | qa-service-user |
| Doctor | 医生 | qa-service-user |
| Patient | 患者 | qa-service-user |
| Question | 问题 | qa-service-question |

---

## 实体关系图

```
┌─────────────┐       ┌─────────────┐
│    User     │       │   Doctor    │
├─────────────┤       ├─────────────┤
│ id          │──┐    │ id          │
│ username    │  │    │ userId      │
│ password    │  └───>│ title       │
│ role        │       │ department  │
│ status      │       │ isActive    │
└─────────────┘       └──────┬──────┘
                             │
                             │ answers
                             ▼
┌─────────────┐       ┌─────────────┐
│   Patient   │       │  Question   │
├─────────────┤       ├─────────────┤
│ id          │       │ id          │
│ name        │◄──────│ patientId   │
│ birthday    │       │ patientName │
│ phone       │       │ doctorId    │
│ gender      │       │ doctorName  │
└─────────────┘       │ question    │
                      │ status      │
                      │ answer      │
                      └─────────────┘
```

---

## 实体定义

### 1. User (用户)

基础用户实体，存储登录信息。

```java
public class User {
    /**
     * 用户唯一标识
     */
    private String id;
    
    /**
     * 登录用户名
     */
    private String username;
    
    /**
     * 登录密码（加密存储）
     */
    private String password;
    
    /**
     * 用户角色：ADMIN, DOCTOR, PATIENT
     */
    private String role;
    
    /**
     * 账户状态：ACTIVE, INACTIVE, LOCKED
     */
    private String status;
    
    /**
     * 创建时间
     */
    private LocalDateTime createdAt;
    
    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;
}
```

**JSON 表示**:
```json
{
  "id": "user001",
  "username": "dr-zhang-wei",
  "password": "$2a$10$...",
  "role": "DOCTOR",
  "status": "ACTIVE",
  "createdAt": "2025-11-01T10:00:00",
  "updatedAt": "2025-11-01T10:00:00"
}
```

---

### 2. Doctor (医生)

医生信息实体。

```java
public class Doctor {
    /**
     * 医生唯一标识
     */
    private String id;
    
    /**
     * 关联用户ID
     */
    private String userId;
    
    /**
     * 医生姓名
     */
    private String name;
    
    /**
     * 职称：主任医师、副主任医师、主治医师、住院医师
     */
    private String title;
    
    /**
     * 所属科室
     */
    private String department;
    
    /**
     * 头像URL
     */
    private String avatar;
    
    /**
     * 临床经验描述
     */
    private String experience;
    
    /**
     * 专业特长列表
     */
    private List<String> specialties;
    
    /**
     * 是否在线接诊
     */
    private boolean isActive;
    
    /**
     * 创建时间
     */
    private LocalDateTime createdAt;
}
```

**JSON 表示**:
```json
{
  "id": "doc001",
  "userId": "user001",
  "name": "张伟医生",
  "title": "主任医师",
  "department": "心内科",
  "avatar": "https://example.com/avatar.jpg",
  "experience": "15年临床经验",
  "specialties": ["高血压", "冠心病", "心律失常"],
  "isActive": true,
  "createdAt": "2025-11-01T10:00:00"
}
```

---

### 3. Patient (患者)

患者信息实体。

```java
public class Patient {
    /**
     * 患者唯一标识
     */
    private String id;
    
    /**
     * 患者姓名
     */
    private String name;
    
    /**
     * 出生日期 (YYYY-MM-DD)
     */
    private String birthday;
    
    /**
     * 联系电话
     */
    private String phone;
    
    /**
     * 性别：男、女
     */
    private String gender;
    
    /**
     * 创建时间
     */
    private LocalDateTime createdAt;
}
```

**JSON 表示**:
```json
{
  "id": "patient001",
  "name": "赵明",
  "birthday": "1985-03-15",
  "phone": "138****1234",
  "gender": "男",
  "createdAt": "2025-11-01T10:00:00"
}
```

---

### 4. Question (问题)

问诊问题实体。

```java
public class Question {
    /**
     * 问题唯一标识
     */
    private String id;
    
    /**
     * 提问患者ID
     */
    private String patientId;
    
    /**
     * 患者姓名
     */
    private String patientName;
    
    /**
     * 回答医生ID
     */
    private String doctorId;
    
    /**
     * 医生姓名
     */
    private String doctorName;
    
    /**
     * 问题内容
     */
    private String question;
    
    /**
     * 提交时间
     */
    private LocalDateTime submitTime;
    
    /**
     * 问题状态：pending(待回答)、answered(已回答)
     */
    private QuestionStatus status;
    
    /**
     * 医生回答内容
     */
    private String answer;
    
    /**
     * 回答时间
     */
    private LocalDateTime answerTime;
}

public enum QuestionStatus {
    PENDING,    // 待回答
    ANSWERED    // 已回答
}
```

**JSON 表示**:
```json
{
  "id": "q001",
  "patientId": "patient001",
  "patientName": "赵明",
  "doctorId": "doc001",
  "doctorName": "张伟医生",
  "question": "最近总是感觉胸闷气短，这是什么原因？",
  "submitTime": "2025-11-02T09:30:00",
  "status": "answered",
  "answer": "建议您做个心电图检查...",
  "answerTime": "2025-11-02T09:45:00"
}
```

---

## DTO 定义

### 请求 DTO

#### UserRequest

```java
public class UserRequest {
    @NotBlank(message = "用户名不能为空")
    private String username;
    
    @NotBlank(message = "密码不能为空")
    @Size(min = 6, message = "密码长度不能少于6位")
    private String password;
    
    @NotBlank(message = "姓名不能为空")
    private String name;
    
    private String phone;
    private String email;
}
```

#### QuestionRequest

```java
public class QuestionRequest {
    @NotBlank(message = "患者ID不能为空")
    private String patientId;
    
    @NotBlank(message = "患者姓名不能为空")
    private String patientName;
    
    @NotBlank(message = "医生ID不能为空")
    private String doctorId;
    
    @NotBlank(message = "医生姓名不能为空")
    private String doctorName;
    
    @NotBlank(message = "问题内容不能为空")
    @Size(max = 1000, message = "问题内容不能超过1000字")
    private String question;
}
```

#### AnswerRequest

```java
public class AnswerRequest {
    @NotBlank(message = "回答内容不能为空")
    @Size(max = 2000, message = "回答内容不能超过2000字")
    private String answer;
}
```

### 响应 DTO

#### ApiResponse (通用响应)

```java
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "success", data);
    }
    
    public static <T> ApiResponse<T> error(int code, String message) {
        return new ApiResponse<>(code, message, null);
    }
}
```

#### PageResponse (分页响应)

```java
public class PageResponse<T> {
    private long total;
    private int page;
    private int size;
    private List<T> list;
}
```

---

## 数据校验

### Bean Validation 注解

| 注解 | 说明 |
|------|------|
| `@NotNull` | 不能为 null |
| `@NotBlank` | 不能为空白字符串 |
| `@Size(min, max)` | 字符串长度范围 |
| `@Min`, `@Max` | 数值范围 |
| `@Email` | 邮箱格式 |
| `@Pattern(regexp)` | 正则匹配 |

### 校验示例

```java
@PostMapping
public ResponseEntity<ApiResponse<Question>> createQuestion(
        @Valid @RequestBody QuestionRequest request) {
    // 自动校验，失败会抛出 MethodArgumentNotValidException
    Question question = questionService.create(request);
    return ResponseEntity.ok(ApiResponse.success(question));
}
```

---

## 数据库表设计（规划）

### 用户表 (t_user)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) | 主键，UUID |
| username | VARCHAR(50) | 用户名，唯一 |
| password | VARCHAR(255) | 密码，加密 |
| role | VARCHAR(20) | 角色 |
| status | VARCHAR(20) | 状态 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### 医生表 (t_doctor)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) | 主键 |
| user_id | VARCHAR(36) | 外键，关联用户 |
| name | VARCHAR(50) | 姓名 |
| title | VARCHAR(50) | 职称 |
| department | VARCHAR(50) | 科室 |
| avatar | VARCHAR(255) | 头像 |
| experience | VARCHAR(100) | 经验 |
| is_active | BOOLEAN | 是否在线 |
| created_at | TIMESTAMP | 创建时间 |

### 患者表 (t_patient)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) | 主键 |
| name | VARCHAR(50) | 姓名 |
| birthday | DATE | 生日 |
| phone | VARCHAR(20) | 电话 |
| gender | VARCHAR(10) | 性别 |
| created_at | TIMESTAMP | 创建时间 |

### 问题表 (t_question)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | VARCHAR(36) | 主键 |
| patient_id | VARCHAR(36) | 外键，患者 |
| patient_name | VARCHAR(50) | 患者姓名（冗余） |
| doctor_id | VARCHAR(36) | 外键，医生 |
| doctor_name | VARCHAR(50) | 医生姓名（冗余） |
| question | TEXT | 问题内容 |
| submit_time | TIMESTAMP | 提交时间 |
| status | VARCHAR(20) | 状态 |
| answer | TEXT | 回答内容 |
| answer_time | TIMESTAMP | 回答时间 |

---

## 枚举定义

```java
// 用户角色
public enum UserRole {
    ADMIN,      // 管理员
    DOCTOR,     // 医生
    PATIENT     // 患者
}

// 用户状态
public enum UserStatus {
    ACTIVE,     // 正常
    INACTIVE,   // 停用
    LOCKED      // 锁定
}

// 问题状态
public enum QuestionStatus {
    PENDING,    // 待回答
    ANSWERED    // 已回答
}
```
