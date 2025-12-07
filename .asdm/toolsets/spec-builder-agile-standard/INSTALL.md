# Spec Builder for Agile Team (Standard version) - Installation Guide

**Toolset ID:** `spec-builder-agile-standard`

This document provides instructions for installing and initializing the Spec Builder for Agile Team (Standard version) toolset.

## Overview

Spec Builder for Agile Team (Standard version) (`spec-builder-agile-standard`) is a toolset for building specification documents for Software Development teams using Agile methodology. This Standard version is designed for teams using a standard process to manage their work.

## Installation Steps

### 1. Create `.asdm/specs` directory for Spec Builder for Agile Team (Standard version)'s workspace

Create the directory structure for storing specification documents:

```bash
mkdir -p .asdm/specs
```

### 2. Check and install dependency toolset `context-builder`

Check if the dependency toolset `context-builder` (toolset ID: `context-builder`) is installed. If not, install and initialize it:

```bash
# Check if context-builder exists
if [ ! -d ".asdm/contexts/" ]; then
    echo "Installing context-builder toolset using ASDM Bootstrapper"
    asdm install context-builder
    
    # Initialize context-builder
    echo "Follow instructions in .asdm/toolsets/context-builder/INSTALL.md"
fi
```

### 3. Detect the current `Agentic Engine` provider

Detect the current AI coding assistant provider (e.g., Claude Code, GitHub Copilot, Tencent CodeBuddy). Using the following guidelines to detect the provider:

- If `.claude` directory exists, use `Claude Code`
- If `.github` directory exists, use `GitHub Copilot`
- If `.codebuddy` directory exists, use `Tencent CodeBuddy`

### 4. Create shortcuts commands for `Spec Builder for Agile Team (Standard version)` (toolset ID: `spec-builder-agile-standard`) in provider's entry point

Create shortcut commands in the appropriate location based on the detected provider. The installation process is consistent across all providers - we use `cat` to concatenate provider-specific frontmatter with the actual instruction content:

#### For Claude Code (`.claude/commands/`):
Claude Code uses Markdown files with Frontmatter metadata for slash commands. Create commands by concatenating Claude-specific frontmatter with instruction content:

```bash
mkdir -p .claude/commands/

# Epic PRD Generation command
cat > .claude/commands/epic-prd-generation-instruction.md << 'EOF'
---
description: "Build PRD document for an epic"
argument-hint: "[epic description]"
allowed-tools: "ReadFile, Bash(git:*), Bash(mkdir:*), Bash(cp:*), Bash(echo:*)"
---

EOF
cat .asdm/toolsets/spec-builder-agile-standard/instructions/epic-prd-generation-instruction.md >> .claude/commands/epic-prd-generation-instruction.md

# Feature PRD Generation command
cat > .claude/commands/feature-prd-generation-instruction.md << 'EOF'
---
description: "Build PRD document for a feature based on an epic"
argument-hint: "[epic document path] [additional prompt]"
allowed-tools: "ReadFile, Bash(git:*), Bash(mkdir:*), Bash(cp:*), Bash(echo:*)"
---

EOF
cat .asdm/toolsets/spec-builder-agile-standard/instructions/feature-prd-generation-instruction.md >> .claude/commands/feature-prd-generation-instruction.md

# Task Generation command
cat > .claude/commands/task-generation-instruction.md << 'EOF'
---
description: "Build task document for a feature"
argument-hint: "[feature document path] [additional prompt]"
allowed-tools: "ReadFile, Bash(git:*), Bash(mkdir:*), Bash(cp:*), Bash(echo:*)"
---

EOF
cat .asdm/toolsets/spec-builder-agile-standard/instructions/task-generation-instruction.md >> .claude/commands/task-generation-instruction.md
```

#### For GitHub Copilot (`.github/prompts/`):
GitHub Copilot uses `.prompt.md` files with YAML frontmatter. Create prompt files by concatenating GitHub-specific frontmatter with instruction content:

