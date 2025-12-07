# Task: 医生数据库设计和表结构创建

**Date**: 2025-12-07  
**Author**: QA Healthcare Team  
**Status**: Draft  
**Parent Feature**: [医生数据MySQL数据库设计和表结构创建](./../feature-prd.md)  
**Parent Epic**: [医生数据MySQL存储迁移](./../../epic-prd.md)

## 1. Task Overview

### 1.1 Task Description
设计并创建医生数据的MySQL数据库表结构，包括医生信息表、科室表、职称表等，建立数据关系模型，为医生数据迁移提供数据库基础。

### 1.2 Purpose
本任务为整个医生数据迁移项目提供数据库基础，确保数据存储的可靠性、一致性和可扩展性。通过规范的数据库设计，实现：
- 数据持久化：确保医生数据长期可靠存储
- 数据完整性：通过数据库约束保证数据质量
- 查询性能：通过索引优化提升查询效率
- 扩展性：支持未来功能扩展和数据增长

### 1.3 Success Criteria
成功完成数据库设计和表结构创建，满足以下标准：
1. 所有表结构符合数据库设计规范
2. 主键、外键约束完整且正确
3. 索引设计合理，支持常用查询场景
4. 字符集和排序规则统一（utf8mb4_unicode_ci）
5. 提供完整的ER图和数据字典文档
6. SQL脚本可重复执行，支持环境隔离部署

## 2. Relationship to Parent Feature

### 2.1 Feature Requirements Addressed
*本任务支持以下功能需求：*
- **F-US-001 数据库管理员需求**: 创建规范的医生数据库表结构
- **F-US-002 后端开发人员需求**: 提供清晰的数据库ER图和数据字典
- **F-US-003 系统架构师需求**: 审核数据库设计是否符合项目架构标准
- **4.1 核心功能**: 医生信息表、科室表、职称表设计
- **4.2 用户交互**: 数据库创建和维护流程
- **4.3 数据需求**: 基于现有JSON数据结构设计数据库表

### 2.2 Dependencies on Other Tasks
*本任务没有依赖其他任务，是后续任务的基础：*
- **E001F002T001 医生数据RESTful API开发**: 依赖本任务创建的数据库表结构
- **E001F003T001 数据迁移工具开发**: 依赖本任务创建的数据库目标结构
- **E001F004T001 前端医生列表页面改造**: 间接依赖本任务提供的数据存储

## 3. Technical Specifications

### 3.1 Implementation Details
*基于现有JSON数据结构和功能文档中的技术规格进行实现：*

#### 3.1.1 数据库表设计
基于功能文档7.2节的技术规格，创建以下表结构：

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

#### 3.1.2 文件创建和修改
- **新文件创建**:
  - `server/qa-service-user/src/main/resources/db/migration/V1__create_doctor_tables.sql` - 数据库迁移脚本
  - `server/qa-service-user/src/main/resources/db/schema/doctor-schema.sql` - 数据库架构文档
  - `docs/database/doctor-er-diagram.puml` - PlantUML ER图文件
  - `docs/database/doctor-data-dictionary.md` - 数据字典文档

- **现有文件修改**:
  - `server/qa-service-user/pom.xml` - 添加Flyway或Liquibase依赖（如果需要）
  - `server/qa-service-user/src/main/resources/application.properties` - 配置数据库连接

#### 3.1.3 Spring Data JPA实体类
基于功能文档7.3节的设计，创建对应的JPA实体类：

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

### 3.2 Architecture Considerations
*数据库设计对架构的影响：*
- **微服务集成**: 数据库作为qa-service-user微服务的数据存储
- **数据访问层**: 通过Spring Data JPA提供数据访问
- **API层**: 为RESTful API提供数据支持
- **前端集成**: 间接支持前端数据展示

### 3.3 API Changes
*本任务不涉及API变更，但为后续API开发提供数据基础*

### 3.4 Database Changes
*数据库变更详情见3.1.1节*

