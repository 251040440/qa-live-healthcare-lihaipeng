# Task: 医生详情查询API开发

**Date**: 2025-12-07  
**Author**: QA Healthcare Team  
**Status**: Draft  
**Parent Feature**: [医生数据RESTful API开发](./feature-prd.md)  
**Parent Epic**: [医生数据MySQL存储迁移](./../../epic-prd.md)

## 1. Task Overview

### 1.1 Task Description
开发医生详情查询的RESTful API端点，支持通过医生ID或用户名查询单个医生的完整信息，包括基本信息、专长列表、在线状态等。

### 1.2 Purpose
为医生详情页面提供标准化的数据访问接口，支持医生个人主页、咨询页面等场景。通过API提供完整的医生信息，确保数据一致性和实时性，提升用户体验。

### 1.3 Success Criteria
*定义本任务成功的具体标准：*
- 实现通过ID查询医生详情的API端点
- 实现通过用户名查询医生详情的API端点  
- 响应时间满足性能要求（P95 < 200ms）
- 返回完整的医生信息，包括所有相关字段
- 提供完善的错误处理（医生不存在等情况）
- 代码质量符合团队标准，测试覆盖率>80%

## 2. Relationship to Parent Feature

### 2.1 Feature Requirements Addressed
*本任务解决以下特征需求：*
- **F-US-002 医生详情查询API**: 通过医生ID或用户名查询完整信息
- **4.1 核心功能**: 医生详情查询功能实现
- **7.2 API规范**: 实现GET /api/v1/doctors/{id}和GET /api/v1/doctors/by-username/{username}端点
- **8.1 测试场景**: 功能测试和性能测试

### 2.2 Dependencies on Other Tasks
*本任务的依赖关系：*
- **E001F002T001 医生列表查询API**: 需要相同的数据库实体和基础架构
- **E001F001 医生数据MySQL数据库设计**: 需要数据库表结构就绪
- **数据库迁移工具**: 需要医生数据已迁移到MySQL

## 3. Technical Specifications

### 3.1 Implementation Details
*基于实际代码库的详细实现说明：*

#### 3.1.1 当前架构分析
**前端现状**:
- 医生详情查看主要通过医生列表页面跳转
- 当前使用store中的getDoctorByUsername方法从本地JSON数据查找
- 需要改造为通过API获取实时数据

**后端现状**:
- 基于E001F002T001任务的基础架构
- 已有Doctor实体、Repository和Service基础
- 需要新增详情查询的Service方法和Controller端点

#### 3.1.2 代码变更需求
**后端新增/修改文件**:
1. **Service方法**: 在DoctorService中添加getDoctorById和getDoctorByUsername方法
2. **Controller端点**: 在DoctorController中添加两个详情查询端点
3. **异常处理**: 新增DoctorNotFoundException和统一异常处理
4. **DTO扩展**: 可能需要更详细的DoctorDetailDTO

**前端修改文件**:
1. **store/index.ts**: 修改getDoctorByUsername方法调用API
2. **相关页面**: 更新医生详情相关页面的数据获取逻辑

#### 3.1.3 具体实现代码
**DoctorService新增方法**:
```java
// server/qa-service-user/src/main/java/com/leansofx/qaserviceuser/service/DoctorService.java
@Service
@RequiredArgsConstructor
public class DoctorService {
    
    private final DoctorRepository doctorRepository;
    
    // 现有列表查询方法...
    
    /**
     * 根据ID查询医生详情
     */
    public DoctorDTO getDoctorById(String id) {
        Doctor doctor = doctorRepository.findById(id)
            .orElseThrow(() -> new DoctorNotFoundException("Doctor not found with id: " + id));
        return convertToDTO(doctor);
    }
    
    /**
     * 根据用户名查询医生详情
     */
    public DoctorDTO getDoctorByUsername(String username) {
        Doctor doctor = doctorRepository.findByUsername(username)
            .orElseThrow(() -> new DoctorNotFoundException("Doctor not found with username: " + username));
        return convertToDTO(doctor);
    }
    
    /**
     * 实体转DTO转换方法
     */
    private DoctorDTO convertToDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setUsername(doctor.getUsername());
        dto.setName(doctor.getName());
        dto.setTitle(doctor.getTitle() != null ? doctor.getTitle().getName() : null);
        dto.setDepartment(doctor.getDepartment() != null ? doctor.getDepartment().getName() : null);
        dto.setAvatar(doctor.getAvatar());
        dto.setExperience(doctor.getExperience());
        dto.setSpecialties(doctor.getSpecialties());
        dto.setIsActive(doctor.getIsActive());
        dto.setCreatedAt(doctor.getCreatedAt());
        dto.setUpdatedAt(doctor.getUpdatedAt());
        return dto;
    }
}
```