```bash
mkdir -p .github/prompts/

# Epic PRD Generation prompt
cat > .github/prompts/epic-prd-generation-instruction.prompt.md << 'EOF'
---
agent: 'agent'
tools: ['readFile', 'search/codebase', 'createDirectory', 'createFile', 'editFiles', 'listDirectory', 'fileSearch', 'textSearch']
description: 'Build PRD document for an epic'
argument-hint: 'Enter epic description'
---

EOF
cat .asdm/toolsets/spec-builder-agile-standard/instructions/epic-prd-generation-instruction.md >> .github/prompts/epic-prd-generation-instruction.prompt.md

# Feature PRD Generation prompt
cat > .github/prompts/feature-prd-generation-instruction.prompt.md << 'EOF'
---
agent: 'agent'
tools: ['readFile', 'search/codebase', 'createDirectory', 'createFile', 'editFiles', 'listDirectory', 'fileSearch', 'textSearch']
description: 'Build PRD document for a feature based on an epic'
argument-hint: 'Enter epic document path and additional prompt'
---

EOF
cat .asdm/toolsets/spec-builder-agile-standard/instructions/feature-prd-generation-instruction.md >> .github/prompts/feature-prd-generation-instruction.prompt.md

# Task Generation prompt
cat > .github/prompts/task-generation-instruction.prompt.md << 'EOF'
---
agent: 'agent'
tools: ['readFile', 'search/codebase', 'createDirectory', 'createFile', 'editFiles', 'listDirectory', 'fileSearch', 'textSearch']
description: 'Build task document for a feature'
argument-hint: 'Enter feature document path and additional prompt'
---

EOF
cat .asdm/toolsets/spec-builder-agile-standard/instructions/task-generation-instruction.md >> .github/prompts/task-generation-instruction.prompt.md
```

#### For Tencent CodeBuddy (`.codebuddy/commands/`):
CodeBuddy doesn't support frontmatter, so simply copy the instruction files as-is:

```bash
mkdir -p .codebuddy/commands/

# Copy instruction files directly (no frontmatter needed)
cp .asdm/toolsets/spec-builder-agile-standard/instructions/epic-prd-generation-instruction.md .codebuddy/commands/
cp .asdm/toolsets/spec-builder-agile-standard/instructions/feature-prd-generation-instruction.md .codebuddy/commands/
cp .asdm/toolsets/spec-builder-agile-standard/instructions/task-generation-instruction.md .codebuddy/commands/
```

### 5. Manual Usage for Other Providers

If your AI coding assistant provider is not detected by the automatic detection logic (Claude Code, GitHub Copilot, or Tencent CodeBuddy), you can still use the Spec Builder for Agile Team (Standard version) manually. Follow these steps:

#### Direct Instruction Usage
You can directly use the instruction files by copying their relative paths and pasting them into your AI coding assistant's chat window:

1. **Navigate to the instruction files**:
   ```bash
   cd .asdm/toolsets/spec-builder-agile-standard/instructions/
   ```

2. **Right-click on the desired instruction file** and copy its relative path:
   - For epic PRD generation: `epic-prd-generation-instruction.md`
   - For feature PRD generation: `feature-prd-generation-instruction.md`
   - For task generation: `task-generation-instruction.md`

3. **Enter a prompt** in your AI coding assistant:
   ```
   Follow the instructions in {relative path to instruction file}
   ```

## Verification

After installation, verify that:

1. The `.asdm/specs` directory exists for Spec Builder for Agile Team (Standard version)
2. The `context-builder` toolset is installed
3. Shortcut commands for Spec Builder for Agile Team (Standard version) are created in the appropriate provider directory (if using Claude Code, GitHub Copilot, or Tencent CodeBuddy)
4. The Spec Builder for Agile Team (Standard version) toolset files are located in `.asdm/toolsets/spec-builder-agile-standard` (toolset ID: `spec-builder-agile-standard`)

**For other providers**: Verify that you can access the instruction files at:
- `.asdm/toolsets/spec-builder-agile-standard/instructions/epic-prd-generation-instruction.md`
- `.asdm/toolsets/spec-builder-agile-standard/instructions/feature-prd-generation-instruction.md`
- `.asdm/toolsets/spec-builder-agile-standard/instructions/task-generation-instruction.md`

## Usage

### For Supported Providers (Claude Code, GitHub Copilot, Tencent CodeBuddy)
Once installed, you can use the following commands:

- `/epic-prd-generation-instruction {epic description}`: Build PRD document for an epic
- `/feature-prd-generation-instruction {epic document path} {additional prompt for feature generation}`: Build PRD document for a feature
- `/task-generation-instruction {feature document path} {additional prompt for task generation}`: Build task document for a feature

### For Other Providers (Manual Usage)
If your provider is not automatically detected, you can manually use the instructions by following the steps in the "Manual Usage for Other Providers" section above.

## Notes

- This installation process assumes you have the necessary permissions to create directories and files
- The actual implementation of the commands will be handled by the AI model using the templates and instructions provided in Spec Builder for Agile Team (Standard version) (toolset ID: `spec-builder-agile-standard`)
- Make sure to customize the provider-specific setup based on your actual AI coding assistant
- The toolset ID `spec-builder-agile-standard` should be used consistently when referring to Spec Builder for Agile Team (Standard version) in commands and documentation
- **For providers not in the detection logic**: Users can manually use the instruction files by copying their relative paths and entering prompts like "follow the instructions in .asdm/toolsets/spec-builder-agile-standard/instructions/epic-prd-generation-instruction.md"