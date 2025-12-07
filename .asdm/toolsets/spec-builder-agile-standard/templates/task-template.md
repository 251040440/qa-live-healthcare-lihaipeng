# Task: {{task_name}}

**Date**: {{current_date}}  
**Author**: {{author}}  
**Status**: Draft  
**Parent Feature**: [{{feature_name}}](./../feature-prd.md)  
**Parent Epic**: [{{epic_name}}](./../../epic-prd.md)

## 1. Task Overview

### 1.1 Task Description
{{task_description}}

### 1.2 Purpose
*Explain the purpose of this task and how it contributes to the parent feature.*

### 1.3 Success Criteria
*Define what success looks like for this task. What specific outcomes indicate completion?*

## 2. Relationship to Parent Feature

### 2.1 Feature Requirements Addressed
*List which requirements from the parent feature this task addresses:*
- *Requirement 1: [Link to feature section]*
- *Requirement 2: [Link to feature section]*

### 2.2 Dependencies on Other Tasks
*List any dependencies on other tasks within the same feature:*
- *Task A: [Description of dependency]*
- *Task B: [Description of dependency]*

## 3. Technical Specifications

### 3.1 Implementation Details
*Provide detailed implementation instructions:*

#### 3.1.1 Code Changes Required
```language
// Example code changes
function implementFeature() {
    // Implementation details
}
```

#### 3.1.2 Files to Modify
- *`/path/to/file1.js` - Add new function*
- *`/path/to/file2.css` - Update styles*
- *`/path/to/file3.test.js` - Add tests*

#### 3.1.3 New Files to Create
- *`/path/to/new-file1.js` - New component*
- *`/path/to/new-file2.test.js` - Test file*

### 3.2 Architecture Considerations
*Describe how this task fits into the architecture:*
- *Components affected*
- *Data flow changes*
- *State management updates*

### 3.3 API Changes
*If applicable, describe API changes:*
```json
{
  "endpoint": "/api/task-endpoint",
  "method": "GET|POST|PUT|DELETE",
  "changes": "Describe what changes are needed"
}
```

### 3.4 Database Changes
*If applicable, describe database changes:*
```sql
-- Example SQL changes
ALTER TABLE existing_table ADD COLUMN new_column VARCHAR(255);
-- OR
CREATE TABLE new_table (
    id UUID PRIMARY KEY,
    task_data JSONB
);
```

## 4. Implementation Steps

### 4.1 Step-by-Step Instructions
1. **Step 1: Setup**
   - *Action: Clone repository*
   - *Command: `git clone <repo-url>`*
   - *Verification: Repository cloned successfully*

2. **Step 2: Create branch**
   - *Action: Create feature branch*
   - *Command: `git checkout -b feature/task-name`*
   - *Verification: Branch created and checked out*

3. **Step 3: Implement changes**
   - *Action: Make code changes*
   - *Files: List files to modify*
   - *Verification: Changes compile without errors*

4. **Step 4: Write tests**
   - *Action: Add unit tests*
   - *Files: Test files to create/modify*
   - *Verification: Tests pass*

5. **Step 5: Code review**
   - *Action: Create pull request*
   - *Requirements: Code review checklist*
   - *Verification: PR approved*

6. **Step 6: Merge and deploy**
   - *Action: Merge to main branch*
   - *Command: `git merge feature/task-name`*
   - *Verification: Deployment successful*

### 4.2 Estimated Effort
| Activity | Estimated Time | Actual Time | Notes |
|----------|----------------|-------------|-------|
| *Analysis* | *2 hours* | *TBD* | *Understanding requirements* |
| *Implementation* | *8 hours* | *TBD* | *Coding and testing* |
| *Code Review* | *1 hour* | *TBD* | *Review and feedback* |
| *Testing* | *2 hours* | *TBD* | *Integration testing* |
| **Total** | **13 hours** | **TBD** | |

## 5. Testing Requirements

### 5.1 Unit Tests
*Describe unit test requirements:*
```javascript
// Example unit test
describe('Task implementation', () => {
    test('should perform specific function', () => {
        expect(functionCall()).toBe(expectedResult);
    });
});
```