**DoctorController新增端点**:
```java
// server/qa-service-user/src/main/java/com/leansofx/qaserviceuser/controller/DoctorController.java
@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
public class DoctorController {
    
    private final DoctorService doctorService;
    
    // 现有列表查询端点...
    
    /**
     * 根据ID查询医生详情
     */
    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable String id) {
        DoctorDTO doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctor);
    }
    
    /**
     * 根据用户名查询医生详情
     */
    @GetMapping("/by-username/{username}")
    public ResponseEntity<DoctorDTO> getDoctorByUsername(@PathVariable String username) {
        DoctorDTO doctor = doctorService.getDoctorByUsername(username);
        return ResponseEntity.ok(doctor);
    }
}
```

**自定义异常类**:
```java
// server/qa-service-user/src/main/java/com/leansofx/qaserviceuser/exception/DoctorNotFoundException.java
package com.leansofx.qaserviceuser.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DoctorNotFoundException extends RuntimeException {
    
    public DoctorNotFoundException(String message) {
        super(message);
    }
    
    public DoctorNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

**Repository新增查询方法**:
```java
// server/qa-service-user/src/main/java/com/leansofx/qaserviceuser/repository/DoctorRepository.java
public interface DoctorRepository extends JpaRepository<Doctor, String>, JpaSpecificationExecutor<Doctor> {
    
    // 现有方法...
    
    /**
     * 根据用户名查询医生
     */
    Optional<Doctor> findByUsername(String username);
    
    /**
     * 根据用户名查询且在线
     */
    Optional<Doctor> findByUsernameAndIsActiveTrue(String username);
}
```

### 3.2 Architecture Considerations
*架构考虑：*
- **缓存策略**: 考虑为详情查询添加缓存，提升性能
- **数据一致性**: 确保缓存与数据库数据一致性
- **错误处理**: 统一的404错误响应格式
- **安全考虑**: 敏感信息（如密码）不返回给前端

### 3.3 API设计
**端点1**: `GET /api/v1/doctors/{id}`
**示例请求**: `GET /api/v1/doctors/doc001`

**端点2**: `GET /api/v1/doctors/by-username/{username}`
**示例请求**: `GET /api/v1/doctors/by-username/dr-zhang-wei`

**响应格式**:
```json
{
  "id": "doc001",
  "username": "dr-zhang-wei",
  "name": "张伟医生",
  "title": "主任医师",
  "department": "心内科",
  "avatar": "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
  "experience": "15年临床经验",
  "specialties": ["高血压", "冠心病", "心律失常"],
  "isActive": true,
  "createdAt": "2025-12-07T10:00:00Z",
  "updatedAt": "2025-12-07T10:00:00Z"
}
```

**错误响应** (医生不存在):
```json
{
  "timestamp": "2025-12-07T10:00:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Doctor not found with id: invalid-id",
  "path": "/api/v1/doctors/invalid-id"
}
```

### 3.4 数据库优化
*查询优化建议：*
```sql
-- 为用户名添加索引，提升查询性能
CREATE INDEX idx_doctors_username ON doctors(username);

