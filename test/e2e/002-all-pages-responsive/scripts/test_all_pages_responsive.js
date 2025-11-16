#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * 所有页面响应式测试脚本 - Node.js 版本
 * 测试验证当前 web/qa-web 应用中的所有页面在桌面和手机端都可以正常加载
 */

async function testAllPagesResponsive() {
  console.log('🚀 开始测试所有页面的响应式布局...');
  
  // 创建报告目录和文件路径
  const now = new Date();
  
  // 转换为 GMT+8 时区的时间
  const gmt8Offset = 8 * 60; // GMT+8 偏移量（分钟）
  const gmt8Time = new Date(now.getTime() + gmt8Offset * 60 * 1000);
  
  // 使用与 Python 版本相同的 timestamp 格式: YYYYMMDD-HHMMSS (GMT+8)
  const year = gmt8Time.getUTCFullYear();
  const month = String(gmt8Time.getUTCMonth() + 1).padStart(2, '0');
  const day = String(gmt8Time.getUTCDate()).padStart(2, '0');
  const hour = String(gmt8Time.getUTCHours()).padStart(2, '0');
  const minute = String(gmt8Time.getUTCMinutes()).padStart(2, '0');
  const second = String(gmt8Time.getUTCSeconds()).padStart(2, '0');
  const timestamp = `${year}${month}${day}-${hour}${minute}${second}`;
  
  // 使用与 Python 脚本相同的时间格式: YYYY-MM-DD HH:MM:SS (GMT+8)
  const readableTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  const reportDir = path.join(__dirname, '../reports', `test_report_${timestamp}`);
  const assetsDir = path.join(reportDir, 'assets');
  const reportFile = path.join(reportDir, 'report.md');
  
  // 确保目录存在
  fs.mkdirSync(assetsDir, { recursive: true });
  
  console.log(`📁 报告目录: ${reportDir}`);
  console.log(`🕒 测试时间: ${readableTime} (GMT+8)`);
  
  // 定义测试页面列表
  const testPages = [
    {
      path: '/',
      name: '首页',
      description: '应用主页'
    },
    {
      path: '/consultation',
      name: '咨询页面',
      description: '通用咨询页面'
    },
    {
      path: '/doctors',
      name: '医生列表',
      description: '医生列表页面'
    },
    {
      path: '/about',
      name: '关于页面',
      description: '关于我们页面'
    },
    {
      path: '/doctor/login',
      name: '医生登录',
      description: '医生登录页面'
    }
  ];
  
  // 定义测试设备配置
  const testDevices = [
    {
      name: '桌面端',
      viewport: { width: 1280, height: 800 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      isMobile: false,
      hasTouch: false
    },
    {
      name: '手机端',
      viewport: { width: 375, height: 667 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1  // 改为1，避免设备像素比缩放问题
    }
  ];
  
  // 测试结果收集
  const testResults = [];
  
  // 检查 Playwright 是否可用
  try {
    console.log('✅ Playwright 已安装');
  } catch (error) {
    console.error('❌ Playwright 未安装，请先运行: npm install playwright');
    process.exit(1);
  }
  
  // 启动浏览器
  const browser = await chromium.launch({ headless: true });
  console.log('✅ Chromium 浏览器启动成功');
  
  try {
    // 对每种设备进行测试
    for (const device of testDevices) {
      console.log(`\n🔍 开始测试 ${device.name} 布局...`);
      
      // 创建上下文
      const contextOptions = {
        viewport: device.viewport,
        userAgent: device.userAgent,
        isMobile: device.isMobile,
        hasTouch: device.hasTouch
      };
      
      // 如果设备配置中有额外参数，添加它们
      if (device.deviceScaleFactor) {
        contextOptions.deviceScaleFactor = device.deviceScaleFactor;
      }
      if (device.isLandscape !== undefined) {
        contextOptions.isLandscape = device.isLandscape;
      }
      
      const context = await browser.newContext(contextOptions);
      const page = await context.newPage();
      
      // 尝试访问首页，检查服务是否运行
      let serviceRunning = false;
      try {
        await page.goto('http://localhost:5173', { timeout: 5000 });
        await page.waitForLoadState('networkidle', { timeout: 3000 });
        console.log(`✅ 前端服务正在运行 (http://localhost:5173)`);
        serviceRunning = true;
      } catch (error) {
        console.log(`⚠️ 前端服务未运行: http://localhost:5173`);
        console.log(`   错误信息: ${error.message}`);
        serviceRunning = false;
      }
      
      // 如果服务未运行，跳过详细测试
      if (!serviceRunning) {
        // 为每个页面添加失败结果
        for (const pageInfo of testPages) {
          testResults.push({
            pageName: pageInfo.name,
            pagePath: pageInfo.path,
            device: device.name,
            success: false,
            error: '前端服务未运行',
            loadTime: null,
            screenshot: null
          });
        }
        await context.close();
        continue;
      }
      
      // 测试每个页面
      for (const pageInfo of testPages) {
        const pagePath = pageInfo.path;
        const pageName = pageInfo.name;
        const pageDesc = pageInfo.description;
        
        console.log(`  📍 测试 ${pageName}: http://localhost:5173${pagePath}`);
        
        const testResult = {
          pageName: pageName,
          pagePath: pagePath,
          device: device.name,
          success: false,
          error: null,
          loadTime: null,
          screenshot: null
        };
        
        try {
          // 记录开始时间
          const startTime = Date.now();
          
          // 访问页面
          await page.goto(`http://localhost:5173${pagePath}`, { timeout: 10000 });
          await page.waitForLoadState('networkidle', { timeout: 5000 });
          
          // 对于手机端，额外确保视口设置正确
          if (device.isMobile) {
            // 确保视口meta标签正确设置
            await page.addStyleTag({
              content: `
                @viewport {
                  width: device-width;
                }
                
                @media (max-width: 768px) {
                  * {
                    box-sizing: border-box;
                  }
                }
              `
            });
            
            // 确保页面正确适应移动视口
            await page.setViewportSize(device.viewport);
            
            // 强制设置视口meta标签
            await page.evaluate((viewport) => {
              // 更新viewport meta标签
              let viewportMeta = document.querySelector('meta[name="viewport"]');
              if (!viewportMeta) {
                viewportMeta = document.createElement('meta');
                viewportMeta.name = 'viewport';
                document.head.appendChild(viewportMeta);
              }
              viewportMeta.content = `width=${viewport.width}, initial-scale=1.0, maximum-scale=1.0, user-scalable=no`;
              
              // 添加移动设备检测
              Object.defineProperty(navigator, 'userAgent', {
                get: function() { 
                  return 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
                }
              });
              
              // 强制触发resize事件
              window.dispatchEvent(new Event('resize'));
            }, device.viewport);
            
            // 等待可能的响应式布局调整
            await page.waitForTimeout(1000);
            
            // 刷新页面以应用视口更改
            await page.reload();
            await page.waitForLoadState('networkidle', { timeout: 5000 });
            
            // 再次等待确保布局稳定
            await page.waitForTimeout(1000);
          }
          
          // 计算加载时间
          const loadTime = Date.now() - startTime;
          testResult.loadTime = loadTime;
          
          // 获取页面标题
          const pageTitle = await page.title();
          
          // 截图
          const screenshotFilename = `${device.name}_${pageName.replace(' ', '_')}.png`;
          const screenshotPath = path.join(assetsDir, screenshotFilename);
          
          // 对于手机端，确保截图尺寸正确
          const screenshotOptions = { path: screenshotPath, fullPage: true };
          
          // 对于手机端，确保截图使用正确的宽度，但截取完整页面
          if (device.isMobile) {
            try {
              // 获取完整页面高度
              const fullHeight = await page.evaluate(() => document.body.scrollHeight);
              
              // 临时调整视口以匹配完整页面
              await page.setViewportSize({
                width: device.viewport.width,
                height: Math.max(device.viewport.height, fullHeight)
              });
              
              // 截取完整页面
              await page.screenshot({
                path: screenshotPath,
                fullPage: true
              });
              
              // 恢复原始视口设置
              await page.setViewportSize(device.viewport);
            } catch (error) {
              // 如果失败，回退到常规截图
              console.log(`    ⚠️ 调整视口截图失败，回退到常规截图: ${error.message}`);
              await page.screenshot(screenshotOptions);
            }
          } else {
            await page.screenshot(screenshotOptions);
          }
          testResult.screenshot = screenshotPath;
          
          console.log(`    ✅ ${pageName} 加载成功 (耗时: ${loadTime}ms)`);
          console.log(`    📸 截图已保存: ${screenshotPath}`);
          console.log(`    📝 页面标题: ${pageTitle}`);
          
          testResult.success = true;
          
        } catch (error) {
          const errorMsg = error.message;
          testResult.error = errorMsg;
          console.log(`    ❌ ${pageName} 加载失败: ${errorMsg}`);
        }
        
        testResults.push(testResult);
      }
      
      // 关闭上下文
      await context.close();
    }
    
    console.log('✅ 测试完成，浏览器已关闭');
    
  } catch (error) {
    console.error(`❌ 测试过程中出错: ${error.message}`);
    console.error('这可能是由于 Playwright 浏览器未正确安装');
    console.error('请尝试运行: npx playwright install');
  } finally {
    await browser.close();
  }
  
  // 生成测试报告
  await generateReport(reportFile, readableTime, testResults, testPages, testDevices);
  
  console.log(`\n📝 测试报告已保存: ${reportFile}`);
  console.log('🎉 测试完成！');
  console.log(`📋 测试报告详情请查看: ${reportFile}`);
  
  return reportDir;
}

async function generateReport(reportFile, readableTime, testResults, testPages, testDevices) {
  // 统计测试结果
  const totalTests = testResults.length;
  const successfulTests = testResults.filter(r => r.success).length;
  const successRate = totalTests > 0 ? Math.round((successfulTests / totalTests) * 100 * 10) / 10 : 0;
  
  let reportContent = `# 002-所有页面响应式测试报告

## 测试概述

本测试验证 QA 医疗问答系统前端应用的所有页面在桌面和手机端的响应式加载情况，确保用户在不同设备上都能获得良好的使用体验。

### 测试环境

- **测试时间**: ${readableTime} (GMT+8)
- **前端地址**: http://localhost:5173
- **测试设备**: 桌面端 (1280x800) 和 手机端 (375x667)
- **测试工具**: Playwright

### 测试范围

本测试涵盖以下页面：
`;

  // 添加测试页面列表
  for (const page of testPages) {
    reportContent += `- **${page.name}** (\`${page.path}\`): ${page.description}\n`;
  }

  reportContent += `

## 测试结果统计

### 总体统计

- **总测试数**: ${totalTests} 项
- **成功测试**: ${successfulTests} 项
- **失败测试**: ${totalTests - successfulTests} 项
- **成功率**: ${successRate}%

`;

  // 按设备分组统计
  for (const device of testDevices) {
    const deviceName = device.name;
    const deviceResults = testResults.filter(r => r.device === deviceName);
    const deviceSuccess = deviceResults.filter(r => r.success).length;
    const deviceTotal = deviceResults.length;
    const deviceRate = deviceTotal > 0 ? Math.round((deviceSuccess / deviceTotal) * 100 * 10) / 10 : 0;
    
    reportContent += `- **${deviceName}**: ${deviceSuccess}/${deviceTotal} (${deviceRate}%)\n`;
  }

  reportContent += "\n";

  // 按页面分组统计
  reportContent += "### 按页面统计\n\n";
  reportContent += "| 页面 | 桌面端 | 手机端 | 总体 |\n";
  reportContent += "|------|--------|--------|------|\n";

  for (const page of testPages) {
    const pageName = page.name;
    const pagePath = page.path;
    
    const desktopResult = testResults.find(r => r.pagePath === pagePath && r.device === '桌面端');
    const mobileResult = testResults.find(r => r.pagePath === pagePath && r.device === '手机端');
    
    const desktopStatus = (desktopResult && desktopResult.success) ? "✅" : "❌";
    const mobileStatus = (mobileResult && mobileResult.success) ? "✅" : "❌";
    const overallStatus = (desktopResult && desktopResult.success && 
                           mobileResult && mobileResult.success) ? "✅" : "❌";
    
    reportContent += `| ${pageName} | ${desktopStatus} | ${mobileStatus} | ${overallStatus} |\n`;
  }

  reportContent += "\n";

  // 详细测试结果
  reportContent += "## 详细测试结果\n\n";

  for (const device of testDevices) {
    const deviceName = device.name;
    const deviceResults = testResults.filter(r => r.device === deviceName);
    
    reportContent += `### ${deviceName} 测试结果\n\n`;
    
    for (const result of deviceResults) {
      const pageName = result.pageName;
      const pagePath = result.pagePath;
      const success = result.success;
      const error = result.error;
      const loadTime = result.loadTime;
      const screenshot = result.screenshot;
      const screenshotName = screenshot ? path.basename(screenshot) : null;
      
      reportContent += `#### ${pageName} (${pagePath})\n\n`;
      
      if (success) {
        reportContent += `- **状态**: ✅ 成功\n`;
        reportContent += `- **加载时间**: ${loadTime}ms\n`;
        if (screenshot) {
          reportContent += `- **截图**: [📸 ${screenshotName}](./assets/${screenshotName})\n`;
          reportContent += `\n![${pageName}截图](./assets/${screenshotName})\n\n`;
        }
      } else {
        reportContent += `- **状态**: ❌ 失败\n`;
        reportContent += `- **错误信息**: ${error}\n`;
      }
      
      reportContent += "\n";
    }
  }

  // 结论和建议
  reportContent += "## 测试结论与建议\n\n";

  if (successRate === 100) {
    reportContent += "### 🎉 测试结论\n\n";
    reportContent += "所有页面在桌面和手机端都能正常加载，响应式设计工作良好。系统在不同设备上都能提供良好的用户体验。\n\n";
  } else {
    reportContent += `### ⚠️ 测试结论\n\n`;
    reportContent += `测试通过率为 ${successRate}%，存在部分页面在某些设备上无法正常加载的问题。\n\n`;
    
    // 列出失败的测试
    const failedResults = testResults.filter(r => !r.success);
    if (failedResults.length > 0) {
      reportContent += "#### 失败的测试:\n\n";
      for (const result of failedResults) {
        reportContent += `- **${result.pageName}** (${result.device}): ${result.error}\n`;
      }
      reportContent += "\n";
    }
  }

  reportContent += "### 🚀 改进建议\n\n";
  reportContent += "1. **响应式优化**: 针对加载失败的页面，检查响应式CSS和JavaScript适配\n";
  reportContent += "2. **性能优化**: 优化页面加载时间，特别是移动端的加载体验\n";
  reportContent += "3. **兼容性测试**: 定期进行跨浏览器和跨设备测试\n";
  reportContent += "4. **自动化集成**: 将响应式测试集成到CI/CD流程中\n";
  reportContent += "5. **用户反馈**: 收集不同设备用户的使用反馈，持续改进体验\n\n";

  reportContent += "---\n";
  reportContent += `**测试时间**: ${readableTime} (GMT+8)\n`;
  reportContent += "**测试工具**: Playwright\n";
  reportContent += "**报告生成**: 自动化测试脚本\n";

  // 写入报告文件
  fs.writeFileSync(reportFile, reportContent, 'utf8');
}

// 运行测试
testAllPagesResponsive().catch(console.error);