# Feature PRD: 医生数据RESTful API开发

**Date**: 2025-12-07  
**Author**: QA Healthcare Team  
**Status**: Draft  
**Parent Epic**: [医生数据MySQL存储迁移](./../epic-prd.md)

## 1. Feature Overview

### 1.1 Feature Description
开发医生数据的RESTful API，提供医生信息的增删改查、筛选、分页等功能，替换前端直接读取JSON文件的方式，实现前后端分离的数据访问。

### 1.2 Business Value
本功能为系统提供标准化的数据访问接口，实现：
- **前后端分离**: 前端通过API访问数据，实现关注点分离
- **数据一致性**: 通过API统一数据访问逻辑，保证数据一致性
- **扩展性**: 支持未来功能扩展和第三方系统集成
- **安全性**: 通过API层实现访问控制和数据验证
- **监控性**: 通过API监控数据访问情况和系统性能

### 1.3 User Value
- **前端开发人员**: 获得稳定、标准的数据访问接口
- **系统管理员**: 通过API监控和管理医生数据
- **最终用户**: 享受更稳定、响应更快的系统体验
- **第三方开发者**: 未来可通过API集成其他系统

## 2. Relationship to Parent Epic

### 2.1 Epic Objectives Supported
*本功能支持以下史诗目标：*
- **性能优化**: 提升医生数据查询和操作的性能
- **可扩展性**: 建立可扩展的数据存储架构
- **向后兼容**: 保持现有接口的完全兼容性
- **数据完整性**: 确保数据的一致性和完整性

### 2.2 Dependencies on Other Features
*本功能的依赖关系：*
- **E001F001 医生数据MySQL数据库设计和表结构创建**: 依赖数据库表结构
- **E001F003 数据迁移工具开发**: 为API提供数据源
- **E001F004 前端医生列表页面改造**: 消费本功能提供的API

## 3. User Stories

### 3.1 Target User Personas
- **前端开发人员**: 使用API获取医生数据展示
- **后端开发人员**: 开发和维护API服务
- **测试人员**: 测试API功能和性能
- **系统管理员**: 通过API管理医生数据

### 3.2 Detailed User Stories
| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|-------------------|
| F-US-001 | **作为前端开发人员**，我需要获取医生列表的API接口，以便在医生列表页面展示医生信息 | 高 | 1. 支持分页查询<br>2. 支持按科室筛选<br>3. 支持按职称筛选<br>4. 支持按在线状态筛选<br>5. 响应时间< 500ms |
| F-US-002 | **作为前端开发人员**，我需要获取单个医生详情的API接口，以便在医生详情页面展示详细信息 | 高 | 1. 通过医生ID或用户名查询<br>2. 返回完整的医生信息<br>3. 包含专长列表<br>4. 响应时间< 200ms |
| F-US-003 | **作为系统管理员**，我需要管理医生数据的API接口，以便对医生信息进行增删改查操作 | 中 | 1. 支持创建新医生<br>2. 支持更新医生信息<br>3. 支持删除医生<br>4. 支持批量操作<br>5. 需要管理员权限 |
| F-US-004 | **作为患者用户**，我需要查询在线医生的API接口，以便快速找到可咨询的医生 | 高 | 1. 只返回在线医生<br>2. 支持按科室筛选<br>3. 支持按专长筛选<br>4. 响应时间< 300ms |

## 4. Functional Requirements

### 4.1 Core Functionality
*API核心功能：*
- **医生列表查询**: 支持分页、筛选、排序的医生列表查询
- **医生详情查询**: 根据ID或用户名查询单个医生详情
- **医生信息管理**: 医生信息的增删改查操作
- **医生状态管理**: 医生在线状态的管理和查询
- **数据统计查询**: 医生数量、在线数量等统计信息

### 4.2 User Interactions
*API使用场景：*
- **前端页面加载**: 医生列表页面调用列表查询API
- **医生详情查看**: 点击医生卡片调用详情查询API
- **后台管理**: 管理员通过管理API进行数据维护
- **实时状态更新**: 医生登录/登出时更新状态API

### 4.3 Data Requirements
*API数据要求：*
- **数据格式**: 使用JSON作为请求和响应格式
- **数据验证**: 请求参数验证和业务规则验证
- **数据转换**: 数据库实体到API模型的转换
- **错误处理**: 统一的错误响应格式和状态码

## 5. Non-Functional Requirements

### 5.1 Performance Requirements
| Requirement | Target | Measurement |
|-------------|--------|-------------|
| **列表查询响应时间** | < 500ms | 95th percentile |
| **详情查询响应时间** | < 200ms | 95th percentile |
| **并发支持** | 1000 requests/second | 峰值负载测试 |
| **API可用性** | 99.9% | 监控系统测量 |