-- 为常用查询字段添加复合索引
CREATE INDEX idx_doctors_username_active ON doctors(username, is_active);
```

## 4. Implementation Steps

### 4.1 分步实施指南
1. **步骤1: 基础代码检查**
   - 操作: 确认E001F002T001任务的基础代码已就绪
   - 验证: Doctor实体、Repository、Service基础结构存在

2. **步骤2: Repository层扩展**
   - 操作: 在DoctorRepository中添加findByUsername方法
   - 文件: `DoctorRepository.java`
   - 验证: 方法定义正确，可通过测试

3. **步骤3: Service层开发**
   - 操作: 实现getDoctorById和getDoctorByUsername方法
   - 文件: `DoctorService.java`
   - 验证: 业务逻辑正确，异常处理完善

4. **步骤4: 异常处理**
   - 操作: 创建DoctorNotFoundException和全局异常处理
   - 文件: 创建exception包和相关类
   - 验证: 异常抛出和捕获机制工作正常

5. **步骤5: Controller层开发**
   - 操作: 添加两个详情查询端点
   - 文件: `DoctorController.java`
   - 验证: API端点可访问，参数绑定正确

6. **步骤6: DTO优化**
   - 操作: 完善DoctorDTO，包含完整字段
   - 文件: `DoctorDTO.java`
   - 验证: 数据转换正确，不包含敏感信息

7. **步骤7: 数据库优化**
   - 操作: 添加查询索引
   - 文件: 数据库迁移脚本
   - 验证: 查询性能提升

8. **步骤8: 测试开发**
   - 操作: 编写单元测试和集成测试
   - 文件: 创建测试类和测试数据
   - 验证: 测试覆盖所有场景，通过率100%

9. **步骤9: 前端集成准备**
   - 操作: 更新API文档，准备前端集成
   - 文件: OpenAPI文档和集成指南
   - 验证: 文档完整，前端团队可开始集成

### 4.2 预估工作量
| 活动 | 预估时间 | 实际时间 | 备注 |
|------|----------|----------|------|
| **代码分析** | 1小时 | TBD | 理解现有代码结构 |
| **Repository扩展** | 2小时 | TBD | 添加查询方法 |
| **Service层开发** | 4小时 | TBD | 业务逻辑和异常处理 |
| **Controller开发** | 3小时 | TBD | RESTful端点实现 |
| **异常处理** | 2小时 | TBD | 自定义异常和全局处理 |
| **测试编写** | 6小时 | TBD | 单元测试和集成测试 |
| **数据库优化** | 2小时 | TBD | 索引添加和性能优化 |
| **文档编写** | 2小时 | TBD | API文档和集成指南 |
| **代码审查** | 2小时 | TBD | 团队代码审查 |
| **总计** | **24小时** | **TBD** | 约3个工作日 |

## 5. Testing Requirements

### 5.1 单元测试
*单元测试要求：*
```java
// DoctorService详情查询测试
@ExtendWith(MockitoExtension.class)
class DoctorServiceDetailTest {
    
    @Mock
    private DoctorRepository doctorRepository;
    
    @InjectMocks
    private DoctorService doctorService;
    
    @Test
    void getDoctorById_shouldReturnDoctor_whenExists() {
        // 给定
        String doctorId = "doc001";
        Doctor mockDoctor = createMockDoctor();
        when(doctorRepository.findById(doctorId))
            .thenReturn(Optional.of(mockDoctor));
        
        // 当
        DoctorDTO result = doctorService.getDoctorById(doctorId);
        
        // 那么
        assertNotNull(result);
        assertEquals(doctorId, result.getId());
        verify(doctorRepository).findById(doctorId);
    }
    
    @Test
    void getDoctorById_shouldThrowException_whenNotFound() {
        // 给定
        String doctorId = "non-existent";
        when(doctorRepository.findById(doctorId))
            .thenReturn(Optional.empty());
        
        // 当/那么
        assertThrows(DoctorNotFoundException.class, () -> {
            doctorService.getDoctorById(doctorId);
        });
    }
    
