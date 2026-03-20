# 编码规范文档

本文档定义后端 Java 项目的编码规范和最佳实践。

## 目录

- [Java 编码规范](#java-编码规范)
- [Spring Boot 规范](#spring-boot-规范)
- [命名规范](#命名规范)
- [注释规范](#注释规范)
- [异常处理](#异常处理)
- [日志规范](#日志规范)
- [单元测试规范](#单元测试规范)

---

## Java 编码规范

### 基本规则

- **Java 版本**: Java 17
- **字符编码**: UTF-8
- **代码格式**: 遵循 Google Java Style Guide

### 源文件结构

```java
// 1. 包声明
package com.leansofx.qaserviceuser.controller;

// 2. 导入语句（按包名字母排序）
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.leansofx.qaserviceuser.service.UserService;

// 3. 类注释
/**
 * 用户控制器
 * 
 * @author QA Healthcare Team
 * @version 1.0
 */
// 4. 类声明
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    // 5. 常量定义
    private static final String DEFAULT_PAGE = "1";
    
    // 6. 成员变量
    private final UserService userService;
    
    // 7. 构造方法
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    // 8. 公共方法
    @GetMapping
    public List<User> getUsers() {
        return userService.findAll();
    }
    
    // 9. 私有方法
    private void validateUser(User user) {
        // ...
    }
}
```

### 代码风格

**缩进**:
- 使用 4 个空格缩进
- 不使用 Tab

**行长度**:
- 最大 120 字符

**大括号**:
- 采用 K&R 风格

```java
// ✅ 推荐
if (condition) {
    doSomething();
} else {
    doOther();
}

// ❌ 不推荐
if (condition)
{
    doSomething();
}
```

---

## Spring Boot 规范

### 启动类

```java
package com.leansofx.qaserviceuser;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QaServiceUserApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(QaServiceUserApplication.class, args);
    }
}
```

### 控制器

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;
    
    // 使用构造器注入
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(ApiResponse.success(users));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUser(@PathVariable String id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }
    
    @PostMapping
    public ResponseEntity<ApiResponse<User>> createUser(@Valid @RequestBody UserRequest request) {
        User user = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(user));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> updateUser(
            @PathVariable String id,
            @Valid @RequestBody UserRequest request) {
        User user = userService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success(user));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

### 服务层

```java
public interface UserService {
    List<User> findAll();
    User findById(String id);
    User create(UserRequest request);
    User update(String id, UserRequest request);
    void delete(String id);
}

@Service
@Transactional
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public User findById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found: " + id));
    }
    
    @Override
    public User create(UserRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        return userRepository.save(user);
    }
    
    // ...
}
```

### 配置类

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

---

## 命名规范

### 包命名

| 包名 | 说明 |
|------|------|
| `config` | 配置类 |
| `controller` | REST 控制器 |
| `service` | 业务服务 |
| `repository` | 数据访问 |
| `entity` | 实体类 |
| `dto` | 数据传输对象 |
| `exception` | 异常类 |
| `util` | 工具类 |

### 类命名

| 类型 | 后缀/前缀 | 示例 |
|------|----------|------|
| Controller | Controller | `UserController` |
| Service | Service | `UserService` |
| ServiceImpl | ServiceImpl | `UserServiceImpl` |
| Repository | Repository | `UserRepository` |
| Entity | 无后缀 | `User` |
| Request DTO | Request | `CreateUserRequest` |
| Response DTO | Response | `UserResponse` |
| Config | Config | `CorsConfig` |
| Exception | Exception | `NotFoundException` |
| Util | Util | `DateUtil` |
| Constant | Constants | `UserConstants` |

### 方法命名

| 操作 | 前缀 | 示例 |
|------|------|------|
| 查询单个 | get/find | `getUserById`, `findById` |
| 查询列表 | list/find | `listUsers`, `findAll` |
| 创建 | create/save | `createUser` |
| 更新 | update | `updateUser` |
| 删除 | delete | `deleteUser` |
| 判断 | is/has/can | `isActive`, `hasPermission` |
| 转换 | to/convert | `toEntity`, `convertToDto` |
| 验证 | validate | `validateUser` |

### 变量命名

```java
// ✅ 推荐
private String userName;
private List<User> userList;
private boolean isActive;
private int totalCount;

// ❌ 不推荐
private String user_name;
private List<User> users;
private boolean active;
private int count;
```

### 常量命名

```java
// 全大写，下划线分隔
public static final String DEFAULT_CHARSET = "UTF-8";
public static final int MAX_PAGE_SIZE = 100;
public static final long TOKEN_EXPIRE_TIME = 3600000L;
```

---

## 注释规范

### 类注释

```java
/**
 * 用户控制器，提供用户管理相关的 REST API
 * 
 * <p>提供以下功能：
 * <ul>
 *     <li>用户查询</li>
 *     <li>用户创建</li>
 *     <li>用户更新</li>
 *     <li>用户删除</li>
 * </ul>
 * 
 * @author QA Healthcare Team
 * @version 1.0
 * @since 2025-11-03
 */
@RestController
public class UserController {
    // ...
}
```

### 方法注释

```java
/**
 * 根据ID查询用户
 * 
 * @param id 用户ID，不能为空
 * @return 用户信息
 * @throws NotFoundException 用户不存在时抛出
 */
public User findById(String id) {
    // ...
}
```

### 行内注释

```java
// 验证用户权限
if (!hasPermission(user)) {
    throw new ForbiddenException("No permission");
}

// TODO: 待实现缓存机制
// FIXME: 存在并发问题
```

---

## 异常处理

### 全局异常处理器

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(NotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(404, e.getMessage()));
    }
    
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusiness(BusinessException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(400, e.getMessage()));
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(500, "Internal server error"));
    }
}
```

### 自定义异常

```java
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}

public class BusinessException extends RuntimeException {
    private final String code;
    
    public BusinessException(String code, String message) {
        super(message);
        this.code = code;
    }
}
```

---

## 日志规范

### 日志级别使用

| 级别 | 用途 |
|------|------|
| ERROR | 错误，需要立即处理 |
| WARN | 警告，潜在问题 |
| INFO | 重要业务流程 |
| DEBUG | 调试信息 |
| TRACE | 详细追踪信息 |

### 日志示例

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserServiceImpl implements UserService {
    
    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
    
    public User create(UserRequest request) {
        log.info("Creating user with email: {}", request.getEmail());
        
        try {
            User user = new User();
            // ...
            User saved = userRepository.save(user);
            log.info("User created successfully: {}", saved.getId());
            return saved;
        } catch (Exception e) {
            log.error("Failed to create user: {}", request.getEmail(), e);
            throw new BusinessException("CREATE_FAILED", "创建用户失败");
        }
    }
}
```

---

## 单元测试规范

### 测试类命名

```java
// 测试类：被测试类 + Test
class UserServiceTest {
    
    // 测试方法：方法名_场景_预期结果
    @Test
    void findById_ExistingId_ReturnsUser() {
        // given
        String id = "user001";
        
        // when
        User result = userService.findById(id);
        
        // then
        assertNotNull(result);
        assertEquals(id, result.getId());
    }
    
    @Test
    void findById_NonExistingId_ThrowsNotFoundException() {
        // given
        String id = "nonexistent";
        
        // when & then
        assertThrows(NotFoundException.class, 
            () -> userService.findById(id));
    }
}
```

### 测试注解

```java
@SpringBootTest
class UserControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    void getUser_ShouldReturnUser() throws Exception {
        // given
        User user = new User("user001", "张三");
        when(userService.findById("user001")).thenReturn(user);
        
        // when & then
        mockMvc.perform(get("/api/users/user001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value("user001"));
    }
}
```

---

## 代码检查工具

### 推荐配置

项目建议使用以下工具：

- **Checkstyle**: 代码风格检查
- **SpotBugs**: 潜在 Bug 检测
- **SonarQube**: 代码质量分析

### Maven 插件

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-checkstyle-plugin</artifactId>
    <version>3.3.0</version>
</plugin>
```

---

## 参考资料

- [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- [Spring Boot Best Practices](https://spring.io/guides)
- [Java Coding Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-contents.html)