### 5.2 Security Requirements
*API安全要求：*
- **认证机制**: JWT token认证或Session认证
- **授权控制**: 基于角色的访问控制（RBAC）
- **输入验证**: 所有输入参数验证和清理
- **速率限制**: API调用频率限制防止滥用
- **日志审计**: 记录所有API调用日志

### 5.3 API Design Requirements
*API设计规范：*
- **RESTful设计**: 符合RESTful API设计原则
- **版本管理**: API版本化管理支持
- **文档完整**: 提供完整的API文档（OpenAPI/Swagger）
- **错误处理**: 统一的错误响应格式
- **分页规范**: 标准的分页参数和响应格式

## 6. UI/UX Specifications

### 6.1 API Documentation
*提供完整的API文档：*
- **OpenAPI/Swagger文档**: 交互式API文档
- **API使用示例**: 各语言调用示例代码
- **错误码说明**: 完整的错误码和解决方案
- **性能指标**: API性能指标和优化建议

### 6.2 Developer Experience
*开发者体验要求：*
- **快速上手**: 提供快速开始指南
- **代码示例**: 多种语言的调用示例
- **测试工具**: Postman/Insomnia集合
- **监控接入**: 提供API监控接入指南

## 7. Technical Specifications

### 7.1 Architecture Impact
*API对架构的影响：*
- **微服务位置**: 在qa-service-user微服务中实现
- **数据访问层**: 通过Spring Data JPA访问数据库
- **API网关**: 可通过API网关统一管理
- **监控集成**: 集成到系统监控体系

### 7.2 API Specifications
*详细的API设计：*

**1. 医生列表查询 API**
```http
GET /api/v1/doctors
```

**请求参数：**
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

**响应：**
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

**2. 医生详情查询 API**
```http
GET /api/v1/doctors/{id}
GET /api/v1/doctors/by-username/{username}
```

**响应：**
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

**3. 创建医生 API**
```http
POST /api/v1/doctors
```

**请求：**
```json
{
  "username": "dr-new-doctor",
  "password": "encrypted-password",
  "name": "新医生",
  "titleId": 1,
  "departmentId": 1,
  "avatar": "https://example.com/avatar.jpg",
  "experience": "5年临床经验",
  "specialties": ["专长1", "专长2"],
  "isActive": true
}
```

**4. 更新医生状态 API**
```http
PATCH /api/v1/doctors/{id}/status
```

**请求：**
```json
{
  "isActive": true
}
```

### 7.3 Spring Boot Implementation
*Spring Boot实现要点：*

**Controller层：**
```java
@RestController
@RequestMapping("/api/v1/doctors")
public class DoctorController {
    
    @Autowired
    private DoctorService doctorService;
    
    @GetMapping
    public Page<DoctorDTO> getDoctors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Boolean isActive,
            @RequestParam(required = false) String specialty) {
        return doctorService.getDoctors(page, size, department, title, isActive, specialty);
    }
    
    @GetMapping("/{id}")
    public DoctorDTO getDoctorById(@PathVariable String id) {
        return doctorService.getDoctorById(id);
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DoctorDTO createDoctor(@Valid @RequestBody CreateDoctorRequest request) {
        return doctorService.createDoctor(request);
    }
    
    @PatchMapping("/{id}/status")
    public DoctorDTO updateDoctorStatus(@PathVariable String id, 
                                        @Valid @RequestBody UpdateStatusRequest request) {
        return doctorService.updateDoctorStatus(id, request.getIsActive());
    }
}
```

**Service层：**
```java
@Service
public class DoctorService {
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    public Page<DoctorDTO> getDoctors(int page, int size, String department, 
                                      String title, Boolean isActive, String specialty) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Specification<Doctor> spec = buildSpecification(department, title, isActive, specialty);
        return doctorRepository.findAll(spec, pageable)
                .map(this::convertToDTO);
    }
    
    private Specification<Doctor> buildSpecification(String department, String title, 
                                                     Boolean isActive, String specialty) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            if (StringUtils.hasText(department)) {
                predicates.add(cb.equal(root.get("department").get("name"), department));
            }
            
            if (StringUtils.hasText(title)) {
                predicates.add(cb.equal(root.get("title").get("name"), title));
            }
            
            if (isActive != null) {
                predicates.add(cb.equal(root.get("isActive"), isActive));
            }
            
            if (StringUtils.hasText(specialty)) {
                Join<Doctor, DoctorSpecialty> specialties = root.join("specialties");
                predicates.add(cb.equal(specialties.get("specialty"), specialty));
            }
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
```

## 8. Testing Requirements

