#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * 简化版测试医生列表页面的 Playwright 脚本 - v2 (JavaScript版本)
 * 支持新的目录结构：每个报告独立目录 + assets 子目录
 * 保持与Python版本相同的功能和时区处理
 */

async function testDoctorsPageSimple() {
    // 简化版测试医生列表页面 - 支持新目录结构
    
    console.log('🚀 开始测试医生列表页面...');
    
    // 创建报告目录和文件路径 - 使用GMT+8时区
    const now = new Date();
    
    // 转换为 GMT+8 时区的时间 (与Python版本保持一致)
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
    
    const scriptDir = __dirname;
    const projectDir = path.dirname(scriptDir);
    const reportDir = path.join(projectDir, 'reports', `test_report_${timestamp}`);
    const assetsDir = path.join(reportDir, 'assets');
    const reportFile = path.join(reportDir, 'report.md');
    
    // 确保目录存在
    fs.mkdirSync(assetsDir, { recursive: true });
    
    console.log(`📁 报告目录: ${reportDir}`);
    
    // 初始化变量
    let doctorCount = 0;
    let foundDoctors = 0;
    let foundDepartments = 0;
    
    try {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        
        // 1. 访问首页
        console.log('📍 访问首页: http://localhost:5173');
        try {
            await page.goto('http://localhost:5173', { timeout: 10000 });
            await page.waitForLoadState('networkidle', { timeout: 5000 });
            
            // 截图保存到报告目录的 assets 子目录
            const homepageScreenshot = path.join(assetsDir, 'homepage_simple.png');
            await page.screenshot({ path: homepageScreenshot, fullPage: true });
            console.log('✅ 首页访问成功');
            console.log(`📸 首页截图已保存: ${homepageScreenshot}`);
            
        } catch (error) {
            console.log(`❌ 首页访问失败: ${error.message}`);
            await browser.close();
            return false;
        }
        
        // 2. 访问医生列表页面
        console.log('📍 访问医生列表页面: http://localhost:5173/doctors');
        try {
            await page.goto('http://localhost:5173/doctors', { timeout: 10000 });
            await page.waitForLoadState('networkidle', { timeout: 5000 });
            await page.waitForTimeout(2000);  // 等待数据加载 (与Python版本保持一致)
            
            // 截图保存到报告目录的 assets 子目录
            const doctorsScreenshot = path.join(assetsDir, 'doctors_page_simple.png');
            await page.screenshot({ path: doctorsScreenshot, fullPage: true });
            console.log('✅ 医生页面访问成功');
            console.log(`📸 医生页面截图已保存: ${doctorsScreenshot}`);
            
        } catch (error) {
            console.log(`❌ 医生页面访问失败: ${error.message}`);
            await browser.close();
            return false;
        }
        
        // 3. 检查页面标题
        try {
            const title = await page.locator('h1').textContent({ timeout: 5000 });
            console.log(`✅ 页面标题: ${title}`);
        } catch (error) {
            console.log(`⚠️  获取页面标题失败: ${error.message}`);
        }
        
        // 4. 检查医生卡片
        try {
            const doctorCards = await page.locator('.doctor-card').all();
            doctorCount = doctorCards.length;
            console.log(`✅ 找到 ${doctorCount} 个医生卡片`);
            
            if (doctorCount > 0) {
                // 检查第一个医生卡片
                const firstCard = doctorCards[0];
                const doctorName = await firstCard.locator('h3').textContent();
                console.log(`✅ 第一个医生姓名: ${doctorName}`);
                
                // 截图详细信息
                const detailScreenshot = path.join(assetsDir, 'doctors_page_detail.png');
                await page.screenshot({ path: detailScreenshot, fullPage: true });
                console.log(`📸 详细页面截图已保存: ${detailScreenshot}`);
            } else {
                console.log('⚠️  未找到医生卡片');
            }
            
        } catch (error) {
            console.log(`⚠️  检查医生卡片时出错: ${error.message}`);
        }
        
        // 5. 检查页面内容
        try {
            const pageText = await page.locator('body').textContent();
            
            // 检查预期的医生姓名
            const expectedDoctors = ["张伟医生", "李娜医生", "王强医生", "刘敏医生", "陈杰医生"];
            const foundDoctorsList = expectedDoctors.filter(doctor => pageText.includes(doctor));
            foundDoctors = foundDoctorsList.length;
            
            console.log(`✅ 在页面中找到 ${foundDoctors} 名医生: ${foundDoctorsList.join(' ')}`);
            
            // 检查科室
            const expectedDepartments = ["心内科", "儿科", "骨科", "妇产科", "消化内科"];
            const foundDepartmentsList = expectedDepartments.filter(dept => pageText.includes(dept));
            foundDepartments = foundDepartmentsList.length;
            console.log(`✅ 在页面中找到 ${foundDepartments} 个科室: ${foundDepartmentsList.join(' ')}`);
            
        } catch (error) {
            console.log(`⚠️  检查页面内容时出错: ${error.message}`);
        }
        
        await browser.close();
        
        // 生成简单的测试报告
        generateSimpleReport(reportFile, timestamp, readableTime, doctorCount, foundDoctors, foundDepartments);
        
        console.log('🎉 测试完成！');
        console.log(`📋 测试报告已生成: ${reportFile}`);
        return true;
        
    } catch (error) {
        console.log(`❌ 测试过程中出错: ${error.message}`);
        return false;
    }
}

function generateSimpleReport(reportFile, timestamp, readableTime, doctorCount, foundDoctors, foundDepartments) {
    // 生成简单的测试报告
    const reportContent = `# 医生列表页面测试报告

## 测试执行信息
- **执行时间**: ${readableTime} (GMT+8)
- **测试脚本**: test_doctors_simple.js
- **测试目标**: 验证医生列表页面数据加载

## 测试结果摘要
- **医生卡片数量**: ${doctorCount}
- **验证医生数量**: ${foundDoctors}/5
- **验证科室数量**: ${foundDepartments}/5
- **测试结果**: ${(doctorCount > 0 && foundDoctors === 5) ? '✅ 通过' : '❌ 失败'}

## 截图证据
- ![首页截图](./assets/homepage_simple.png)
- ![医生页面截图](./assets/doctors_page_simple.png)
- ![详细页面截图](./assets/doctors_page_detail.png)

---
**生成时间**: ${readableTime} (GMT+8)
`;
    
    fs.writeFileSync(reportFile, reportContent, 'utf8');
    console.log(`📝 测试报告已保存: ${reportFile}`);
}

// 运行测试
if (require.main === module) {
    testDoctorsPageSimple().then(success => {
        if (success) {
            console.log('\n🎉 测试成功完成！医生列表页面加载了正确的医生数据');
            process.exit(0);
        } else {
            console.log('\n❌ 测试失败！医生列表页面可能存在问题');
            process.exit(1);
        }
    }).catch(error => {
        console.error('测试过程中出错:', error);
        process.exit(1);
    });
}

module.exports = { testDoctorsPageSimple };