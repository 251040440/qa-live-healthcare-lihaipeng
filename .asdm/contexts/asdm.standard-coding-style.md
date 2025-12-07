# Standard Coding Style

## Overview
This document defines the coding standards and style guidelines for the QA Healthcare workspace. Consistent coding style improves readability, maintainability, and collaboration in this healthcare microservices project.

## General Principles

### 1. Readability First
- 代码应易于阅读和理解
- 为变量、函数和类使用有意义的名称
- 编写意图清晰的自文档化代码

### 2. Consistency
- 在整个代码库中遵循相同的模式
- 使用语言和框架的既定约定
- 保持团队成员间的一致性

### 3. Maintainability
- 编写易于修改和扩展的代码
- 保持函数和类的单一职责
- 避免不必要的复杂性

### 4. Healthcare Specific
- 医疗数据敏感性：特别注意数据保护和隐私
- 合规性要求：遵循医疗行业法规
- 错误处理：医疗系统需要更严格的错误处理

## Language-Specific Guidelines

### Java (Spring Boot Backend)

#### Naming Conventions
```java
// 类和接口 - PascalCase
public class UserService { }
public interface UserRepository { }

// 方法和变量 - camelCase
public void calculateTotal() { }
private String userName;

// 常量 - UPPER_SNAKE_CASE
public static final int MAX_RETRY_COUNT = 3;
private static final String API_BASE_URL = "https://api.example.com";

// 包名 - 全小写，公司域名反转
package com.leansofx.qaserviceuser.controller;
```

#### Code Formatting
```java
// 使用 4 空格缩进
public class Example {
    public void method() {
        if (condition) {
            // ...
        }
    }
}

// 开括号在同一行
public void example() {
    // ...
}

// 每行一个语句
// 错误示例
int a = 1; int b = 2;

// 正确示例
int a = 1;
int b = 2;

// 方法参数换行对齐
public User createUser(String username,
                       String email,
                       String password,
                       UserRole role) {
    // ...
}
```

#### Annotations and Modifiers
```java
// 标准修饰符顺序
public static final String CONSTANT = "value";

// 使用 @Override 注解
@Override
public String toString() {
    return "User";
}

// Spring 注解使用
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        // ...
    }
}
```

#### Healthcare Specific Java Code
```java
// 医疗数据实体类
@Entity
@Table(name = "medical_records")
public class MedicalRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String patientId;
    
    @Column(nullable = false)
    private LocalDateTime recordDate;
    
    @Column(length = 2000)
    private String diagnosis;
    
    @Column(length = 4000)
    private String treatmentPlan;
    
    // 敏感数据加密
    @Convert(converter = MedicalDataEncryptor.class)
    private String sensitiveNotes;
    
    // 审计字段
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```

### TypeScript (Vue.js Frontend)

#### Naming Conventions
```typescript
// 变量和函数 - camelCase
const userName = 'John';
function calculateTotal() { }

// 类和接口 - PascalCase
class UserService { }
interface UserData { }

// 常量 - UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// Vue 组件 - PascalCase
// 文件名: UserProfile.vue
// 组件名: UserProfile
```

#### Code Formatting
```typescript
// 使用 2 空格缩进
function example() {
  if (condition) {
    // ...
  }
}

// 使用分号
const name = 'John';

// 最大行长度: 100 字符
// 为可读性换行

// 使用单引号，除非是模板字符串
const message = 'Hello';
const template = `Hello ${name}`;

// 导入顺序: Vue, 第三方库, 本地模块
import { ref, computed } from 'vue';
import { defineComponent } from 'vue';
import { Button, Form, Input } from 'ant-design-vue';
import UserService from '@/services/user.service';
import type { User } from '@/types/user';
```

