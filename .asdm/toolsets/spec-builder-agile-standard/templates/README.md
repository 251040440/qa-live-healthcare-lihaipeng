# Spec Builder Templates

This directory contains templates for the Spec Builder toolset. These templates are used by the AI model to generate specification documents for Agile teams.

## Available Templates

### 1. `epic-prd-template.md`
**Purpose**: Template for creating Product Requirements Document (PRD) at the epic level.

**Usage**: 
- Used by the `/epic-prd-generation-instruction` command
- Provides structure for documenting high-level requirements, user stories, acceptance criteria, and success metrics for an epic

**Key Sections**:
- Epic Overview
- Business Objectives
- User Stories
- Acceptance Criteria
- Success Metrics
- Technical Considerations
- Dependencies

### 2. `feature-prd-template.md`
**Purpose**: Template for creating Product Requirements Document (PRD) at the feature level.

**Usage**:
- Used by the `/feature-prd-generation-instruction` command
- Provides structure for documenting detailed requirements for a specific feature within an epic
- References the parent epic document for context

**Key Sections**:
- Feature Overview
- Parent Epic Reference
- User Stories
- Functional Requirements
- Non-Functional Requirements
- UI/UX Specifications
- Acceptance Criteria
- Dependencies

### 3. `task-template.md`
**Purpose**: Template for creating task-level documentation.

**Usage**:
- Used by the `/task-generation-instruction` command
- Provides structure for documenting implementation details for a specific task within a feature
- References the parent feature document for context

**Key Sections**:
- Task Overview
- Parent Feature Reference
- Implementation Details
- Technical Specifications
- Testing Requirements
- Acceptance Criteria
- Estimated Effort

## Template Customization

Team administrators (Project Managers, Product Managers, Product Owners) can customize these templates to match their specific process requirements. To customize:

1. Copy the template file to a new location
2. Modify the structure and content as needed
3. Update the corresponding instruction file to reference the customized template

## Template Variables

Templates support the following variables that will be replaced during document generation:

- `{{epic_name}}`: Name of the epic
- `{{epic_description}}`: Description of the epic
- `{{feature_name}}`: Name of the feature
- `{{feature_description}}`: Description of the feature
- `{{task_name}}`: Name of the task
- `{{task_description}}`: Description of the task
- `{{current_date}}`: Current date in YYYY-MM-DD format
- `{{author}}`: Name of the document author

## Best Practices

1. **Consistency**: Use consistent formatting and structure across all templates
2. **Clarity**: Write clear, concise section headers and descriptions
3. **Completeness**: Ensure templates cover all necessary aspects of specification documentation
4. **Flexibility**: Design templates to accommodate different types of projects and requirements
5. **Maintainability**: Keep templates up-to-date with evolving team processes and standards