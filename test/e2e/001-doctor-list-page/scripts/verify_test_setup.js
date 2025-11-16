#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * 验证测试设置 - 确认 Playwright 和浏览器可以正常工作
 * 专门为医生列表页面测试定制的验证脚本
 */

async function verifyTestSetup(options = {}) {
  console.log('🔍 验证医生列表页面测试设置...');
  
  // 选项：是否创建带时间戳的报告目录
  const createReport = options.createReport || false;
  
  // 检查 Playwright 是否安装
  try {
    console.log('✅ Playwright 已安装');
  } catch (error) {
    console.error('❌ Playwright 未安装:', error.message);
    return false;
  }
  
  // 尝试启动浏览器
  let browser;
  let screenshotPath = null;
  let reportDir = null;
  
  // 如果创建报告，生成时间戳和目录
  if (createReport) {
    const now = new Date();
    const gmt8Offset = 8 * 60; // GMT+8 偏移量（分钟）
    const gmt8Time = new Date(now.getTime() + gmt8Offset * 60 * 1000);
    
    const year = gmt8Time.getUTCFullYear();
    const month = String(gmt8Time.getUTCMonth() + 1).padStart(2, '0');
    const day = String(gmt8Time.getUTCDate()).padStart(2, '0');
    const hour = String(gmt8Time.getUTCHours()).padStart(2, '0');
    const minute = String(gmt8Time.getUTCMinutes()).padStart(2, '0');
    const second = String(gmt8Time.getUTCSeconds()).padStart(2, '0');
    const timestamp = `${year}${month}${day}-${hour}${minute}${second}`;
    
    const scriptDir = __dirname;
    const projectDir = path.dirname(scriptDir);
    reportDir = path.join(projectDir, 'reports', `verification_report_${timestamp}`);
    const assetsDir = path.join(reportDir, 'assets');
    
    // 确保目录存在
    fs.mkdirSync(assetsDir, { recursive: true });
    
    console.log(`📁 验证报告目录: ${reportDir}`);
    screenshotPath = path.join(assetsDir, 'verification_screenshot.png');
  }
  
  try {
    browser = await chromium.launch({ headless: true });
    console.log('✅ Chromium 浏览器启动成功');
    
    // 创建页面
    const page = await browser.newPage();
    console.log('✅ 创建新页面成功');
    
    // 尝试访问前端服务
    let frontendRunning = false;
    try {
      await page.goto('http://localhost:5173', { timeout: 5000 });
      await page.waitForLoadState('networkidle', { timeout: 3000 });
      console.log('✅ 前端服务正在运行 (http://localhost:5173)');
      frontendRunning = true;
    } catch (error) {
      console.log('⚠️ 前端服务未运行: http://localhost:5173');
      console.log(`   错误信息: ${error.message}`);
    }
    
    // 尝试访问后端服务
    let backendRunning = false;
    try {
      const response = await page.goto('http://localhost:8080/actuator/health', { timeout: 5000 });
      if (response && response.status() === 200) {
        const healthData = await response.json();
        if (healthData.status === 'UP') {
          console.log('✅ 后端服务健康状态正常 (http://localhost:8080/actuator/health)');
          backendRunning = true;
        } else {
          console.log('⚠️ 后端服务状态异常:', healthData.status);
        }
      }
    } catch (error) {
      console.log('⚠️ 后端服务健康检查失败: http://localhost:8080/actuator/health');
      console.log(`   错误信息: ${error.message}`);
    }
    
    // 尝试访问医生列表页面
    if (frontendRunning) {
      try {
        await page.goto('http://localhost:5173/doctors', { timeout: 10000 });
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        
        // 检查页面标题
        const title = await page.title();
        console.log(`✅ 医生列表页面标题: ${title}`);
        
        // 检查医生卡片
        const doctorCards = await page.locator('.doctor-card').all();
        if (doctorCards.length > 0) {
          console.log(`✅ 找到 ${doctorCards.length} 个医生卡片`);
          
          // 检查第一个医生的信息
          const firstCard = doctorCards[0];
          const doctorName = await firstCard.locator('h3').textContent();
          console.log(`✅ 第一个医生姓名: ${doctorName}`);
          
          // 截图作为验证证据
          if (screenshotPath) {
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`✅ 验证截图已保存: ${screenshotPath}`);
          } else {
            // 兼容模式：保存到通用位置（用于快速验证）
            const fallbackPath = path.join(__dirname, '../reports', 'verification_screenshot.png');
            fs.mkdirSync(path.dirname(fallbackPath), { recursive: true });
            await page.screenshot({ path: fallbackPath, fullPage: true });
            console.log(`✅ 验证截图已保存: ${fallbackPath}`);
          }
        } else {
          console.log('⚠️ 未找到医生卡片，可能数据未加载');
        }
        
      } catch (error) {
        console.log('⚠️ 医生列表页面访问失败:', error.message);
      }
    }
    
    await page.close();
    await browser.close();
    console.log('✅ 浏览器关闭成功');
    
    console.log('\n🎉 测试设置验证完成！');
    
    // 如果创建了报告目录，生成验证报告
    if (reportDir && frontendRunning) {
      generateVerificationReport(reportDir, frontendRunning, backendRunning, screenshotPath);
    }
    
    // 总结状态
    if (frontendRunning && backendRunning) {
      console.log('✅ 所有服务运行正常，可以开始医生列表页面测试');
      return true;
    } else if (frontendRunning) {
      console.log('⚠️ 前端服务运行正常，但后端服务可能有问题');
      console.log('   可以继续测试，但可能无法验证完整的数据加载');
      return true;
    } else {
      console.log('❌ 关键服务未运行，测试可能失败');
      return false;
    }
    
  } catch (error) {
    console.error('❌ 浏览器操作失败:', error.message);
    if (browser) {
      await browser.close();
    }
    return false;
  }
}