## 4. Implementation Steps

### 4.1 Step-by-Step Instructions
1. **Step 1: 环境准备**
   - *行动*: 确保MySQL数据库环境就绪
   - *命令*: `mysql --version` 验证MySQL安装
   - *验证*: MySQL版本>=8.0，可以正常连接

2. **Step 2: 创建数据库和用户**
   - *行动*: 创建专用数据库和用户
   - *SQL*: 
     ```sql
     CREATE DATABASE qa_healthcare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
     CREATE USER 'qa_user'@'%' IDENTIFIED BY 'secure_password';
     GRANT ALL PRIVILEGES ON qa_healthcare.* TO 'qa_user'@'%';
     FLUSH PRIVILEGES;
     ```
   - *验证*: 可以以qa_user身份连接到qa_healthcare数据库

3. **Step 3: 编写SQL脚本**
   - *行动*: 创建完整的DDL脚本
   - *文件*: `V1__create_doctor_tables.sql`
   - *验证*: SQL语法正确，可以通过MySQL客户端执行

4. **Step 4: 执行数据库创建**
   - *行动*: 执行SQL脚本创建表结构
   - *命令*: `mysql -u qa_user -p qa_healthcare < V1__create_doctor_tables.sql`
   - *验证*: 所有表成功创建，无错误信息

5. **Step 5: 验证表结构**
   - *行动*: 验证表结构符合设计要求
   - *命令*: 
     ```sql
     SHOW TABLES;
     DESCRIBE doctors;
     DESCRIBE departments;
     DESCRIBE titles;
     DESCRIBE doctor_specialties;
     ```
   - *验证*: 表结构、字段、索引、约束都正确

6. **Step 6: 创建JPA实体类**
   - *行动*: 在Spring Boot项目中创建实体类
   - *文件*: 在`server/qa-service-user/src/main/java/com/leansofx/entity/`目录下创建实体类
   - *验证*: 实体类编译通过，可以通过JPA Repository访问

7. **Step 7: 创建文档**
   - *行动*: 创建ER图和数据字典
   - *工具*: 使用PlantUML创建ER图
   - *验证*: 文档完整，清晰易懂

8. **Step 8: 测试验证**
   - *行动*: 执行数据库测试
   - *测试*: 表结构测试、约束测试、索引测试
   - *验证*: 所有测试通过

### 4.2 Estimated Effort
| 活动 | 预估时间 | 实际时间 | 备注 |
|------|----------|----------|------|
| *需求分析* | *2小时* | *TBD* | *理解现有JSON数据结构和功能需求* |
| *数据库设计* | *4小时* | *TBD* | *设计表结构、关系、索引* |
| *SQL脚本编写* | *3小时* | *TBD* | *编写可执行的DDL脚本* |
| *JPA实体类开发* | *3小时* | *TBD* | *创建Spring Data JPA实体类* |
| *文档编写* | *2小时* | *TBD* | *ER图、数据字典、部署指南* |
| *测试验证* | *2小时* | *TBD* | *数据库测试和性能测试* |
| **总计** | **16小时** | **TBD** | *约2个工作日* |

## 5. Testing Requirements

### 5.1 Unit Tests
*数据库单元测试要求：*
```java
// 示例：数据库连接测试
@Test
public void testDatabaseConnection() {
    assertNotNull(dataSource);
    try (Connection conn = dataSource.getConnection()) {
        assertTrue(conn.isValid(5));
    } catch (SQLException e) {
        fail("Database connection failed: " + e.getMessage());
    }
}

// 示例：表结构测试
@Test
public void testTableCreation() {
    List<String> tables = jdbcTemplate.queryForList(
        "SHOW TABLES", String.class);
    assertTrue(tables.contains("doctors"));
    assertTrue(tables.contains("departments"));
    assertTrue(tables.contains("titles"));
    assertTrue(tables.contains("doctor_specialties"));
}
```

