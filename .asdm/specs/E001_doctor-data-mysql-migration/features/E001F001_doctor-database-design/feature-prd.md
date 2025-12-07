# Feature PRD: 医生数据MySQL数据库设计和表结构创建

**Date**: 2025-12-07  
**Author**: QA Healthcare Team  
**Status**: Draft  
**Parent Epic**: [医生数据MySQL存储迁移](./../epic-prd.md)

## 1. Feature Overview

### 1.1 Feature Description
设计并创建医生数据的MySQL数据库表结构，包括医生信息表、科室表、职称表等，建立数据关系模型，为医生数据迁移提供数据库基础。

### 1.2 Business Value
本功能为整个医生数据迁移项目提供数据库基础，确保数据存储的可靠性、一致性和可扩展性。通过规范的数据库设计，实现：
- 数据持久化：确保医生数据长期可靠存储
- 数据完整性：通过数据库约束保证数据质量
- 查询性能：通过索引优化提升查询效率
- 扩展性：支持未来功能扩展和数据增长

### 1.3 User Value
- **系统管理员**：获得可靠的数据存储和管理能力
- **开发人员**：获得清晰的数据模型和访问接口
- **最终用户**：享受更稳定、更快速的系统体验

## 2. Relationship to Parent Epic

### 2.1 Epic Objectives Supported
*本功能支持以下史诗目标：*
- **数据持久化**: 实现医生数据的可靠持久化存储
- **数据完整性**: 确保数据的一致性和完整性
- **可扩展性**: 建立可扩展的数据存储架构

### 2.2 Dependencies on Other Features
*本功能是后续功能的基础：*
- **E001F002 医生数据RESTful API开发**: 依赖本功能创建的数据库表结构
- **E001F003 数据迁移工具开发**: 依赖本功能创建的数据库目标结构
- **E001F004 前端医生列表页面改造**: 间接依赖本功能提供的数据存储

## 3. User Stories

### 3.1 Target User Personas
- **数据库管理员**: 负责数据库的创建、维护和优化
- **后端开发人员**: 使用数据库进行数据访问和业务逻辑开发
- **系统架构师**: 审核数据库设计是否符合架构标准

### 3.2 Detailed User Stories
| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|-------------------|
| F-US-001 | **作为数据库管理员**，我需要创建规范的医生数据库表结构，以便为数据迁移提供目标存储 | 高 | 1. 所有表结构符合数据库设计规范<br>2. 主键、外键约束完整<br>3. 索引设计合理<br>4. 字符集和排序规则统一 |
| F-US-002 | **作为后端开发人员**，我需要清晰的数据库ER图和数据字典，以便理解数据模型和开发数据访问层 | 高 | 1. 提供完整的ER图<br>2. 提供详细的数据字典<br>3. 字段类型和长度定义合理<br>4. 支持Spring Data JPA实体映射 |
| F-US-003 | **作为系统架构师**，我需要审核数据库设计是否符合项目架构标准，以便确保系统可扩展性和性能 | 中 | 1. 设计符合微服务架构原则<br>2. 支持未来功能扩展<br>3. 性能设计满足要求<br>4. 安全设计符合规范 |

## 4. Functional Requirements

### 4.1 Core Functionality
*数据库设计的核心功能：*
- **医生信息表设计**: 存储医生基本信息，包括ID、用户名、密码、姓名、职称、科室等
- **科室表设计**: 存储科室信息，支持科室分类和管理
- **职称表设计**: 存储职称信息，支持职称等级管理
- **数据关系设计**: 建立医生与科室、职称的关系模型
- **索引设计**: 为常用查询字段创建索引优化性能

### 4.2 User Interactions
*数据库创建和维护流程：*
- **数据库创建**: 通过SQL脚本创建数据库和用户
- **表结构创建**: 执行DDL语句创建所有表结构
- **约束创建**: 添加主键、外键、唯一约束等
- **索引创建**: 创建查询性能优化索引
- **数据验证**: 验证表结构符合设计要求

### 4.3 Data Requirements
*基于现有JSON数据结构设计数据库表：*
- **数据映射**: 将JSON数据结构映射到关系型数据库表
- **字段定义**: 根据JSON数据特点定义合适的字段类型和长度
- **数据转换**: 设计JSON到数据库的数据转换规则
- **数据验证**: 定义数据验证规则和约束条件

## 5. Non-Functional Requirements