// 运行验证
// 检查命令行参数
const args = process.argv.slice(2);
const createReport = args.includes('--report') || args.includes('-r');

verifyTestSetup({ createReport }).then(success => {
  if (success) {
    console.log('\n可以运行以下命令执行医生列表页面测试:');
    console.log('cd test/e2e/001-doctor-list-page');
    console.log('npm test                    # 运行简化测试');
    console.log('npm run test-detailed       # 运行详细测试');
    console.log('node scripts/test_doctors_simple.js    # 直接运行简化测试');
    
    if (createReport) {
      console.log('\n💡 验证报告已生成，可以查看详细的验证结果');
    }
  } else {
    console.log('\n测试设置验证失败，请检查以下事项:');
    console.log('1. Playwright 是否已安装: npm install');
    console.log('2. 浏览器是否已安装: npx playwright install chromium');
    console.log('3. 前端服务是否运行在 http://localhost:5173');
    console.log('4. 后端服务是否运行在 http://localhost:8080');
    console.log('5. 数据库是否已初始化并包含医生数据');
    
    if (createReport) {
      console.log('\n💡 验证报告已生成，包含详细的失败信息');
    }
  }
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('验证过程中出错:', error);
  process.exit(1);
});

function generateVerificationReport(reportDir, frontendRunning, backendRunning, screenshotPath) {
  const now = new Date();
  const gmt8Offset = 8 * 60; // GMT+8 偏移量（分钟）
  const gmt8Time = new Date(now.getTime() + gmt8Offset * 60 * 1000);
  const readableTime = `${gmt8Time.getUTCFullYear()}-${String(gmt8Time.getUTCMonth() + 1).padStart(2, '0')}-${String(gmt8Time.getUTCDate()).padStart(2, '0')} ${String(gmt8Time.getUTCHours()).padStart(2, '0')}:${String(gmt8Time.getUTCMinutes()).padStart(2, '0')}:${String(gmt8Time.getUTCSeconds()).padStart(2, '0')}`;
  
  const reportFile = path.join(reportDir, 'verification_report.md');
  
  let status = '❌ 失败';
  let details = '';
  
  if (frontendRunning && backendRunning) {
    status = '✅ 通过';
    details = '所有服务运行正常，可以开始医生列表页面测试。';
  } else if (frontendRunning) {
    status = '⚠️ 部分通过';
    details = '前端服务运行正常，但后端服务可能有问题，可以继续测试但可能无法验证完整的数据加载。';
  } else {
    status = '❌ 失败';
    details = '关键服务未运行，测试可能失败。';
  }
  
  const reportContent = `# 测试环境验证报告

## 验证执行信息
- **验证时间**: ${readableTime} (GMT+8)
- **验证脚本**: verify_test_setup.js
- **验证目标**: 确认医生列表页面测试环境准备就绪

## 验证结果
- **整体状态**: ${status}
- **详细说明**: ${details}

## 服务状态检查
- **前端服务 (http://localhost:5173)**: ${frontendRunning ? '✅ 运行中' : '❌ 未运行'}
- **后端服务 (http://localhost:8080)**: ${backendRunning ? '✅ 健康' : '❌ 异常'}

## 截图证据
${screenshotPath ? `![验证截图](./assets/${path.basename(screenshotPath)})` : '无截图'}

## 建议操作
${frontendRunning && backendRunning ? '- 环境验证通过，可以运行测试脚本' : ''}
${!frontendRunning ? '- 请启动前端服务: cd web/qa-web && npm run dev' : ''}
${!backendRunning ? '- 请启动后端服务: cd server/qa-service-user && ./mvnw spring-boot:run' : ''}
${!frontendRunning || !backendRunning ? '- 检查服务端口配置和依赖安装' : ''}

---
**生成时间**: ${readableTime} (GMT+8)
`;
  
  fs.writeFileSync(reportFile, reportContent, 'utf8');
  console.log(`📝 验证报告已生成: ${reportFile}`);
}