# 001-医生列表页面端到端测试

## 测试场景说明

本测试场景验证医疗问答系统的前端医生列表页面是否能够正确加载和显示后端服务提供的医生数据。这是核心的用户功能之一，确保患者能够浏览和选择合适的医生进行在线咨询。

## 测试目标

- ✅ 验证医生列表页面能够正常访问
- ✅ 验证所有医生数据正确加载和显示
- ✅ 验证医生信息（姓名、科室、职称、经验等）准确无误
- ✅ 验证医生在线状态正确显示
- ✅ 验证前后端数据集成正常工作

## 测试数据

测试数据来源于后端数据库初始化脚本：
`server/qa-service-user/src/main/resources/db/data/doctor_user_data.sql`

包含5名医生的完整信息：
- 张伟医生（心内科，主任医师，15年经验）
- 李娜医生（儿科，副主任医师，10年经验）
- 王强医生（骨科，主治医师，8年经验）
- 刘敏医生（妇产科，主任医师，18年经验）
- 陈杰医生（消化内科，副主任医师，12年经验）

## 测试环境要求

### 前置条件
1. 后端服务已启动并运行在 http://localhost:8080
2. 前端开发服务器已启动并运行在 http://localhost:5173
3. 数据库已初始化并包含测试数据

### 启动命令
```bash
# 启动后端服务（在 server/qa-service-user 目录下）
./mvnw spring-boot:run

# 启动前端服务（在 web/qa-web 目录下）
npm run dev
```

## 测试脚本

### 🆕 新版测试脚本（推荐）
`scripts/test_doctors_simple_v2.py` - 简化版测试脚本，支持新的报告目录结构
- ✅ 自动生成带时间戳的报告目录
- ✅ 每个报告有独立的 assets 子目录
- ✅ 自动保存截图到对应目录

`scripts/test_doctors_page_v2.py` - 完整版测试脚本，支持新目录结构
- ✅ 包含详细验证步骤和错误处理
- ✅ 生成完整的端到端测试报告
- ✅ 支持独立资源管理

### 旧版测试脚本（兼容）
`scripts/test_doctors_simple.py` - 旧版简化脚本（兼容模式）
`scripts/test_doctors_page.py` - 旧版完整脚本（兼容模式）

## 如何运行测试

### 🆕 方式1：运行新版简化测试（推荐）
```bash
cd test/e2e/001-doctor-list-page
python scripts/test_doctors_simple_v2.py
```
自动生成：
- 带时间戳的报告目录
- 独立的 assets 子目录
- 完整的测试报告和截图

### 🆕 方式2：运行新版完整测试
```bash
cd test/e2e/001-doctor-list-page
python scripts/test_doctors_page_v2.py
```
包含：
- 详细的验证步骤
- 完整的错误处理
- 丰富的测试报告内容

### 方式3：运行旧版测试（兼容）
```bash
cd test/e2e/001-doctor-list-page
python scripts/test_doctors_simple.py
```

## 测试输出

### 控制台输出示例（新版脚本）
```
🚀 开始测试医生列表页面...
📁 报告目录: /home/azureuser/source/tkt01/qa-live-healthcare-bolt-vue-c1joxy7j/test/e2e/001-doctor-list-page/reports/test_report_20251116-123002
📍 访问首页: http://localhost:5173
✅ 首页访问成功
📸 首页截图已保存: /home/azureuser/source/tkt01/qa-live-healthcare-bolt-vue-c1joxy7j/test/e2e/001-doctor-list-page/reports/test_report_20251116-123002/assets/homepage_simple.png
📍 访问医生列表页面: http://localhost:5173/doctors
✅ 医生页面访问成功
📸 医生页面截图已保存: /home/azureuser/source/tkt01/qa-live-healthcare-bolt-vue-c1joxy7j/test/e2e/001-doctor-list-page/reports/test_report_20251116-123002/assets/doctors_page_simple.png
✅ 页面标题: 医生团队
✅ 找到 5 个医生卡片
✅ 第一个医生姓名: 张伟医生
📸 详细页面截图已保存: /home/azureuser/source/tkt01/qa-live-healthcare-bolt-vue-c1joxy7j/test/e2e/001-doctor-list-page/reports/test_report_20251116-123002/assets/doctors_page_detail.png
✅ 在页面中找到 5 名医生: 张伟医生 李娜医生 王强医生 刘敏医生 陈杰医生
✅ 在页面中找到 5 个科室: 心内科 儿科 骨科 妇产科 消化内科
📝 测试报告已保存: ../reports/test_report_20251116-123002/report.md
🎉 测试完成！
📋 测试报告已生成: ../reports/test_report_20251116-123002/report.md
```

### 🆕 生成文件（新版脚本）
测试运行后会自动生成完整的报告目录结构：
```
reports/test_report_YYYYMMDD-HHMMSS/
├── report.md                    # 测试报告主体
└── assets/                      # 该报告专用的截图资源
    ├── homepage_simple.png      # 首页截图
    ├── doctors_page_simple.png  # 医生列表页面截图
    └── doctors_page_detail.png  # 详细页面截图
```

### 📊 测试报告统计
每次测试运行都会：
- ✅ 自动生成带时间戳的独立报告目录
- ✅ 保存所有相关截图到独立的 assets 目录
- ✅ 生成包含验证结果的完整报告
- ✅ 支持历史报告的对比和回溯

## 测试报告

测试报告保存在 `reports/` 目录下，文件格式为：`test_report_YYYYMMDD-HHMMSS.md`

### 📊 测试报告列表