### 5.1 Performance Requirements
| Requirement | Target | Measurement |
|-------------|--------|-------------|
| **表创建时间** | < 5秒 | 执行DDL脚本时间 |
| **索引创建时间** | < 10秒 | 创建所有索引时间 |
| **查询性能** | 简单查询< 50ms | 基础查询响应时间 |
| **并发支持** | 支持100+连接 | 数据库连接池测试 |

### 5.2 Security Requirements
*数据库安全要求：*
- **访问控制**: 创建专用数据库用户，限制权限
- **密码安全**: 医生密码需要加密存储（MD5或BCrypt）
- **SQL注入防护**: 使用参数化查询和ORM框架
- **审计日志**: 记录数据库结构变更日志

### 5.3 Compliance Requirements
*合规性要求：*
- **数据保护**: 医生个人信息需要适当保护
- **隐私保护**: 敏感数据需要加密存储
- **数据保留**: 定义数据保留策略
- **备份策略**: 支持数据库定期备份

## 6. UI/UX Specifications

### 6.1 Database Design Documentation
*提供完整的设计文档：*
- **ER图**: 使用PlantUML或类似工具绘制实体关系图
- **数据字典**: 详细描述每个表的字段定义
- **SQL脚本**: 可执行的DDL脚本文件
- **部署指南**: 数据库部署和配置指南

### 6.2 Design Assets
*设计产出物：*
- **数据库设计文档**: 包含设计思路和决策说明
- **SQL脚本文件**: 可重复执行的创建脚本
- **ER图文件**: 可视化的数据库结构图
- **数据字典文件**: 机器可读的数据定义文件

## 7. Technical Specifications

### 7.1 Architecture Impact
*数据库设计对架构的影响：*
- **微服务集成**: 数据库作为qa-service-user微服务的数据存储
- **数据访问层**: 通过Spring Data JPA提供数据访问
- **API层**: 为RESTful API提供数据支持
- **前端集成**: 间接支持前端数据展示

### 7.2 Database Schema
*基于现有JSON数据的数据库表设计：*

**医生信息表 (doctors)**
```sql
CREATE TABLE doctors (
    id VARCHAR(36) PRIMARY KEY COMMENT '医生ID',
    username VARCHAR(50) UNIQUE NOT NULL COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码（加密存储）',
    name VARCHAR(100) NOT NULL COMMENT '医生姓名',
    title_id INT COMMENT '职称ID',
    department_id INT COMMENT '科室ID',
    avatar VARCHAR(500) COMMENT '头像URL',
    experience VARCHAR(100) COMMENT '临床经验',
    is_active BOOLEAN DEFAULT TRUE COMMENT '是否在线',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_username (username),
    INDEX idx_department (department_id),
    INDEX idx_title (title_id),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='医生信息表';
```

**科室表 (departments)**
```sql
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '科室ID',
    code VARCHAR(20) UNIQUE NOT NULL COMMENT '科室代码',
    name VARCHAR(100) NOT NULL COMMENT '科室名称',
    description TEXT COMMENT '科室描述',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='科室表';
```

**职称表 (titles)**
```sql
CREATE TABLE titles (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '职称ID',
    code VARCHAR(20) UNIQUE NOT NULL COMMENT '职称代码',
    name VARCHAR(100) NOT NULL COMMENT '职称名称',
    level INT COMMENT '职称等级',
    description TEXT COMMENT '职称描述',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='职称表';
```

**医生专长表 (doctor_specialties)**
```sql
CREATE TABLE doctor_specialties (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '专长ID',
    doctor_id VARCHAR(36) NOT NULL COMMENT '医生ID',
    specialty VARCHAR(100) NOT NULL COMMENT '专长名称',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    INDEX idx_doctor_id (doctor_id),
    INDEX idx_specialty (specialty)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='医生专长表';
```

### 7.3 Spring Data JPA Entities
*对应的JPA实体类设计：*

**Doctor Entity**
```java
@Entity
@Table(name = "doctors")
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
    private Boolean isActive;
    
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private Set<DoctorSpecialty> specialties;
    
    // Getters and setters
}
```

## 8. Testing Requirements

### 8.1 Test Scenarios
*数据库测试场景：*
- **表结构测试**: 验证所有表结构是否正确创建
- **约束测试**: 验证主键、外键、唯一约束是否生效
- **索引测试**: 验证索引是否创建并生效
- **性能测试**: 验证基础查询性能
- **数据完整性测试**: 验证数据关系完整性