### 8.1 Test Scenarios
*API测试场景：*
- **功能测试**: 验证所有API端点功能正常
- **性能测试**: 验证API响应时间和并发能力
- **安全测试**: 验证认证授权和输入验证
- **兼容性测试**: 验证与前端和其他服务的兼容性
- **错误处理测试**: 验证错误场景处理

### 8.2 Acceptance Test Criteria
*验收测试标准：*
- **功能完整性**: 所有API端点功能完整实现
- **性能达标**: 响应时间满足性能要求
- **安全合规**: 安全机制完整有效
- **文档完整**: API文档完整准确
- **测试覆盖**: 关键功能测试覆盖率>80%

### 8.3 Quality Gates
*质量门禁：*
- **代码规范**: 代码符合团队编码规范
- **测试通过**: 所有测试用例通过
- **文档评审**: API文档通过评审
- **性能测试**: 性能测试结果达标

## 9. Deployment Requirements

### 9.1 Deployment Strategy
*API部署策略：*
- **微服务部署**: 作为qa-service-user微服务的一部分部署
- **容器化**: 支持Docker容器化部署
- **环境配置**: 支持多环境配置管理
- **健康检查**: 提供健康检查端点

### 9.2 Rollback Plan
*回滚计划：*
- **回滚触发**: API功能异常或性能不达标
- **回滚步骤**: 1. 停止新版本服务 2. 启动旧版本服务 3. 验证回滚结果
- **数据兼容**: 保持API接口向后兼容

## 10. Success Metrics

### 10.1 Feature-specific Metrics
| Metric | Target | Measurement Frequency |
|--------|--------|---------------------|
| **API响应时间** | < 500ms (P95) | 实时监控 |
| **API可用性** | 99.9% | 实时监控 |
| **错误率** | < 0.1% | 每日统计 |
| **API调用量** | 监控趋势 | 每日统计 |

### 10.2 Business Metrics
*业务指标：*
- **前端集成成功率**: 100%前端成功集成
- **用户满意度**: 页面加载速度满意度>90%
- **系统稳定性**: 系统稳定性提升>20%

## 11. Risks and Mitigations

### 11.1 Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **API性能不达标** | 中 | 高 | 1. 性能测试和优化<br>2. 数据库查询优化<br>3. 缓存机制引入 |
| **前端兼容性问题** | 高 | 中 | 1. 保持接口向后兼容<br>2. 充分的集成测试<br>3. 版本化API管理 |
| **安全漏洞** | 低 | 高 | 1. 安全代码审查<br>2. 安全测试扫描<br>3. 输入验证和清理 |

### 11.2 Timeline Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **数据库依赖延迟** | 中 | 高 | 1. 并行开发mock数据<br>2. 接口先行设计<br>3. 灵活调整开发顺序 |
| **前端集成延迟** | 中 | 中 | 1. 提供mock server<br>2. 提前沟通接口规范<br>3. 并行开发测试 |

## 12. Timeline

### 12.1 Development Timeline
| Phase | Duration | Start Date | End Date | Deliverables |
|-------|----------|------------|----------|--------------|
| **API设计和文档** | 2天 | 2025-12-14 | 2025-12-15 | API设计文档、OpenAPI文档 |
| **后端开发** | 5天 | 2025-12-16 | 2025-12-20 | 完整的API实现 |
| **测试和优化** | 3天 | 2025-12-21 | 2025-12-23 | 测试报告、性能优化 |
| **文档完善** | 1天 | 2025-12-24 | 2025-12-24 | 完整的API文档 |

### 12.2 Dependencies Timeline
*依赖时间线：*
- **E001F001数据库设计**: 需要在2025-12-13前完成
- **前端团队协调**: 需要在2025-12-15前确定接口规范
- **测试环境准备**: 需要在2025-12-16前准备就绪

## 13. Appendix

### 13.1 References
- **Parent Epic PRD**: [医生数据MySQL存储迁移](./../epic-prd.md)
- **数据库设计PRD**: [E001F001医生数据MySQL数据库设计](../E001F001_doctor-database-design/feature-prd.md)
- **Spring Boot文档**: [官方文档](https://spring.io/projects/spring-boot)
- **RESTful API设计指南**: [最佳实践](https://restfulapi.net/)

### 13.2 Glossary
| Term | Definition |
|------|------------|
| **RESTful API** | 符合REST架构风格的API设计 |
| **DTO** | 数据传输对象，用于API层数据传输 |
| **JPA** | Java持久化API，数据库访问标准 |
| **OpenAPI** | 描述RESTful API的规范标准 |
| **Swagger** | OpenAPI的实现工具和UI |

### 13.3 Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-07 | QA Healthcare Team | 初始草案 |
| 1.1 | 2025-12-07 | QA Healthcare Team | 完善API设计和实现细节 |