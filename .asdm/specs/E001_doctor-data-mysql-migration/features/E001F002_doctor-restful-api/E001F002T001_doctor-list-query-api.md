# Task: 医生列表查询API开发

**Date**: 2025-12-07  
**Author**: QA Healthcare Team  
**Status**: Draft  
**Parent Feature**: [医生数据RESTful API开发](./feature-prd.md)  
**Parent Epic**: [医生数据MySQL存储迁移](./../../epic-prd.md)

## 1. Task Overview

### 1.1 Task Description
开发医生列表查询的RESTful API端点，支持分页、筛选（按科室、职称、在线状态、专长）和排序功能，替换前端当前从JSON文件读取医生数据的方式。

### 1.2 Purpose
本任务为医生列表页面提供标准化的数据访问接口，实现前后端分离架构。通过API统一数据访问逻辑，提升系统性能、可扩展性和数据一致性，为后续功能扩展奠定基础。

### 1.3 Success Criteria
*定义本任务成功的具体标准：*
- API端点功能完整实现，支持所有筛选和分页参数
- 响应时间满足性能要求（P95 < 500ms）
- 与现有前端医生列表页面完全兼容
- 提供完整的API文档和测试用例
- 代码质量符合团队标准，测试覆盖率>80%

## 2. Relationship to Parent Feature

### 2.1 Feature Requirements Addressed
*本任务解决以下特征需求：*
- **F-US-001 医生列表查询API**: 支持分页查询、多条件筛选、排序功能
- **4.1 核心功能**: 医生列表查询功能实现
- **7.2 API规范**: 实现GET /api/v1/doctors端点
- **8.1 测试场景**: 功能测试和性能测试

### 2.2 Dependencies on Other Tasks
*本任务的依赖关系：*
- **E001F001 医生数据MySQL数据库设计**: 需要数据库表结构就绪
- **数据库迁移工具**: 需要医生数据已迁移到MySQL

## 3. Technical Specifications

### 3.1 Implementation Details
*基于实际代码库的详细实现说明：*

#### 3.1.1 当前架构分析
**前端现状**:
- 文件位置: `web/qa-web/src/views/Doctors.vue`
- 数据源: `web/qa-web/src/data/doctor-user-list.json`
- 状态管理: `web/qa-web/src/store/index.ts`
- 当前直接从JSON文件读取医生数据，无API调用

**后端现状**:
- 服务: `server/qa-service-user` (Spring Boot 3.5.7)
- 当前依赖: Spring Boot Starter Web, Actuator
- 需要新增: Spring Data JPA, MySQL驱动
- 当前只有TestController，需要创建Doctor相关Controller

#### 3.1.2 代码变更需求
**后端新增文件**:
1. **实体类**: `Doctor.java` - 医生数据实体
2. **Repository**: `DoctorRepository.java` - 数据访问层
3. **DTO类**: `DoctorDTO.java`, `DoctorPageDTO.java` - 数据传输对象
4. **Controller**: `DoctorController.java` - API控制器
5. **Service**: `DoctorService.java` - 业务逻辑层
6. **Specification**: `DoctorSpecification.java` - 动态查询条件

**后端修改文件**:
1. **pom.xml**: 添加MySQL和JPA依赖
2. **application.properties**: 配置数据库连接

**前端修改文件**:
1. **store/index.ts**: 修改数据获取方式，从API获取
2. **Doctors.vue**: 更新数据加载逻辑

#### 3.1.3 具体实现代码
**Doctor实体类**:
```java
// server/qa-service-user/src/main/java/com/leansofx/qaserviceuser/entity/Doctor.java
package com.leansofx.qaserviceuser.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "doctors")
@Data
public class Doctor {
    @Id
    private String id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String name;
    
    @ManyToOne
    @JoinColumn(name = "title_id")
    private Title title;
    
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
    
    private String avatar;
    private String experience;
    
    @ElementCollection
    @CollectionTable(name = "doctor_specialties", joinColumns = @JoinColumn(name = "doctor_id"))
    @Column(name = "specialty")
    private List<String> specialties;
    
    @Column(name = "is_active")
    private Boolean isActive;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

**DoctorController实现**:
```java
// server/qa-service-user/src/main/java/com/leansofx/qaserviceuser/controller/DoctorController.java
package com.leansofx.qaserviceuser.controller;