### 5.2 Integration Tests
*集成测试场景：*
- **场景1**: 数据库连接和表创建集成测试
- **场景2**: JPA实体类与数据库映射测试
- **场景3**: 事务管理和数据完整性测试
- **场景4**: 索引性能测试

### 5.3 Manual Testing
*手动测试步骤：*
1. *步骤1*: 使用MySQL客户端连接数据库
2. *步骤2*: 执行`SHOW TABLES`验证表创建
3. *步骤3*: 执行`DESCRIBE`命令验证每个表结构
4. *步骤4*: 执行简单INSERT和SELECT测试数据操作
5. *步骤5*: 验证外键约束和级联删除
6. *步骤6*: 测试索引是否生效（EXPLAIN查询）

### 5.4 Test Data Requirements
*测试数据需求：*
- **基础数据**: 基于现有JSON数据的5条医生记录
- **科室数据**: 心内科、儿科、骨科、妇产科、消化内科
- **职称数据**: 主任医师、副主任医师、主治医师
- **专长数据**: 各种医疗专长名称

## 6. Quality Requirements

### 6.1 Code Quality Standards
*代码质量要求：*
- **SQL规范**: 符合团队SQL编码规范，使用统一缩进和注释
- **命名规范**: 表名、字段名使用蛇形命名法（snake_case）
- **注释完整**: 所有表、字段都有中文注释说明
- **版本控制**: SQL脚本纳入Git版本控制

### 6.2 Performance Requirements
*性能要求：*
- **表创建时间**: < 5秒（执行DDL脚本时间）
- **索引创建时间**: < 10秒（创建所有索引时间）
- **简单查询响应时间**: < 50ms（基础查询）
- **并发支持**: 支持100+数据库连接

### 6.3 Security Requirements
*安全要求：*
- **访问控制**: 创建专用数据库用户，限制权限
- **密码安全**: 医生密码需要加密存储（使用BCrypt）
- **SQL注入防护**: 使用参数化查询和JPA框架
- **审计日志**: 记录数据库结构变更日志

## 7. Deployment Instructions

### 7.1 Pre-deployment Checklist
- [ ] *所有SQL脚本语法正确*
- [ ] *数据库环境准备就绪*
- [ ] *数据库用户权限设置正确*
- [ ] *备份现有数据（如果有）*
- [ ] *验证回滚脚本可用*

### 7.2 Deployment Steps
1. *步骤1: 备份当前数据库（如果存在）*
   ```bash
   mysqldump -u root -p existing_database > backup_$(date +%Y%m%d).sql
   ```

2. *步骤2: 创建新数据库*
   ```bash
   mysql -u root -p -e "CREATE DATABASE qa_healthcare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   ```

3. *步骤3: 执行迁移脚本*
   ```bash
   mysql -u qa_user -p qa_healthcare < server/qa-service-user/src/main/resources/db/migration/V1__create_doctor_tables.sql
   ```

4. *步骤4: 验证部署*
   ```bash
   mysql -u qa_user -p qa_healthcare -e "SHOW TABLES; SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = 'qa_healthcare';"
   ```

5. *步骤5: 更新应用配置*
   ```properties
   # application.properties
   spring.datasource.url=jdbc:mysql://localhost:3306/qa_healthcare
   spring.datasource.username=qa_user
   spring.datasource.password=secure_password
   ```

### 7.3 Rollback Procedure
*如果部署失败的回滚步骤：*
```bash
# 1. 删除新创建的数据库
mysql -u root -p -e "DROP DATABASE IF EXISTS qa_healthcare;"

# 2. 恢复原有数据库（如果存在）
mysql -u root -p existing_database < backup_$(date +%Y%m%d).sql

# 3. 验证回滚成功
mysql -u root -p -e "SHOW DATABASES;"
```

## 8. Documentation Requirements

### 8.1 Code Documentation
*代码文档要求：*
- **SQL脚本注释**: 每个表、字段都有详细注释
- **JPA实体类注释**: 使用JavaDoc注释说明实体类用途
- **配置文档**: 数据库连接配置说明