| 执行时间 (GMT+8) | 直接结果 | 医生验证 | 科室验证 | 报告链接 |
|------------------|----------|----------|----------|----------|
| 2025-11-16 20:56:53 | ✅ 通过 | 5/5 (100%) | 5/5 (100%) | [📄 查看报告](reports/test_report_20251116-205653/report.md) |

### 📈 测试统计总结
- **总执行次数**: 1次
- **通过率**: 100% (1/1)
- **平均医生验证率**: 100% (5/5)
- **平均科室验证率**: 100% (5/5)
- **最近执行**: 2025-11-16 20:56:53 (GMT+8)
- **最新脚本**: test_doctors_simple_v2.py (支持GMT+8时区和新目录结构)

### 🔍 快速查看
- **📋 最新报告**: [test_report_20251116-205653/report.md](reports/test_report_20251116-205653/report.md)
- **🖼️ 最新截图**: 查看 `reports/test_report_20251116-205653/assets/` 目录下的最新截图
- **⚡ 立即运行**: 执行 `python scripts/test_doctors_simple_v2.py`

### 📋 报告内容说明
所有测试报告均包含：
- **测试环境信息** - 运行环境、版本信息等
- **详细测试步骤** - 完整的测试执行流程
- **截图证据** - 使用相对路径的页面截图
- **数据验证结果** - 医生数据完整性验证
- **技术集成验证** - 前后端集成功能检查
- **性能表现分析** - 加载时间和响应分析
- **改进建议** - 后续优化方向

### 📸 截图资源
每个测试报告现在都有自己的独立 `assets/` 目录，截图使用相对路径引用，可直接在Markdown预览中查看：
- `./assets/homepage_simple.png` - 首页截图
- `./assets/doctors_page_simple.png` - 医生列表页面截图
- `./assets/doctors_page_detail.png` - 详细验证截图

### 📁 完整目录结构
```
001-doctor-list-page/
├── README.md                           # 📖 本说明文档
├── scripts/                            # 🛠️ 测试脚本目录
│   ├── test_doctors_simple_v2.py      # ✅ 新版简化脚本（推荐）
│   └── test_doctors_page_v2.py        # ✅ 新版完整脚本
├── reports/                            # 📊 测试报告目录
│   └── test_report_20251116-205653/   # 🆕 最新测试报告
│       ├── report.md                  #    报告主体
│       └── assets/                    #    专用资源
│           ├── homepage_simple.png
│           ├── doctors_page_simple.png
│           └── doctors_page_detail.png
│   ├── test_report_20251116-203847/   # 📋 历史测试报告
│   ├── test_report_20251116-123441/   # 📋 历史测试报告
│   ├── test_report_20251116-123002/   # 📋 历史测试报告
│   ├── test_report_20251116-121851/   # 📋 历史测试报告
│   ├── test_report_20251116-121735/   # 📋 历史测试报告
│   └── test_report_20251116-121212/   # 📋 历史测试报告
└── test-execution-summary.md          # 📈 执行总结
```

## 验证要点

### 功能验证
1. **页面访问**: 首页和医生列表页面正常加载
2. **数据完整性**: 所有5名医生都显示在页面上
3. **信息准确性**: 医生姓名、科室、职称与数据库完全一致
4. **状态显示**: 在线/离线状态正确显示
5. **UI渲染**: Vue.js组件正确渲染所有数据

### 技术验证
1. **API集成**: 前端成功调用后端 `/api/doctors` 接口
2. **数据传递**: 医生数据从后端正确传递到前端
3. **响应式设计**: 页面布局在不同屏幕尺寸下正常显示
4. **加载性能**: 页面在合理时间内加载完成

## 目录结构

```
001-doctor-list-page/
├── README.md                    # 本说明文件
├── scripts/                     # 测试脚本目录
│   ├── test_doctors_simple.py   # 主要测试脚本
│   └── test_doctors_page.py     # 完整测试脚本
├── reports/                     # 测试报告目录
│   └── test_report_*.md         # 生成的测试报告
└── assets/                      # 测试资源目录
    ├── homepage_simple.png      # 首页截图
    ├── doctors_page_simple.png  # 医生页面截图
    └── doctors_page_detail.png  # 详细截图
```

## 故障排除

### 常见问题

1. **端口未启动**
   - 确保后端服务在 8080 端口运行
   - 确保前端服务在 5173 端口运行

2. **测试脚本运行失败**
   - 检查 Playwright 是否已安装：`pip install playwright`
   - 安装浏览器：`playwright install`

3. **数据不匹配**
   - 检查数据库是否正确初始化
   - 确认后端API返回预期数据

4. **截图生成失败**
   - 检查文件写入权限
   - 确保 `assets/` 目录存在

### 调试建议
1. 先手动访问页面确认功能正常
2. 检查浏览器控制台是否有错误信息
3. 使用浏览器开发者工具检查API调用
4. 查看后端日志确认数据返回

## 扩展建议

### 短期扩展
1. 添加医生详情页面跳转测试
2. 增加移动端响应式测试
3. 添加医生搜索功能测试

### 长期规划
1. 集成到CI/CD流水线
2. 添加性能测试指标
3. 增加多浏览器兼容性测试
4. 添加视觉回归测试

## 相关文件

- 前端代码：`web/qa-web/src/views/Doctors.vue`
- API接口：`web/qa-web/src/api/modules/doctor.ts`
- 后端API：`server/qa-service-user/src/main/java/com/leansofx/qaserviceuser/controller/`
- 数据库脚本：`server/qa-service-user/src/main/resources/db/data/doctor_user_data.sql`

---
**创建时间**: 2025年11月16日 (GMT+8)
**最后更新**: 2025年11月16日 20:56 (GMT+8)
**维护者**: QA团队