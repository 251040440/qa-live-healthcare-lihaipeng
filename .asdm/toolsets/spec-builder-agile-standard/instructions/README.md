# Spec Builder Instructions

This directory contains instructions for the Spec Builder toolset. These instructions guide the AI model on how to use the templates to generate specification documents.

## Available Instructions

### 1. `epic-prd-generation-instruction.md`
**Purpose**: Instruction for building Product Requirements Document (PRD) at the epic level.

**Usage**: 
- Used by the `/epic-prd-generation-instruction` command
- Guides the AI model to generate an epic PRD using the `epic-prd-template.md` template
- Takes epic description as input and produces a comprehensive PRD document

**Input**: Epic description provided by the user
**Output**: Complete epic PRD document saved to `.asdm/specs/{epic-number}_{epic-name}/epic-prd.md`

### 2. `feature-prd-generation-instruction.md`
**Purpose**: Instruction for building Product Requirements Document (PRD) at the feature level.

**Usage**:
- Used by the `/feature-prd-generation-instruction` command
- Guides the AI model to generate a feature PRD using the `feature-prd-template.md` template
- Takes epic document path and additional prompts as input
- References the parent epic document for context

**Input**: 
1. Path to existing epic document
2. Additional prompts for feature generation
**Output**: Complete feature PRD document saved to `.asdm/specs/{epic-number}_{epic-name}/{feature-number}_{feature-name}/feature-prd.md`

### 3. `task-generation-instruction.md`
**Purpose**: Instruction for building task-level documentation.

**Usage**:
- Used by the `/task-generation-instruction` command
- Guides the AI model to generate task documentation using the `task-template.md` template
- Takes feature document path and additional prompts as input
- References the parent feature document for context

**Input**:
1. Path to existing feature document
2. Additional prompts for task generation
**Output**: Complete task document saved to `.asdm/specs/{epic-number}_{epic-name}/{feature-number}_{feature-name}/{task-number}_{task-name}.md`

## Instruction Structure

Each instruction file follows this structure:

1. **Purpose**: What the instruction is for
2. **Input Requirements**: What inputs are needed from the user
3. **Template Reference**: Which template to use
4. **Processing Steps**: Step-by-step instructions for the AI model
5. **Output Specifications**: Where and how to save the output
6. **Quality Checks**: What to verify before completing

## How Instructions Work with Templates

1. **Template Loading**: The instruction loads the appropriate template
2. **Context Injection**: The instruction injects user inputs and context into the template
3. **Document Generation**: The AI model generates the document by following the template structure
4. **Context Integration**: References to parent documents are added where applicable
5. **File Organization**: Generated documents are saved in the appropriate directory structure

## Customizing Instructions

Team administrators can customize instructions to match their specific processes:

1. **Modify Existing Instructions**: Edit the instruction files to change the generation process
2. **Add New Instructions**: Create new instruction files for additional document types
3. **Update Template References**: Change which templates are used by which instructions

## Best Practices for Instruction Design

1. **Clarity**: Write clear, unambiguous instructions for the AI model
2. **Completeness**: Include all necessary steps for document generation
3. **Consistency**: Maintain consistent structure across all instructions
4. **Error Handling**: Include guidance for handling edge cases and errors
5. **Validation**: Include quality checks to ensure generated documents meet standards

## Instruction Variables

Instructions support the following variables that guide document generation:

- `{{user_input}}`: Raw input from the user
- `{{parsed_input}}`: Processed and structured input
- `{{template_path}}`: Path to the template file
- `{{output_path}}`: Path where the document should be saved
- `{{context_data}}`: Data loaded from context-builder (if available)
- `{{current_date}}`: Current date for document metadata

## Integration with Context Builder

Instructions can leverage context from the `context-builder` toolset:

1. **Context Loading**: Load relevant context about the codebase and project
2. **Context Integration**: Use context to inform document generation
3. **Context Validation**: Verify that generated documents align with project context

This integration ensures that specification documents are consistent with the actual codebase and project requirements.