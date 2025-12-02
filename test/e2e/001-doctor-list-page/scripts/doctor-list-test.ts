import { chromium, Browser, BrowserContext, Page } from 'playwright';
import * as fs from 'fs-extra';
import * as path from 'path';

interface Doctor {
  id: string;
  username: string;
  password: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  experience: string;
  specialties: string[];
  isActive: boolean;
}

interface TestResult {
  testName: string;
  startTime: string;
  endTime: string;
  status: 'PASS' | 'FAIL';
  steps: {
    stepName: string;
    status: 'PASS' | 'FAIL';
    details: string;
    screenshotPath?: string;
    timestamp: string;
  }[];
  doctorDataComparison: {
    expected: number;
    actual: number;
    matches: boolean;
    mismatches: string[];
  };
  screenshots: string[];
  logs: string[];
}

class DoctorListTest {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private testResult: TestResult;
  private reportDir: string;
  private screenshotsDir: string;
  private doctorListData: Doctor[] = [];

  constructor() {
    // 创建报告目录结构
    const timestamp = this.getTimestamp();
    this.reportDir = path.join(__dirname, '../reports/assets', `001-doctor-list-page-result-${timestamp}`);
    this.screenshotsDir = path.join(this.reportDir, 'screenshots');
    
    fs.ensureDirSync(this.screenshotsDir);
    
    // 初始化测试结果对象
    this.testResult = {
      testName: '医生列表页面数据加载验证测试',
      startTime: this.getFormattedTime(),
      endTime: '',
      status: 'FAIL', // 默认为失败，成功完成时更新
      steps: [],
      doctorDataComparison: {
        expected: 0,
        actual: 0,
        matches: false,
        mismatches: []
      },
      screenshots: [],
      logs: []
    };

    this.log(`测试初始化完成，报告目录: ${this.reportDir}`);
  }

  /**
   * 获取当前时间戳
   */
  private getTimestamp(): string {
    const now = new Date();
    const dateStr = now.getFullYear() + 
                   String(now.getMonth() + 1).padStart(2, '0') + 
                   String(now.getDate()).padStart(2, '0');
    const timeStr = String(now.getHours()).padStart(2, '0') + 
                   String(now.getMinutes()).padStart(2, '0') + 
                   String(now.getSeconds()).padStart(2, '0');
    return `${dateStr}-${timeStr}`;
  }