### 8.2 Technical Documentation
*技术文档要求：*
- **ER图**: 使用PlantUML绘制完整的实体关系图
- **数据字典**: 详细描述每个表的字段定义、类型、约束
- **部署指南**: 数据库部署和配置步骤
- **性能指南**: 索引使用和查询优化建议

### 8.3 User Documentation
*用户文档：*
- **数据库管理员指南**: 数据库维护、备份、恢复操作
- **开发人员指南**: 如何使用JPA实体类进行数据访问
- **架构师指南**: 数据库设计决策和架构考虑

## 9. Risks and Issues

### 9.1 Technical Risks
| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| *数据库设计不符合实际需求* | 中 | 高 | 1. 充分分析现有JSON数据结构<br>2. 与开发团队充分沟通<br>3. 设计评审和原型验证 |
| *性能问题* | 低 | 中 | 1. 合理的索引设计<br>2. 查询性能测试<br>3. 监控和优化机制 |
| *数据迁移兼容性问题* | 中 | 高 | 1. 保持字段兼容性<br>2. 数据转换测试<br>3. 回滚机制准备 |

### 9.2 Timeline Risks
| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| *设计评审延迟* | 低 | 中 | 1. 提前安排评审会议<br>2. 准备充分的评审材料<br>3. 异步评审机制 |
| *环境准备问题* | 中 | 低 | 1. 提前准备测试环境<br>2. 自动化环境搭建<br>3. 多环境备份 |

## 10. Acceptance Criteria

### 10.1 Functional Acceptance Criteria
- [ ] *所有表结构正确创建（doctors, departments, titles, doctor_specialties）*
- [ ] *主键、外键约束完整且生效*
- [ ] *索引创建正确，支持常用查询*
- [ ] *字符集和排序规则统一为utf8mb4_unicode_ci*
- [ ] *JPA实体类可以正常编译和运行*
- [ ] *数据库连接配置正确*

### 10.2 Technical Acceptance Criteria
- [ ] *SQL脚本符合编码规范*
- [ ] *性能要求满足：表创建<5秒，索引创建<10秒*
- [ ] *安全要求满足：专用用户、密码加密*
- [ ] *文档完整：ER图、数据字典、部署指南*

### 10.3 Documentation Acceptance Criteria
- [ ] *ER图完整且准确*
- [ ] *数据字典详细描述所有字段*
- [ ] *部署指南步骤清晰可执行*
- [ ] *代码注释完整*

## 11. Appendix

### 11.1 References
- **父功能PRD**: [医生数据MySQL数据库设计和表结构创建](./../feature-prd.md)
- **父史诗PRD**: [医生数据MySQL存储迁移](./../../epic-prd.md)
- **现有JSON数据结构**: [doctor-user-list.json](../../../../web/qa-web/src/data/doctor-user-list.json)
- **Spring Data JPA文档**: [官方文档](https://spring.io/projects/spring-data-jpa)
- **MySQL文档**: [官方文档](https://dev.mysql.com/doc/)

### 11.2 Resources
*有用资源：*
- **数据库设计工具**: MySQL Workbench, DBeaver
- **ER图工具**: PlantUML, draw.io
- **测试工具**: JUnit, Testcontainers
- **文档工具**: Markdown, Mermaid

### 11.3 Notes
*额外注意事项：*
- **数据兼容性**: 保持与现有JSON数据的字段兼容性
- **扩展性考虑**: 设计支持未来功能扩展
- **性能优化**: 为常用查询场景设计索引
- **安全最佳实践**: 遵循数据库安全最佳实践

### 11.4 Revision History
| 版本 | 日期 | 作者 | 变更 |
|------|------|------|------|
| 1.0 | 2025-12-07 | QA Healthcare Team | 初始草案 |
| 1.1 | 2025-12-07 | QA Healthcare Team | 完善技术细节和实现步骤 |