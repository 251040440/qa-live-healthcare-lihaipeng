# 001 - 医生列表页面测试

## 测试用例名称
医生列表页面数据加载验证测试

## 测试概要说明
本测试用例验证医生列表页面(http://localhost:5173/doctors)是否正确加载并显示了所有医生数据。测试将从首页导航到医生列表页面，并验证页面显示的医生信息与数据库中的数据一致。

## 测试包执行前置条件
- Node.js >= 16.0.0
- npm >= 8.0.0
- web/qa-web 应用已准备就绪
- 测试脚本所需依赖已安装（通过npm install）

## 测试步骤
1. 启动web/qa-web应用开发服务器
2. 访问首页(http://localhost:5173)并截图
3. 通过点击首页顶部菜单中的"医生团队"链接，进入医生列表页面
4. 对医生列表页面进行截图
5. 验证医生列表页面显示的所有医生信息与数据库(web/qa-web/src/data/doctor-user-list.json)中的数据一致
6. 生成测试报告并保存相关资源

## 测试工具包结构
```
test/e2e/001-doctor-list-page/
├── README.md                          # 测试用例说明文档
├── package.json                       # 依赖包配置和测试脚本
├── scripts/                           # 测试脚本目录
│   └── doctor-list-test.ts           # TypeScript测试脚本
└── reports/                           # 测试报告目录
    ├── assets/                        # 测试资源目录
    │   ├── [timestamp]/               # 按时间戳组织的子目录
    │   │   ├── screenshots/           # 测试截图
    │   │   ├── report.json            # 测试结果JSON
    │   │   └── test.log               # 测试日志
    │   └── ...                        # 其他测试执行的资源
    └── [timestamp]/README.md          # 测试报告文档
```

## 测试工具包使用说明
1. 进入测试目录：
   ```bash
   cd test/e2e/001-doctor-list-page
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 运行测试：
   ```bash
   npm run test
   ```

4. 查看测试报告：
   测试完成后，可在reports目录下查看生成的测试报告和相关资源。报告目录按时间戳命名，格式为：001-doctor-list-page-result-YYYYMMDD-HHMMSS

## 测试结果说明
测试报告将包含：
- 测试执行概述
- 按步骤的测试结果
- 验证点检查结果
- 测试截图
- 错误日志（如有）

## 注意事项
- 测试使用Playwright框架进行自动化测试
- 测试脚本使用TypeScript编写
- 所有时间戳均使用GMT+8时区
- 测试报告会在reports目录下自动创建，保留历史测试记录