  /**
   * 获取格式化的时间
   */
  private getFormattedTime(): string {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19) + ' GMT+8';
  }

  /**
   * 记录日志
   */
  private log(message: string): void {
    const logMessage = `[${this.getFormattedTime()}] ${message}`;
    this.testResult.logs.push(logMessage);
    console.log(logMessage);
  }

  /**
   * 记录测试步骤
   */
  private recordStep(stepName: string, status: 'PASS' | 'FAIL', details: string, screenshotPath?: string): void {
    this.testResult.steps.push({
      stepName,
      status,
      details,
      screenshotPath,
      timestamp: this.getFormattedTime()
    });
  }

  /**
   * 截图并保存
   */
  private async takeScreenshot(name: string): Promise<string> {
    if (!this.page) throw new Error('Page对象未初始化');
    
    const screenshotPath = path.join(this.screenshotsDir, `${name}.png`);
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    this.testResult.screenshots.push(screenshotPath);
    return screenshotPath;
  }

  /**
   * 初始化测试环境
   */
  private async initialize(): Promise<void> {
    this.log('初始化测试环境...');
    
    // 启动浏览器
    this.browser = await chromium.launch({ 
      headless: true,
      args: ['--disable-dev-shm-usage']
    });
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    this.page = await this.context.newPage();
    
    // 读取医生数据
    const doctorDataPath = path.join(__dirname, '../../../web/qa-web/src/data/doctor-user-list.json');
    if (fs.existsSync(doctorDataPath)) {
      this.doctorListData = JSON.parse(fs.readFileSync(doctorDataPath, 'utf-8'));
      this.log(`加载了 ${this.doctorListData.length} 条医生数据`);
    } else {
      throw new Error(`医生数据文件不存在: ${doctorDataPath}`);
    }
  }

  /**
   * 启动应用
   */
  private async startApplication(): Promise<void> {
    this.log('启动应用...');
    
    // 注意：这里假设应用已经启动，实际测试环境可以使用 webapp-testing skill 中的 with_server.py 脚本
    // 这里我们直接访问已启动的应用
  }

  /**
   * 访问首页并截图
   */
  private async visitHomePage(): Promise<void> {
    this.log('访问首页...');
    
    if (!this.page) throw new Error('Page对象未初始化');
    
    try {
      // 访问首页
      await this.page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
      this.log('首页加载完成');
      
      // 截图
      const screenshotPath = await this.takeScreenshot('01-homepage');
      this.recordStep('访问首页', 'PASS', '成功访问首页并截图', screenshotPath);
    } catch (error) {
      const errorMsg = `访问首页失败: ${error}`;
      this.log(errorMsg);
      this.recordStep('访问首页', 'FAIL', errorMsg);
      throw error;
    }
  }

  /**
   * 导航到医生列表页面并截图
   */
  private async navigateToDoctorList(): Promise<void> {
    this.log('导航到医生列表页面...');
    
    if (!this.page) throw new Error('Page对象未初始化');
    
    try {
      // 点击导航菜单中的"医生团队"链接
      const doctorLink = await this.page.locator('text="医生团队"').first();
      if (await doctorLink.isVisible()) {
        await doctorLink.click();
        this.log('点击了医生团队链接');
      } else {
        // 如果找不到导航链接，直接访问URL
        await this.page.goto('http://localhost:5173/doctors', { waitUntil: 'networkidle' });
        this.log('直接访问了医生列表页面URL');
      }
      
      // 等待页面加载
      await this.page.waitForSelector('.doctors-grid', { timeout: 10000 });
      this.log('医生列表页面加载完成');
      
      // 截图
      const screenshotPath = await this.takeScreenshot('02-doctor-list');
      this.recordStep('导航到医生列表页面', 'PASS', '成功导航到医生列表页面并截图', screenshotPath);
    } catch (error) {
      const errorMsg = `导航到医生列表页面失败: ${error}`;
      this.log(errorMsg);
      this.recordStep('导航到医生列表页面', 'FAIL', errorMsg);
      throw error;
    }
  }

  /**
   * 验证医生数据
   */
  private async verifyDoctorData(): Promise<void> {
    this.log('验证医生数据...');
    
    if (!this.page) throw new Error('Page对象未初始化');
    
    try {
      // 获取页面上显示的医生卡片数量
      const doctorCards = await this.page.locator('.doctor-card').all();
      const actualDoctorCount = doctorCards.length;
      
      this.log(`页面显示的医生数量: ${actualDoctorCount}`);
      this.log(`预期的医生数量: ${this.doctorListData.length}`);
      
      // 验证医生数量
      if (actualDoctorCount !== this.doctorListData.length) {
        const errorMsg = `医生数量不匹配，预期: ${this.doctorListData.length}，实际: ${actualDoctorCount}`;
        this.log(errorMsg);
        this.testResult.doctorDataComparison.expected = this.doctorListData.length;
        this.testResult.doctorDataComparison.actual = actualDoctorCount;
        this.testResult.doctorDataComparison.matches = false;
        this.testResult.doctorDataComparison.mismatches.push(errorMsg);
        
        this.recordStep('验证医生数据', 'FAIL', errorMsg);
        return;
      }
      
      // 验证每个医生的数据
      const mismatches: string[] = [];
      let allMatched = true;
      
      for (let i = 0; i < doctorCards.length; i++) {
        const card = doctorCards[i];
        const expectedDoctor = this.doctorListData[i];
        
        try {
          // 获取医生名称
          const doctorName = await card.locator('.card-body h3').textContent();
          if (doctorName !== expectedDoctor.name) {
            mismatches.push(`医生 ${i} 名称不匹配，预期: ${expectedDoctor.name}，实际: ${doctorName}`);
            allMatched = false;
          }
          
          // 获取医生职称
          const doctorTitle = await card.locator('.doctor-title').textContent();
          if (doctorTitle !== expectedDoctor.title) {
            mismatches.push(`医生 ${i} 职称不匹配，预期: ${expectedDoctor.title}，实际: ${doctorTitle}`);
            allMatched = false;
          }
          
          // 获取医生科室
          const doctorDepartment = await card.locator('.doctor-department').textContent();
          if (doctorDepartment !== expectedDoctor.department) {
            mismatches.push(`医生 ${i} 科室不匹配，预期: ${expectedDoctor.department}，实际: ${doctorDepartment}`);
            allMatched = false;
          }
          
          // 获取医生经验
          const doctorExperience = await card.locator('.doctor-experience').textContent();
          if (doctorExperience !== expectedDoctor.experience) {
            mismatches.push(`医生 ${i} 经验不匹配，预期: ${expectedDoctor.experience}，实际: ${doctorExperience}`);
            allMatched = false;
          }
          
          // 获取医生专长标签
          const specialtyTags = await card.locator('.doctor-specialties .ant-tag').all();
          const actualSpecialties: string[] = [];
          
          for (const tag of specialtyTags) {
            const specialty = await tag.textContent();
            if (specialty) {
              actualSpecialties.push(specialty);
            }
          }
          
          // 验证专长数量和内容
          if (actualSpecialties.length !== expectedDoctor.specialties.length) {
            mismatches.push(`医生 ${i} 专长数量不匹配，预期: ${expectedDoctor.specialties.length}，实际: ${actualSpecialties.length}`);
            allMatched = false;
          } else {
            for (let j = 0; j < actualSpecialties.length; j++) {
              if (actualSpecialties[j] !== expectedDoctor.specialties[j]) {
                mismatches.push(`医生 ${i} 专长 ${j} 不匹配，预期: ${expectedDoctor.specialties[j]}，实际: ${actualSpecialties[j]}`);
                allMatched = false;
              }
            }
          }
          
          // 验证在线状态
          const statusBadge = await card.locator('.ant-badge-status-text').textContent();
          const expectedStatus = expectedDoctor.isActive ? '在线' : '离线';
          if (statusBadge !== expectedStatus) {
            mismatches.push(`医生 ${i} 在线状态不匹配，预期: ${expectedStatus}，实际: ${statusBadge}`);
            allMatched = false;
          }
          
        } catch (error) {
          mismatches.push(`医生 ${i} 验证过程中出错: ${error}`);
          allMatched = false;
        }
      }
      
      // 记录验证结果
      this.testResult.doctorDataComparison.expected = this.doctorListData.length;
      this.testResult.doctorDataComparison.actual = actualDoctorCount;
      this.testResult.doctorDataComparison.matches = allMatched;
      this.testResult.doctorDataComparison.mismatches = mismatches;
      
      if (allMatched) {
        this.recordStep('验证医生数据', 'PASS', '所有医生数据验证通过');
      } else {
        this.recordStep('验证医生数据', 'FAIL', `医生数据验证失败，发现 ${mismatches.length} 个不匹配项`);
      }
      
    } catch (error) {
      const errorMsg = `验证医生数据失败: ${error}`;
      this.log(errorMsg);
      this.recordStep('验证医生数据', 'FAIL', errorMsg);
      throw error;
    }
  }

  /**
   * 清理测试环境
   */
  private async cleanup(): Promise<void> {
    this.log('清理测试环境...');
    
    if (this.context) {
      await this.context.close();
    }
    
    if (this.browser) {
      await this.browser.close();
    }
    
    this.log('测试环境清理完成');
  }

  /**
   * 生成测试报告
   */
  private async generateReport(): Promise<void> {
    this.log('生成测试报告...');
    
    // 更新测试结果
    this.testResult.endTime = this.getFormattedTime();
    
    // 确定测试状态
    const allStepsPassed = this.testResult.steps.every(step => step.status === 'PASS');
    this.testResult.status = allStepsPassed ? 'PASS' : 'FAIL';
    
    // 保存JSON报告
    const reportJsonPath = path.join(this.reportDir, 'report.json');
    await fs.writeJSON(reportJsonPath, this.testResult, { spaces: 2 });
    
    // 保存日志
    const logPath = path.join(this.reportDir, 'test.log');
    await fs.writeFile(logPath, this.testResult.logs.join('\n'));
    
    // 生成Markdown报告
    const reportMdPath = path.join(this.reportDir, '../README.md');
    let reportMd = `
# 医生列表页面测试报告

## 测试概述
- **测试名称**: ${this.testResult.testName}
- **开始时间**: ${this.testResult.startTime}
- **结束时间**: ${this.testResult.endTime}
- **测试状态**: ${this.testResult.status}

## 测试结果

### 测试步骤

| 步骤 | 状态 | 详情 |
|------|------|------|
`;

    for (const step of this.testResult.steps) {
      reportMd += `| ${step.stepName} | ${step.status} | ${step.details} |\n`;
    }

    reportMd += `
### 医生数据验证结果

| 项目 | 预期值 | 实际值 | 是否匹配 |
|------|--------|--------|----------|
| 医生数量 | ${this.testResult.doctorDataComparison.expected} | ${this.testResult.doctorDataComparison.actual} | ${this.testResult.doctorDataComparison.matches ? '是' : '否'} |

`;

    if (this.testResult.doctorDataComparison.mismatches.length > 0) {
      reportMd += `### 数据不匹配项\n\n`;
      for (const mismatch of this.testResult.doctorDataComparison.mismatches) {
        reportMd += `- ${mismatch}\n`;
      }
      reportMd += `\n`;
    }

    reportMd += `### 测试截图

`;

    for (const screenshot of this.testResult.screenshots) {
      const screenshotName = path.basename(screenshot);
      reportMd += `![${screenshotName}](./assets/${path.basename(this.reportDir)}/screenshots/${screenshotName})\n\n`;
    }

    reportMd += `
## 测试日志

\`\`\`
${this.testResult.logs.join('\n')}
\`\`\`

`;

    await fs.writeFile(reportMdPath, reportMd);
    
    this.log(`测试报告已生成: ${reportJsonPath}`);
    this.log(`Markdown报告已生成: ${reportMdPath}`);
  }

  /**
   * 运行测试
   */
  public async run(): Promise<void> {
    try {
      // 初始化
      await this.initialize();
      
      // 启动应用
      await this.startApplication();
      
      // 访问首页
      await this.visitHomePage();
      
      // 导航到医生列表页面
      await this.navigateToDoctorList();
      
      // 验证医生数据
      await this.verifyDoctorData();
      
      this.log('测试执行完成');
    } catch (error) {
      this.log(`测试执行失败: ${error}`);
      throw error;
    } finally {
      // 清理环境
      await this.cleanup();
      
      // 生成报告
      await this.generateReport();
      
      this.log(`测试完成，状态: ${this.testResult.status}`);
    }
  }
}

// 运行测试
async function main() {
  const test = new DoctorListTest();
  await test.run();
}

main().catch(error => {
  console.error('测试运行失败:', error);
  process.exit(1);
});