import com.leansofx.qaserviceuser.dto.DoctorPageDTO;
import com.leansofx.qaserviceuser.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
public class DoctorController {
    
    private final DoctorService doctorService;
    
    @GetMapping
    public ResponseEntity<DoctorPageDTO> getDoctors(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Boolean isActive,
            @RequestParam(required = false) String specialty,
            @PageableDefault(size = 10, sort = "name") Pageable pageable) {
        
        DoctorPageDTO result = doctorService.getDoctors(
            department, title, isActive, specialty, pageable);
        return ResponseEntity.ok(result);
    }
}
```

### 3.2 Architecture Considerations
*架构考虑：*
- **数据流变更**: 前端 → API调用 → 后端服务 → MySQL数据库
- **状态管理**: 前端store需要改为异步API调用
- **错误处理**: 统一的错误响应格式和异常处理
- **缓存策略**: 考虑添加Redis缓存提升性能

### 3.3 API设计
**端点**: `GET /api/v1/doctors`
**请求参数**:
```json
{
  "page": 0,          // 页码，从0开始
  "size": 10,         // 每页大小
  "department": "心内科", // 科室筛选
  "title": "主任医师",    // 职称筛选
  "isActive": true,   // 在线状态筛选
  "specialty": "高血压", // 专长筛选
  "sort": "name,asc"  // 排序字段和方向
}
```

**响应格式**:
```json
{
  "content": [
    {
      "id": "doc001",
      "username": "dr-zhang-wei",
      "name": "张伟医生",
      "title": "主任医师",
      "department": "心内科",
      "avatar": "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
      "experience": "15年临床经验",
      "specialties": ["高血压", "冠心病", "心律失常"],
      "isActive": true
    }
  ],
  "page": {
    "number": 0,
    "size": 10,
    "totalElements": 5,
    "totalPages": 1
  }
}
```

### 3.4 数据库变更
*需要创建的数据库表*:
```sql
-- 医生表
CREATE TABLE doctors (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    title_id INT,
    department_id INT,
    avatar TEXT,
    experience TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (title_id) REFERENCES titles(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- 医生专长表
CREATE TABLE doctor_specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id VARCHAR(50) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- 职称表
CREATE TABLE titles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- 科室表
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);
```

## 4. Implementation Steps

### 4.1 分步实施指南
1. **步骤1: 环境准备**
   - 操作: 安装MySQL数据库并创建数据库
   - 命令: `docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:8.0`
   - 验证: 数据库连接成功，创建qa_healthcare数据库

2. **步骤2: 后端依赖配置**
   - 操作: 更新pom.xml添加JPA和MySQL依赖
   - 文件: `server/qa-service-user/pom.xml`
   - 验证: Maven依赖下载成功，项目编译通过

3. **步骤3: 数据库配置**
   - 操作: 配置application.properties数据库连接
   - 文件: `server/qa-service-user/src/main/resources/application.properties`
   - 验证: 应用启动成功，数据库连接正常

4. **步骤4: 实体和Repository开发**
   - 操作: 创建Doctor实体类和Repository接口
   - 文件: 创建entity和repository包下的相关文件
   - 验证: JPA映射正确，基础CRUD操作正常

5. **步骤5: Service层开发**
   - 操作: 实现DoctorService业务逻辑
   - 文件: `DoctorService.java`和`DoctorSpecification.java`
   - 验证: 业务逻辑正确，动态查询条件工作正常

6. **步骤6: Controller层开发**
   - 操作: 实现DoctorController RESTful API
   - 文件: `DoctorController.java`和DTO类
   - 验证: API端点可访问，参数解析正确

7. **步骤7: 数据迁移和初始化**
   - 操作: 将现有JSON数据迁移到MySQL
   - 文件: 创建数据迁移脚本
   - 验证: 数据完整迁移，API返回正确数据

8. **步骤8: 前端集成**
   - 操作: 修改前端store调用API
   - 文件: `web/qa-web/src/store/index.ts`
   - 验证: 前端页面正常显示，数据从API获取

9. **步骤9: 测试和优化**
   - 操作: 编写单元测试和集成测试
   - 文件: 创建测试类和测试数据
   - 验证: 测试通过，性能达标

### 4.2 预估工作量
| 活动 | 预估时间 | 实际时间 | 备注 |
|------|----------|----------|------|
| **环境准备** | 2小时 | TBD | 数据库安装和配置 |
| **后端开发** | 16小时 | TBD | 实体、Repository、Service、Controller |
| **数据库设计** | 4小时 | TBD | 表结构设计和迁移脚本 |
| **前端集成** | 4小时 | TBD | store改造和API调用 |
| **测试编写** | 6小时 | TBD | 单元测试、集成测试 |
| **文档编写** | 2小时 | TBD | API文档和部署文档 |
| **代码审查** | 2小时 | TBD | 团队代码审查 |
| **总计** | **36小时** | **TBD** | 约4.5个工作日 |

## 5. Testing Requirements

### 5.1 单元测试
*单元测试要求：*
```java
// DoctorService单元测试示例
@ExtendWith(MockitoExtension.class)
class DoctorServiceTest {
    
    @Mock
    private DoctorRepository doctorRepository;
    
    @InjectMocks
    private DoctorService doctorService;
    
    @Test
    void getDoctors_shouldReturnPagedResult() {
        // 给定
        Pageable pageable = PageRequest.of(0, 10);
        Page<Doctor> mockPage = new PageImpl<>(List.of(createMockDoctor()));
        when(doctorRepository.findAll(any(Specification.class), eq(pageable)))
            .thenReturn(mockPage);
        
        // 当
        DoctorPageDTO result = doctorService.getDoctors(
            "心内科", "主任医师", true, "高血压", pageable);
        
        // 那么
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(doctorRepository).findAll(any(Specification.class), eq(pageable));
    }
}
```

### 5.2 集成测试
*集成测试场景：*
1. **API端点测试**: 验证GET /api/v1/doctors返回正确数据
2. **参数组合测试**: 测试各种筛选条件的组合
3. **分页测试**: 验证分页功能正常工作
4. **性能测试**: 验证响应时间<500ms (P95)
5. **错误处理测试**: 验证无效参数的错误响应

### 5.3 手动测试步骤
*手动测试流程：*
1. 启动后端服务: `cd server/qa-service-user && ./mvnw spring-boot:run`
2. 使用Postman测试API端点
3. 验证各种参数组合的返回结果
4. 检查分页功能是否正常
5. 验证响应时间和性能指标

### 5.4 测试数据需求
*测试数据要求：*
- **基础数据**: 至少10个医生记录，覆盖不同科室、职称
- **边界数据**: 空列表、单条记录、大量记录
- **异常数据**: 无效参数、超出范围的页码
- **性能数据**: 100+记录用于性能测试

## 6. Quality Requirements

### 6.1 代码质量标准
*代码质量要求：*
- **代码覆盖率**: > 80% (使用JaCoCo测量)
- **代码规范**: 符合团队Java编码规范
- **静态分析**: SonarQube扫描无严重问题
- **依赖检查**: 无安全漏洞依赖

### 6.2 性能要求
*性能指标：*
- **响应时间**: P95 < 500ms (列表查询)
- **并发支持**: 支持100+并发请求
- **内存使用**: 单次查询内存增长<50MB
- **数据库查询**: 单次API调用数据库查询<5次

### 6.3 安全要求
*安全标准：*
- **输入验证**: 所有请求参数验证和清理
- **SQL注入防护**: 使用JPA参数化查询
- **日志安全**: 不记录敏感信息
- **访问控制**: API端点访问日志记录

## 7. Deployment Instructions

### 7.1 部署前检查清单
- [ ] 所有单元测试通过
- [ ] 集成测试通过
- [ ] 性能测试达标
- [ ] 代码审查完成
- [ ] API文档完整
- [ ] 数据库迁移脚本就绪
- [ ] 回滚计划制定

### 7.2 部署步骤
1. **步骤1: 构建应用**
   ```bash
   cd server/qa-service-user
   ./mvnw clean package -DskipTests
   ```

2. **步骤2: 数据库迁移**
   ```bash
   # 执行数据库迁移脚本
   mysql -u root -p qa_healthcare < scripts/doctor_migration.sql
   ```

3. **步骤3: 部署服务**
   ```bash
   # 启动Spring Boot应用
   java -jar target/qa-service-user-0.0.1-SNAPSHOT.jar
   ```

4. **步骤4: 健康检查**
   ```bash
   # 验证服务健康状态
   curl http://localhost:8080/actuator/health
   ```

5. **步骤5: API验证**
   ```bash
   # 测试医生列表API
   curl "http://localhost:8080/api/v1/doctors?page=0&size=10"
   ```

### 7.3 回滚流程
*部署失败时的回滚步骤：*
1. 停止新版本服务
2. 恢复前端store到使用JSON文件版本
3. 如果数据库有变更，执行回滚脚本
4. 启动旧版本服务
5. 验证系统功能正常

## 8. Documentation Requirements

### 8.1 API文档
*需要提供的API文档：*
- **OpenAPI/Swagger文档**: 自动生成的API文档
- **API使用示例**: curl命令和代码示例
- **错误码说明**: 完整的错误响应说明
- **性能指标**: API性能基准数据

### 8.2 技术文档
*技术文档要求：*
- **架构设计文档**: 数据流和组件关系图
- **数据库设计文档**: 表结构和关系说明
- **部署指南**: 详细的环境部署步骤
- **故障排查**: 常见问题和解决方案

### 8.3 用户文档
*用户文档更新：*
- **开发者指南**: API集成指南
- **变更说明**: 前端集成变更说明
- **性能优化**: 使用建议和最佳实践

## 9. Risks and Issues

### 9.1 技术风险
| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| **数据库性能问题** | 中 | 高 | 1. 添加数据库索引<br>2. 查询优化<br>3. 考虑缓存层 |
| **API兼容性问题** | 高 | 中 | 1. 保持接口向后兼容<br>2. 充分的集成测试<br>3. 版本化API管理 |
| **前端集成延迟** | 中 | 中 | 1. 提供Mock API<br>2. 并行开发<br>3. 提前沟通接口规范 |

### 9.2 时间线风险
| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| **数据库依赖延迟** | 中 | 高 | 1. 使用H2内存数据库开发<br>2. 接口先行设计<br>3. 灵活调整开发顺序 |
| **复杂查询实现** | 中 | 中 | 1. 分阶段实现<br>2. 简化初始版本<br>3. 后续迭代优化 |

## 10. Acceptance Criteria

### 10.1 功能验收标准
- [ ] GET /api/v1/doctors端点功能完整实现
- [ ] 支持分页参数(page, size)和排序
- [ ] 支持科室、职称、在线状态、专长筛选
- [ ] 响应格式符合规范，包含分页信息
- [ ] 错误处理完善，返回标准错误响应

### 10.2 技术验收标准
- [ ] 代码覆盖率>80%，关键逻辑有测试覆盖
- [ ] 性能测试达标，P95响应时间<500ms
- [ ] 安全扫描通过，无高危漏洞
- [ ] 代码审查通过，符合团队规范
- [ ] API文档完整，包含OpenAPI文档

### 10.3 集成验收标准
- [ ] 前端医生列表页面正常显示数据
- [ ] 与现有系统完全兼容，无功能影响
- [ ] 数据库迁移完整，数据无丢失
- [ ] 监控系统集成，可监控API性能

## 11. Appendix

### 11.1 参考资料
- **父特征PRD**: [医生数据RESTful API开发](./feature-prd.md)
- **父史诗PRD**: [医生数据MySQL存储迁移](./../../epic-prd.md)
- **当前前端代码**: `web/qa-web/src/views/Doctors.vue`
- **当前数据文件**: `web/qa-web/src/data/doctor-user-list.json`
- **Spring Data JPA文档**: [官方指南](https://spring.io/projects/spring-data-jpa)

### 11.2 相关资源
*有用资源链接：*
- **MySQL文档**: https://dev.mysql.com/doc/
- **Spring Boot文档**: https://spring.io/projects/spring-boot
- **JPA规范**: https://jakarta.ee/specifications/persistence/
- **测试工具**: JUnit 5, Mockito, Testcontainers

### 11.3 注意事项
*实施注意事项：*
1. **数据一致性**: 迁移过程中确保数据一致性，避免数据丢失
2. **性能监控**: 上线后密切监控API性能，及时优化
3. **回滚准备**: 准备完整的回滚方案，确保系统稳定
4. **团队协作**: 与前端团队保持沟通，确保接口兼容

### 11.4 修订历史
| 版本 | 日期 | 作者 | 变更 |
|------|------|------|------|
| 1.0 | 2025-12-07 | QA Healthcare Team | 初始版本，基于代码库分析 |
| 1.1 | 2025-12-07 | QA Healthcare Team | 完善实现细节和测试要求 |