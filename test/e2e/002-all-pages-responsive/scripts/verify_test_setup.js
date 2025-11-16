#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * 验证测试设置 - 确认 Playwright 和浏览器可以正常工作
 */

async function verifyTestSetup() {
  console.log('🔍 验证测试设置...');
  
  // 检查 Playwright 是否安装
  try {
    console.log('✅ Playwright 已安装');
  } catch (error) {
    console.error('❌ Playwright 未安装:', error.message);
    return false;
  }
  
  // 尝试启动浏览器
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    console.log('✅ Chromium 浏览器启动成功');
    
    // 创建页面
    const page = await browser.newPage();
    console.log('✅ 创建新页面成功');
    
    // 尝试访问一个简单的网页
    await page.goto('about:blank');
    console.log('✅ 页面导航成功');
    
    // 获取页面标题
    const title = await page.title();
    console.log(`✅ 页面标题: ${title}`);
    
    // 截图
    const screenshotPath = path.join(__dirname, '../reports', 'verification_screenshot.png');
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    await page.screenshot({ path: screenshotPath });
    console.log(`✅ 截图已保存: ${screenshotPath}`);
    
    await page.close();
    await browser.close();
    console.log('✅ 浏览器关闭成功');
    
    console.log('🎉 测试设置验证成功！可以正常运行测试脚本。');
    return true;
    
  } catch (error) {
    console.error('❌ 浏览器操作失败:', error.message);
    if (browser) {
      await browser.close();
    }
    return false;
  }
}

// 运行验证
verifyTestSetup().then(success => {
  if (success) {
    console.log('\n可以运行以下命令执行测试:');
    console.log('cd test/e2e/002-all-pages-responsive');
    console.log('node scripts/test_all_pages_responsive.js');
  } else {
    console.log('\n测试设置验证失败，请检查以下事项:');
    console.log('1. Playwright 是否已安装: npm install playwright');
    console.log('2. 浏览器是否已安装: npx playwright install chromium');
    console.log('3. 前端服务是否运行在 http://localhost:5173');
  }
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('验证过程中出错:', error);
  process.exit(1);
});