#### Type Annotations
```typescript
// 始终指定返回类型
function add(a: number, b: number): number {
  return a + b;
}

// 避免使用 'any'
// 错误
function process(data: any) { }

// 正确
function process(data: UserData) { }

// 使用 interface 定义对象形状
interface User {
  id: number;
  name: string;
  email: string;
  medicalLicense?: string; // 医疗相关字段
}

// Vue 组件类型
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserProfile',
  props: {
    userId: {
      type: Number,
      required: true,
    },
    userData: {
      type: Object as () => User,
      required: false,
    },
  },
  setup(props) {
    // 组件逻辑
  },
});
```

#### Healthcare Specific TypeScript
```typescript
// 医疗问题类型定义
interface MedicalQuestion {
  id: string;
  title: string;
  content: string;
  category: MedicalCategory;
  urgency: UrgencyLevel;
  patientAge: number;
  patientGender: Gender;
  symptoms: string[];
  // 敏感信息标记
  containsSensitiveInfo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

enum MedicalCategory {
  GENERAL = 'general',
  CARDIOLOGY = 'cardiology',
  NEUROLOGY = 'neurology',
  PEDIATRICS = 'pediatrics',
  DERMATOLOGY = 'dermatology',
}

enum UrgencyLevel {
  LOW = 'low',      // 非紧急
  MEDIUM = 'medium', // 一般紧急
  HIGH = 'high',    // 紧急
  CRITICAL = 'critical', // 危急
}

// 医疗数据验证
function validateMedicalQuestion(question: MedicalQuestion): ValidationResult {
  const errors: string[] = [];
  
  if (!question.title.trim()) {
    errors.push('问题标题不能为空');
  }
  
  if (question.content.length < 10) {
    errors.push('问题描述至少需要10个字符');
  }
  
  if (question.patientAge < 0 || question.patientAge > 150) {
    errors.push('患者年龄无效');
  }
  
  // 医疗特定验证
  if (question.urgency === UrgencyLevel.CRITICAL && !question.containsSensitiveInfo) {
    errors.push('危急问题必须包含敏感信息说明');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

## Common Patterns

### Error Handling

#### Java (Spring Boot)
```java
// 自定义医疗异常
public class MedicalServiceException extends RuntimeException {
    private final ErrorCode errorCode;
    
    public MedicalServiceException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public MedicalServiceException(ErrorCode errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }
}