### 8.2 Acceptance Test Criteria
*验收测试标准：*
- **功能测试**: 所有表结构可正常创建和访问
- **性能测试**: 基础查询响应时间< 50ms
- **安全测试**: 数据库用户权限设置正确
- **兼容性测试**: 与Spring Data JPA兼容

### 8.3 Quality Gates
*质量门禁：*
- **代码规范**: SQL脚本符合团队编码规范
- **文档完整**: 设计文档完整且准确
- **测试覆盖**: 关键功能有测试验证
- **评审通过**: 设计通过架构评审

## 9. Deployment Requirements

### 9.1 Deployment Strategy
*数据库部署策略：*
- **环境隔离**: 开发、测试、生产环境独立部署
- **版本控制**: SQL脚本纳入版本控制
- **自动化部署**: 支持CI/CD流水线部署
- **回滚机制**: 支持数据库结构回滚

### 9.2 Rollback Plan
*回滚计划：*
- **回滚触发条件**: 数据库创建失败或数据不一致
- **回滚步骤**: 1. 备份当前数据库 2. 执行回滚脚本 3. 验证回滚结果
- **数据迁移**: 保留原始JSON数据作为回滚数据源

## 10. Success Metrics

### 10.1 Feature-specific Metrics
| Metric | Target | Measurement Frequency |
|--------|--------|---------------------|
| **数据库创建成功率** | 100% | 每次部署 |
| **表结构正确率** | 100% | 设计评审 |
| **查询性能达标率** | > 95% | 性能测试 |
| **文档完整度** | 100% | 交付评审 |

### 10.2 Technical Metrics
*技术指标：*
- **数据库大小**: 初始< 10MB
- **连接数**: 支持100+并发连接
- **响应时间**: 简单查询< 50ms
- **可用性**: 99.9%数据库可用性

## 11. Risks and Mitigations

### 11.1 Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **数据库设计不符合实际需求** | 中 | 高 | 1. 充分分析现有JSON数据结构<br>2. 与开发团队充分沟通<br>3. 设计评审和原型验证 |
| **性能问题** | 低 | 中 | 1. 合理的索引设计<br>2. 查询性能测试<br>3. 监控和优化机制 |
| **数据迁移兼容性问题** | 中 | 高 | 1. 保持字段兼容性<br>2. 数据转换测试<br>3. 回滚机制准备 |

### 11.2 Timeline Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **设计评审延迟** | 低 | 中 | 1. 提前安排评审会议<br>2. 准备充分的评审材料<br>3. 异步评审机制 |
| **环境准备问题** | 中 | 低 | 1. 提前准备测试环境<br>2. 自动化环境搭建<br>3. 多环境备份 |

## 12. Timeline

### 12.1 Development Timeline
| Phase | Duration | Start Date | End Date | Deliverables |
|-------|----------|------------|----------|--------------|
| **需求分析和设计** | 2天 | 2025-12-08 | 2025-12-09 | 数据库设计文档、ER图 |
| **SQL脚本开发** | 2天 | 2025-12-10 | 2025-12-11 | 可执行的DDL脚本 |
| **测试和验证** | 1天 | 2025-12-12 | 2025-12-12 | 测试报告、性能测试 |
| **文档整理** | 1天 | 2025-12-13 | 2025-12-13 | 完整的设计文档 |

### 12.2 Dependencies Timeline
*依赖时间线：*
- **MySQL数据库环境**: 需要在2025-12-08前准备就绪
- **开发工具**: 数据库设计工具和测试工具
- **团队评审**: 需要在2025-12-09前完成设计评审

## 13. Appendix

### 13.1 References
- **Parent Epic PRD**: [医生数据MySQL存储迁移](./../epic-prd.md)
- **现有JSON数据结构**: [doctor-user-list.json](../../../../web/qa-web/src/data/doctor-user-list.json)
- **Spring Data JPA文档**: [官方文档](https://spring.io/projects/spring-data-jpa)
- **MySQL文档**: [官方文档](https://dev.mysql.com/doc/)

### 13.2 Glossary
| Term | Definition |
|------|------------|
| **DDL** | 数据定义语言，用于定义数据库结构 |
| **DML** | 数据操作语言，用于操作数据库数据 |
| **ER图** | 实体关系图，描述数据库表之间的关系 |
| **JPA** | Java持久化API，Java对象关系映射标准 |
| **ORM** | 对象关系映射，将对象模型映射到关系数据库 |

### 13.3 Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-07 | QA Healthcare Team | 初始草案 |
| 1.1 | 2025-12-07 | QA Healthcare Team | 完善技术细节和数据库设计 |