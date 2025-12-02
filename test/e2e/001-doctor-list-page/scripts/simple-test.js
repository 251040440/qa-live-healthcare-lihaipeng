const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');

// 获取当前时间戳
function getTimestamp() {
  const now = new Date();
  const dateStr = now.getFullYear() + 
                 String(now.getMonth() + 1).padStart(2, '0') + 
                 String(now.getDate()).padStart(2, '0');
  const timeStr = String(now.getHours()).padStart(2, '0') + 
                 String(now.getMinutes()).padStart(2, '0') + 
                 String(now.getSeconds()).padStart(2, '0');
  return `${dateStr}-${timeStr}`;
}

// 获取格式化的时间
function getFormattedTime() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').substring(0, 19) + ' GMT+8';
}

// 主测试函数
async function runTest() {
  console.log(`[${getFormattedTime()}] 开始执行医生列表页面测试`);
  
  // 创建报告目录
  const timestamp = getTimestamp();
  const reportDir = path.join(__dirname, '../reports/assets', `001-doctor-list-page-result-${timestamp}`);
  const screenshotsDir = path.join(reportDir, 'screenshots');
  
  fs.ensureDirSync(screenshotsDir);
  console.log(`[${getFormattedTime()}] 报告目录已创建: ${reportDir}`);
  
  let browser;
  try {
    // 启动浏览器
    browser = await chromium.launch({ 
      headless: true,
      args: ['--disable-dev-shm-usage']
    });
    
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();
    
    // 读取医生数据
    const doctorDataPath = path.join(__dirname, '../../../../web/qa-web/src/data/doctor-user-list.json');
    if (!fs.existsSync(doctorDataPath)) {
      throw new Error(`医生数据文件不存在: ${doctorDataPath}`);
    }
    const doctorListData = JSON.parse(fs.readFileSync(doctorDataPath, 'utf-8'));
    console.log(`[${getFormattedTime()}] 加载了 ${doctorListData.length} 条医生数据`);
    
    // 访问首页
    console.log(`[${getFormattedTime()}] 访问首页...`);
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotsDir, '01-homepage.png'), fullPage: true });
    console.log(`[${getFormattedTime()}] 首页截图完成`);
    
    // 导航到医生列表页面
    console.log(`[${getFormattedTime()}] 导航到医生列表页面...`);
    
    // 尝试点击导航菜单中的"医生团队"链接
    try {
      const doctorLink = await page.locator('text="医生团队"').first();
      if (await doctorLink.isVisible()) {
        await doctorLink.click();
        console.log(`[${getFormattedTime()}] 点击了医生团队链接`);
      } else {
        await page.goto('http://localhost:5173/doctors', { waitUntil: 'networkidle' });
        console.log(`[${getFormattedTime()}] 直接访问了医生列表页面URL`);
      }
    } catch (error) {
      await page.goto('http://localhost:5173/doctors', { waitUntil: 'networkidle' });
      console.log(`[${getFormattedTime()}] 直接访问了医生列表页面URL`);
    }
    
    // 等待页面加载
    await page.waitForSelector('.doctors-grid', { timeout: 10000 });
    await page.screenshot({ path: path.join(screenshotsDir, '02-doctor-list.png'), fullPage: true });
    console.log(`[${getFormattedTime()}] 医生列表页面截图完成`);
    
    // 验证医生数据
    console.log(`[${getFormattedTime()}] 验证医生数据...`);
    const doctorCards = await page.locator('.doctor-card').all();
    const actualDoctorCount = doctorCards.length;
    
    console.log(`[${getFormattedTime()}] 页面显示的医生数量: ${actualDoctorCount}`);
    console.log(`[${getFormattedTime()}] 预期的医生数量: ${doctorListData.length}`);
    
    // 基本验证
    const verificationResult = {
      testName: '医生列表页面数据加载验证测试',
      startTime: getFormattedTime(),
      endTime: '',
      status: 'PASS', // 默认为通过，失败时更新
      doctorDataComparison: {
        expected: doctorListData.length,
        actual: actualDoctorCount,
        matches: actualDoctorCount === doctorListData.length,
        mismatches: []
      }
    };
    
    if (actualDoctorCount !== doctorListData.length) {
      const errorMsg = `医生数量不匹配，预期: ${doctorListData.length}，实际: ${actualDoctorCount}`;
      verificationResult.doctorDataComparison.mismatches.push(errorMsg);
      verificationResult.status = 'FAIL';
    }
    
    // 验证每个医生的基本信息
    for (let i = 0; i < Math.min(doctorCards.length, doctorListData.length); i++) {
      const card = doctorCards[i];
      const expectedDoctor = doctorListData[i];
      
      try {
        // 获取医生名称
        const doctorName = await card.locator('.card-body h3').textContent();
        if (doctorName !== expectedDoctor.name) {
          verificationResult.doctorDataComparison.mismatches.push(
            `医生 ${i} 名称不匹配，预期: ${expectedDoctor.name}，实际: ${doctorName}`
          );
          verificationResult.status = 'FAIL';
        }
        
        // 获取医生职称
        const doctorTitle = await card.locator('.doctor-title').textContent();
        if (doctorTitle !== expectedDoctor.title) {
          verificationResult.doctorDataComparison.mismatches.push(
            `医生 ${i} 职称不匹配，预期: ${expectedDoctor.title}，实际: ${doctorTitle}`
          );
          verificationResult.status = 'FAIL';
        }
        
        // 获取医生科室
        const doctorDepartment = await card.locator('.doctor-department').textContent();
        if (doctorDepartment !== expectedDoctor.department) {
          verificationResult.doctorDataComparison.mismatches.push(
            `医生 ${i} 科室不匹配，预期: ${expectedDoctor.department}，实际: ${doctorDepartment}`
          );
          verificationResult.status = 'FAIL';
        }
        
      } catch (error) {
        verificationResult.doctorDataComparison.mismatches.push(
          `医生 ${i} 验证过程中出错: ${error}`
        );
        verificationResult.status = 'FAIL';
      }
    }
    
    // 生成测试报告
    verificationResult.endTime = getFormattedTime();
    
    // 保存JSON报告
    const reportJsonPath = path.join(reportDir, 'report.json');
    fs.writeJSONSync(reportJsonPath, verificationResult, { spaces: 2 });
    console.log(`[${getFormattedTime()}] JSON报告已生成: ${reportJsonPath}`);
    
    // 生成Markdown报告
    const reportMdPath = path.join(reportDir, '../README.md');
    let reportMd = `
# 医生列表页面测试报告

## 测试概述
- **测试名称**: ${verificationResult.testName}
- **开始时间**: ${verificationResult.startTime}
- **结束时间**: ${verificationResult.endTime}
- **测试状态**: ${verificationResult.status}

## 测试结果

### 医生数据验证结果

| 项目 | 预期值 | 实际值 | 是否匹配 |
|------|--------|--------|----------|
| 医生数量 | ${verificationResult.doctorDataComparison.expected} | ${verificationResult.doctorDataComparison.actual} | ${verificationResult.doctorDataComparison.matches ? '是' : '否'} |

`;

    if (verificationResult.doctorDataComparison.mismatches.length > 0) {
      reportMd += `### 数据不匹配项\n\n`;
      for (const mismatch of verificationResult.doctorDataComparison.mismatches) {
        reportMd += `- ${mismatch}\n`;
      }
      reportMd += `\n`;
    }

    reportMd += `### 测试截图

![首页截图](./assets/${path.basename(reportDir)}/screenshots/01-homepage.png)

![医生列表页面截图](./assets/${path.basename(reportDir)}/screenshots/02-doctor-list.png)

`;

    fs.writeFileSync(reportMdPath, reportMd);
    console.log(`[${getFormattedTime()}] Markdown报告已生成: ${reportMdPath}`);
    
    // 保存测试日志
    const logPath = path.join(reportDir, 'test.log');
    fs.writeFileSync(logPath, `测试开始时间: ${verificationResult.startTime}\n测试结束时间: ${verificationResult.endTime}\n测试状态: ${verificationResult.status}`);
    console.log(`[${getFormattedTime()}] 测试日志已生成: ${logPath}`);
    
    console.log(`[${getFormattedTime()}] 测试执行完成，状态: ${verificationResult.status}`);
    
  } catch (error) {
    console.error(`[${getFormattedTime()}] 测试执行失败:`, error);
  } finally {
    if (browser) {
      await browser.close();
      console.log(`[${getFormattedTime()}] 浏览器已关闭`);
    }
  }
}

// 运行测试
runTest().catch(error => {
  console.error('测试运行失败:', error);
  process.exit(1);
});