// 全局异常处理
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MedicalServiceException.class)
    public ResponseEntity<ErrorResponse> handleMedicalServiceException(
            MedicalServiceException ex) {
        ErrorResponse error = new ErrorResponse(
            ex.getErrorCode(),
            ex.getMessage(),
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(
            AccessDeniedException ex) {
        // 医疗数据访问权限错误
        ErrorResponse error = new ErrorResponse(
            ErrorCode.ACCESS_DENIED,
            "无权访问该医疗数据",
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }
}
```

#### TypeScript (Vue.js)
```typescript
// API 错误处理
class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// 医疗 API 服务错误处理
class MedicalApiService {
  async submitQuestion(question: MedicalQuestion): Promise<SubmitResult> {
    try {
      const response = await apiClient.post('/api/questions', question);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        // 医疗特定错误处理
        if (error.code === 'INVALID_MEDICAL_DATA') {
          showMedicalValidationError(error.message);
        } else if (error.code === 'PATIENT_CONSENT_REQUIRED') {
          showConsentForm();
        } else {
          showGenericError(error.message);
        }
      } else {
        // 网络或其他错误
        showNetworkError();
      }
      throw error;
    }
  }
}
```

### Logging

#### Java Logging
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    
    public User createUser(CreateUserRequest request) {
        logger.info("创建用户开始: {}", request.getEmail());
        
        try {
            // 业务逻辑
            User user = userRepository.save(convertToEntity(request));
            
            logger.info("用户创建成功: userId={}, email={}", 
                user.getId(), user.getEmail());
            return user;
            
        } catch (DataIntegrityViolationException e) {
            logger.error("用户创建失败 - 数据完整性冲突: email={}", 
                request.getEmail(), e);
            throw new DuplicateEmailException("邮箱已存在");
            
        } catch (Exception e) {
            logger.error("用户创建失败 - 未知错误: email={}", 
                request.getEmail(), e);
            throw new ServiceException("用户创建失败", e);
        }
    }
    
    // 医疗数据访问日志（更详细）
    public MedicalRecord getMedicalRecord(Long recordId, Long userId) {
        logger.info("获取医疗记录: recordId={}, requestedBy={}", 
            recordId, userId);
        
        MedicalRecord record = medicalRecordRepository.findById(recordId)
            .orElseThrow(() -> {
                logger.warn("医疗记录不存在: recordId={}", recordId);
                return new RecordNotFoundException("医疗记录不存在");
            });
        
        // 检查访问权限
        if (!hasAccess(record, userId)) {
            logger.warn("无权限访问医疗记录: recordId={}, userId={}", 
                recordId, userId);
            throw new AccessDeniedException("无权访问该医疗记录");
        }
        
        logger.info("医疗记录访问成功: recordId={}, userId={}", 
            recordId, userId);
        return record;
    }
}
```

#### TypeScript Logging
```typescript
// 前端日志工具
class Logger {
  static debug(message: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }
  
  static info(message: string, data?: any) {
    console.info(`[INFO] ${message}`, data || '');
  }
  
  static warn(message: string, data?: any) {
    console.warn(`[WARN] ${message}`, data || '');
  }
  
  static error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error || '');
    
    // 医疗错误上报
    if (error?.isMedicalError) {
      this.reportMedicalError(error);
    }
  }
  
  private static reportMedicalError(error: MedicalError) {
    // 上报到医疗错误监控系统
    // 注意：不包含患者敏感信息
    const safeError = {
      code: error.code,
      message: error.message,
      timestamp: new Date().toISOString(),
      component: error.component,
      // 脱敏后的用户ID
      userId: error.userId ? this.maskUserId(error.userId) : undefined,
    };
    
    // 发送到错误收集服务
    errorReportingService.report(safeError);
  }
  
  private static maskUserId(userId: string): string {
    // 用户ID脱敏处理
    return `user_${userId.substring(0, 4)}***`;
  }
}

// 在 Vue 组件中使用
export default defineComponent({
  setup() {
    const submitMedicalForm = async () => {
      Logger.info('提交医疗表单开始');
      
      try {
        const result = await medicalService.submit(formData);
        Logger.info('医疗表单提交成功', { formId: result.id });
        return result;
      } catch (error) {
        Logger.error('医疗表单提交失败', error);
        throw error;
      }
    };
    
    return { submitMedicalForm };
  },
});
```

## Comments and Documentation

### When to Comment
- 解释 "为什么" 而不是 "什么"（代码应该自解释）
- 记录复杂的算法或业务逻辑
- 注明变通方案或临时解决方案
- 记录公共 API 和接口

### Comment Style

#### Java 注释
```java
/**
 * 创建新用户账户。
 * 
 * <p>此方法会验证用户输入，检查邮箱唯一性，并创建用户账户。
 * 对于医疗系统用户，会进行额外的资质验证。</p>
 * 
 * @param request 创建用户请求，包含用户基本信息
 * @return 创建成功的用户信息
 * @throws DuplicateEmailException 如果邮箱已存在
 * @throws InvalidMedicalLicenseException 如果是医疗人员且执照无效
 * @throws ServiceException 如果创建过程中发生其他错误
 * 
 * @see UserRepository#findByEmail(String)
 * @see MedicalLicenseValidator#validate(String)
 */
public User createUser(CreateUserRequest request) {
    // 验证邮箱唯一性
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        throw new DuplicateEmailException("邮箱已存在: " + request.getEmail());
    }
    
    // 如果是医疗人员，验证医疗执照
    if (request.getUserType() == UserType.MEDICAL_STAFF) {
        medicalLicenseValidator.validate(request.getMedicalLicense());
    }
    
    // 创建用户实体
    User user = convertToEntity(request);
    return userRepository.save(user);
}
```

#### TypeScript 注释
```typescript
/**
 * 提交医疗问题。
 * 
 * 此函数会验证问题数据，检查敏感信息标记，
 * 并根据紧急程度进行不同的处理流程。
 * 
 * @param question - 医疗问题数据
 * @param options - 提交选项（如是否匿名）
 * @returns 提交结果，包含问题ID和预计响应时间
 * 
 * @example
 * ```typescript
 * const result = await submitMedicalQuestion({
 *   title: '胸口疼痛咨询',
 *   content: '详细描述...',
 *   urgency: 'high'
 * });
 * ```
 * 
 * @throws {ValidationError} 当问题数据无效时
 * @throws {ApiError} 当API调用失败时
 */
async function submitMedicalQuestion(
  question: MedicalQuestion,
  options?: SubmitOptions
): Promise<SubmitResult> {
  // 验证问题数据
  const validation = validateMedicalQuestion(question);
  if (!validation.isValid) {
    throw new ValidationError('问题数据无效', validation.errors);
  }
  
  // 根据紧急程度处理
  if (question.urgency === UrgencyLevel.CRITICAL) {
    return await handleCriticalQuestion(question);
  }
  
  // 普通问题处理
  return await apiClient.post('/questions', {
    ...question,
    options,
  });
}

// 复杂算法的内联注释
// 使用 Dijkstra 算法计算药物相互作用风险评分
const riskScore = calculateDrugInteractionRisk(medications);
```

## Testing Standards

### Java Test Structure
```java
@SpringBootTest
@AutoConfigureMockMvc
class UserServiceTest {
    
    @Autowired
    private UserService userService;
    
    @MockBean
    private UserRepository userRepository;
    
    @MockBean
    private MedicalLicenseValidator licenseValidator;
    
    @Test
    void createUser_shouldReturnUser_whenValidDataProvided() {
        // Arrange
        CreateUserRequest request = CreateUserRequest.builder()
            .email("doctor@hospital.com")
            .name("张医生")
            .password("SecurePass123!")
            .userType(UserType.MEDICAL_STAFF)
            .medicalLicense("MED123456")
            .build();
            
        User savedUser = User.builder()
            .id(1L)
            .email(request.getEmail())
            .name(request.getName())
            .build();
            
        when(userRepository.findByEmail(request.getEmail()))
            .thenReturn(Optional.empty());
        when(userRepository.save(any(User.class)))
            .thenReturn(savedUser);
        
        // Act
        User result = userService.createUser(request);
        
        // Assert
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getEmail()).isEqualTo("doctor@hospital.com");
        verify(userRepository).findByEmail(request.getEmail());
        verify(licenseValidator).validate("MED123456");
    }
    
    @Test
    void createUser_shouldThrowException_whenEmailAlreadyExists() {
        // Arrange
        CreateUserRequest request = CreateUserRequest.builder()
            .email("existing@example.com")
            .name("Existing User")
            .password("password")
            .build();
            
        User existingUser = User.builder()
            .id(1L)
            .email(request.getEmail())
            .build();
            
        when(userRepository.findByEmail(request.getEmail()))
            .thenReturn(Optional.of(existingUser));
        
        // Act & Assert
        assertThatThrownBy(() -> userService.createUser(request))
            .isInstanceOf(DuplicateEmailException.class)
            .hasMessageContaining("邮箱已存在");
    }
}
```

### TypeScript Test Structure
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MedicalQuestionForm from './MedicalQuestionForm.vue';
import { UrgencyLevel } from '@/types/medical';

describe('MedicalQuestionForm', () => {
  let wrapper: any;
  
  beforeEach(() => {
    wrapper = mount(MedicalQuestionForm);
  });
  
  it('应该验证必填字段', async () => {
    // 尝试提交空表单
    await wrapper.find('form').trigger('submit');
    
    // 验证错误消息
    expect(wrapper.text()).toContain('问题标题不能为空');
    expect(wrapper.text()).toContain('问题描述不能为空');
  });
  
  it('应该成功提交有效数据', async () => {
    // 设置表单数据
    await wrapper.find('#title').setValue('医疗咨询标题');
    await wrapper.find('#content').setValue('详细的问题描述...');
    await wrapper.find(`[value="${UrgencyLevel.MEDIUM}"]`).setValue();
    
    // 模拟提交
    const submitSpy = vi.spyOn(wrapper.vm, 'handleSubmit');
    await wrapper.find('form').trigger('submit');
    
    // 验证提交被调用
    expect(submitSpy).toHaveBeenCalled();
  });
  
  it('应该显示危急问题的额外警告', async () => {
    // 选择危急级别
    await wrapper.find(`[value="${UrgencyLevel.CRITICAL}"]`).setValue();
    
    // 验证警告信息显示
    expect(wrapper.text()).toContain('危急问题需要立即处理');
    expect(wrapper.text()).toContain('请确保已获得患者同意');
  });
});
```

## Code Review Guidelines

### What to Look For
1. **功能性**: 代码是否按预期工作？
2. **可读性**: 代码是否易于理解？
3. **测试**: 是否有足够的测试？
4. **性能**: 是否有性能问题？
5. **安全性**: 是否有安全漏洞？特别是医疗数据安全
6. **可维护性**: 这些代码是否易于维护？
7. **合规性**: 是否符合医疗行业规范？

### Review Comments
- 建设性和具体性
- 提供替代方案，不仅仅是批评
- 关注代码，而不是人
- 使用 "我们" 语言："我们应该考虑..."

### 医疗特定审查要点
1. **数据隐私**: 是否妥善处理敏感医疗数据？
2. **访问控制**: 是否正确实施权限检查？
3. **审计日志**: 是否记录关键操作？
4. **错误处理**: 医疗错误是否得到适当处理？
5. **合规性**: 是否符合 HIPAA/GDPR 等法规？

## Tool Configuration

### Java (Checkstyle)
```xml
<!-- checkstyle.xml -->
<?xml version="1.0"?>
<!DOCTYPE module PUBLIC
  "-//Checkstyle//DTD Checkstyle Configuration 1.3//EN"
  "https://checkstyle.org/dtds/configuration_1_3.dtd">
<module name="Checker">
  <module name="TreeWalker">
    <!-- 命名约定 -->
    <module name="ConstantName"/>
    <module name="LocalFinalVariableName"/>
    <module name="LocalVariableName"/>
    <module name="MemberName"/>
    <module name="MethodName"/>
    <module name="PackageName"/>
    <module name="ParameterName"/>
    <module name="StaticVariableName"/>
    <module name="TypeName"/>
    
    <!-- 导入 -->
    <module name="AvoidStarImport"/>
    <module name="IllegalImport"/>
    <module name="RedundantImport"/>
    <module name="UnusedImports"/>
    
    <!-- 大小 -->
    <module name="MethodLength">
      <property name="max" value="50"/>
    </module>
  </module>
</module>
```

### TypeScript (ESLint)
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended"
  ],
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-unused-vars": ["error", { 
      "argsIgnorePattern": "^_" 
    }],
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off"
  }
}
```

## Continuous Integration

### Pre-commit Hooks
- 运行代码检查和格式化
- 运行单元测试
- 检查安全漏洞
- 验证提交消息

### CI Pipeline
1. 代码检查和格式化验证
2. 单元测试
3. 集成测试
4. 构建验证
5. 安全扫描
6. 部署到测试环境

### 医疗系统特定 CI 要求
1. **安全扫描**: 特别关注医疗数据安全
2. **合规检查**: 验证是否符合医疗法规
3. **性能测试**: 确保系统响应时间满足医疗需求
4. **灾难恢复测试**: 验证数据备份和恢复流程

---

*这些编码标准应根据 QA Healthcare 项目的特定需求和团队偏好进行调整。鼓励定期审查和更新本文档。*