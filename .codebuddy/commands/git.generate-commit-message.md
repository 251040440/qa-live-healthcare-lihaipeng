run 'git status' and 'git diff' to gather information about the current state of the repository and recent changes. Based on the the context collected above, generate a concise and descriptive commit message that accurately reflects the modifications made in the codebase. Ensure the message adheres to best practices for commit messages, including clarity, brevity, and relevance. the commit message should be formatted as follows:

feat: 添加应用管理脚本及对应的npm命令

- 新增app-management.sh脚本，提供应用启动、停止、重启、状态查看和日志查看功能
- 脚本支持自动端口管理、进程管理、依赖检查和日志管理
- 在package.json中添加start、stop、restart、status、logs等npm命令
- 更新README.md文档，添加应用管理脚本使用说明和项目结构更新

Where "feat" is the type of change (e.g., feat, fix, docs, style, refactor, test, chore), followed by a brief summary of the changes in Chinese. The body of the message should provide additional details about the changes made, formatted as bullet points.