### 5.2 Integration Tests
*Describe integration test requirements:*
- *Test scenario 1: Description*
- *Test scenario 2: Description*
- *Test scenario 3: Description*

### 5.3 Manual Testing
*Describe manual testing steps:*
1. *Step 1: Setup test environment*
2. *Step 2: Execute test case*
3. *Step 3: Verify results*
4. *Step 4: Document findings*

### 5.4 Test Data Requirements
*Describe test data needed:*
- *Data set 1: Description*
- *Data set 2: Description*
- *Mock data: Description*

## 6. Quality Requirements

### 6.1 Code Quality Standards
*Define code quality requirements:*
- *Code coverage: > 80%*
- *Linting: No errors*
- *Code style: Follow project conventions*

### 6.2 Performance Requirements
*Define performance requirements for this task:*
- *Response time: < 100ms*
- *Memory usage: < 50MB*
- *CPU usage: < 5%*

### 6.3 Security Requirements
*Define security requirements:*
- *Input validation: All inputs validated*
- *Authentication: Proper auth checks*
- *Authorization: Role-based access control*

## 7. Deployment Instructions

### 7.1 Pre-deployment Checklist
- [ ] *All tests passing*
- [ ] *Code review completed*
- [ ] *Documentation updated*
- [ ] *Performance tests completed*
- [ ] *Security scan completed*

### 7.2 Deployment Steps
1. *Step 1: Build application*
   ```bash
   npm run build
   ```

2. *Step 2: Run tests*
   ```bash
   npm test
   ```

3. *Step 3: Deploy to staging*
   ```bash
   npm run deploy:staging
   ```

4. *Step 4: Verify staging deployment*
   ```bash
   npm run verify:staging
   ```

5. *Step 5: Deploy to production*
   ```bash
   npm run deploy:production
   ```

### 7.3 Rollback Procedure
*Describe rollback procedure if deployment fails:*
```bash
# Rollback command
npm run rollback:production
```

## 8. Documentation Requirements

### 8.1 Code Documentation
*Describe code documentation requirements:*
- *Function documentation*
- *API documentation*
- *Configuration documentation*

### 8.2 User Documentation
*If applicable, describe user documentation needed:*
- *User guide updates*
- *Help text additions*
- *Tutorial updates*

### 8.3 Technical Documentation
*Describe technical documentation needed:*
- *Architecture diagrams*
- *Data flow diagrams*
- *Sequence diagrams*

## 9. Risks and Issues

### 9.1 Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| *Technical complexity* | *Medium* | *High* | *Break into smaller tasks* |
| *Dependency issues* | *Low* | *Medium* | *Identify early and plan* |

### 9.2 Timeline Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| *Scope creep* | *Medium* | *High* | *Strict scope control* |
| *Resource constraints* | *Low* | *Medium* | *Plan resource allocation* |

## 10. Acceptance Criteria

### 10.1 Functional Acceptance Criteria
- [ ] *Criterion 1: Description*
- [ ] *Criterion 2: Description*
- [ ] *Criterion 3: Description*

### 10.2 Technical Acceptance Criteria
- [ ] *Criterion 1: Code quality standards met*
- [ ] *Criterion 2: Performance requirements met*
- [ ] *Criterion 3: Security requirements met*

### 10.3 Documentation Acceptance Criteria
- [ ] *Criterion 1: Code documented*
- [ ] *Criterion 2: User documentation updated*
- [ ] *Criterion 3: Technical documentation updated*

## 11. Appendix

### 11.1 References
- *Parent Feature PRD: [Link]*
- *Related tasks: [Links]*
- *Technical specifications: [Links]*

### 11.2 Resources
*List helpful resources:*
- *Documentation: [Links]*
- *Tools: [Links]*
- *Tutorials: [Links]*

### 11.3 Notes
*Additional notes or considerations:*
- *Note 1: Important consideration*
- *Note 2: Special instruction*
- *Note 3: Future enhancement idea*

### 11.4 Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | *YYYY-MM-DD* | *Author* | *Initial draft* |
| 1.1 | *YYYY-MM-DD* | *Author* | *Updated implementation steps* |