    @Test
    void getDoctorByUsername_shouldReturnDoctor_whenExists() {
        // 给定
        String username = "dr-zhang-wei";
        Doctor mockDoctor = createMockDoctor();
        when(doctorRepository.findByUsername(username))
            .thenReturn(Optional.of(mockDoctor));
        
        // 当
        DoctorDTO result = doctorService.getDoctorByUsername(username);
        
        // 那么
        assertNotNull(result);
        assertEquals(username, result.getUsername());
        verify(doctorRepository).findByUsername(username);
    }
}
```

### 5.2 集成测试
*集成测试场景：*
1. **成功场景测试**: 验证存在的医生ID/用户名返回正确数据
2. **不存在场景测试**: 验证不存在的医生返回404错误
3. **性能测试**: 验证响应时间<200ms (P95)
4. **缓存测试**: 如果实现缓存，验证缓存命中率
5. **并发测试**: 验证并发查询的数据一致性

### 5.3 手动测试步骤
*手动测试流程：*
1. 启动服务: `cd server/qa-service-user && ./mvnw spring-boot:run`
2. 使用真实医生ID测试: `GET /api/v1/doctors/doc001`
3. 使用真实用户名测试: `GET /api/v1/doctors/by-username/dr-zhang-wei`
4. 测试不存在的情况: `GET /api/v1/doctors/non-existent`
5. 验证响应格式和性能指标

### 5.4 测试数据需求
*测试数据要求：*
- **正常数据**: 至少5个医生记录，包含各种状态
- **边界数据**: 超长ID/用户名、特殊字符
- **性能数据**: 用于性能测试的大量数据
- **错误数据**: 不存在的ID/用户名

## 6. Quality Requirements

### 6.1 代码质量标准
*代码质量要求：*
- **代码覆盖率**: > 80%，重点测试异常场景
- **异常处理**: 所有可能异常都有适当处理
- **日志记录**: 关键操作有适当的日志记录
- **代码规范**: 符合团队Java编码规范

### 6.2 性能要求
*性能指标：*
- **响应时间**: P95 < 200ms (详情查询)
- **缓存命中率**: 如果实现缓存，目标>80%
- **数据库查询**: 单次详情查询最多2次数据库查询
- **内存使用**: 单次查询内存增长<20MB

### 6.3 安全要求
*安全标准：*
- **输入验证**: ID和用户名参数验证
- **SQL注入防护**: 使用JPA自动参数化
- **敏感信息**: 密码等敏感字段不返回
- **访问日志**: 记录详情查询访问日志

## 7. Deployment Instructions

### 7.1 部署前检查清单
- [ ] 所有单元测试通过
- [ ] 集成测试通过
- [ ] 性能测试达标
- [ ] 代码审查完成
- [ ] API文档完整
- [ ] 数据库索引已添加
- [ ] 监控配置就绪

### 7.2 部署步骤
1. **步骤1: 代码合并**
   ```bash
   # 确保代码已合并到主分支
   git checkout main
   git pull origin main
   ```

2. **步骤2: 构建应用**
   ```bash
   cd server/qa-service-user
   ./mvnw clean package
   ```

3. **步骤3: 数据库变更**
   ```bash
   # 执行索引添加脚本
   mysql -u root -p qa_healthcare < scripts/add_doctor_indexes.sql
   ```

4. **步骤4: 部署验证**
   ```bash
   # 启动服务
   java -jar target/qa-service-user-0.0.1-SNAPSHOT.jar &
   
   # 验证详情API
   curl "http://localhost:8080/api/v1/doctors/doc001"
   curl "http://localhost:8080/api/v1/doctors/by-username/dr-zhang-wei"
   ```

### 7.3 监控配置
*需要配置的监控项：*
1. **API成功率**: 监控详情查询API的成功率
2. **响应时间**: 监控P95和P99响应时间
3. **错误率**: 监控404和其他错误的比例
4. **缓存命中率**: 如果使用缓存，监控命中率

## 8. Documentation Requirements

### 8.1 API文档
*需要提供的API文档：*
- **端点说明**: 两个详情查询端点的详细说明
- **参数说明**: 路径参数的格式和要求
- **响应示例**: 成功和失败的响应示例
- **错误码**: 完整的错误码说明

### 8.2 集成指南
*前端集成指南：*
- **API调用示例**: Vue.js/TypeScript调用示例
- **错误处理**: 前端如何处理404等错误
- **性能优化**: 前端缓存建议
- **降级方案**: API不可用时的降级方案

### 8.3 运维文档
*运维相关文档：*
- **监控指标**: 需要监控的关键指标
- **告警规则**: 异常情况的告警规则
- **故障排查**: 常见问题排查指南
- **性能优化**: 性能调优建议

## 9. Risks and Issues

### 9.1 技术风险
| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| **查询性能问题** | 中 | 中 | 1. 添加数据库索引<br>2. 考虑查询缓存<br>3. 监控查询性能 |
| **数据不一致** | 低 | 高 | 1. 事务管理<br>2. 数据验证<br>3. 定期数据一致性检查 |
| **缓存一致性问题** | 中 | 中 | 1. 合理的缓存失效策略<br>2. 缓存更新机制<br>3. 监控缓存命中率 |

### 9.2 业务风险
| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| **医生信息泄露** | 低 | 高 | 1. 敏感信息过滤<br>2. 访问权限控制<br>3. 审计日志记录 |
| **API滥用** | 中 | 低 | 1. 速率限制<br>2. 请求验证<br>3. 监控异常访问 |

## 10. Acceptance Criteria

### 10.1 功能验收标准
- [ ] GET /api/v1/doctors/{id}端点功能完整
- [ ] GET /api/v1/doctors/by-username/{username}端点功能完整
- [ ] 返回完整的医生信息，格式正确
- [ ] 医生不存在时返回标准404错误
- [ ] 响应时间满足性能要求(P95 < 200ms)

### 10.2 技术验收标准
- [ ] 代码覆盖率>80%，异常场景有测试覆盖
- [ ] 数据库查询优化，添加必要索引
- [ ] 错误处理完善，有统一的错误响应格式
- [ ] 日志记录完整，便于问题排查
- [ ] API文档完整，包含OpenAPI文档

### 10.3 集成验收标准
- [ ] 与列表查询API数据格式一致
- [ ] 前端可顺利集成，无兼容性问题
- [ ] 监控系统集成，可监控API性能
- [ ] 部署流程顺畅，有完整的回滚方案

## 11. Appendix

### 11.1 参考资料
- **父特征PRD**: [医生数据RESTful API开发](./feature-prd.md)
- **相关任务**: [医生列表查询API](./E001F002T001_doctor-list-query-api.md)
- **Spring异常处理**: [官方指南](https://spring.io/guides/gs/rest-service/)
- **JPA查询优化**: [性能优化指南](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods)

### 11.2 相关资源
*有用资源链接：*
- **RESTful API设计**: https://restfulapi.net/
- **Spring Boot测试**: https://spring.io/guides/gs/testing-web/
- **MySQL索引优化**: https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html
- **性能测试工具**: JMeter, Gatling

### 11.3 注意事项
*实施注意事项：*
1. **数据安全**: 确保不返回密码等敏感信息
2. **性能监控**: 上线后密切监控查询性能
3. **缓存策略**: 根据实际访问模式调整缓存策略
4. **错误处理**: 用户友好的错误信息，避免技术细节泄露

### 11.4 修订历史
| 版本 | 日期 | 作者 | 变更 |
|------|------|------|------|
| 1.0 | 2025-12-07 | QA Healthcare Team | 初始版本 |
| 1.1 | 2025-12-07 | QA Healthcare Team | 完善测试要求和部署步骤 |