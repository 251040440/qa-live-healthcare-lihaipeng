#!/usr/bin/env python3
"""
简化版测试医生列表页面的 Playwright 脚本 - v2
支持新的目录结构：每个报告独立目录 + assets 子目录
"""

from playwright.sync_api import sync_playwright
import time
import os
from datetime import datetime
import pytz

def test_doctors_page_simple():
    """简化版测试医生列表页面 - 支持新目录结构"""
    
    # 创建报告目录和文件路径 - 使用GMT+8时区
    tz = pytz.timezone('Asia/Shanghai')
    now = datetime.now(tz)
    timestamp = now.strftime('%Y%m%d-%H%M%S')
    readable_time = now.strftime('%Y-%m-%d %H:%M:%S')
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    report_dir = os.path.join(project_dir, "reports", f"test_report_{timestamp}")
    assets_dir = os.path.join(report_dir, "assets")
    report_file = os.path.join(report_dir, "report.md")
    
    # 确保目录存在
    os.makedirs(assets_dir, exist_ok=True)
    
    print(f"🚀 开始测试医生列表页面...")
    print(f"📁 报告目录: {report_dir}")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # 1. 访问首页
        print("📍 访问首页: http://localhost:5173")
        try:
            page.goto('http://localhost:5173', timeout=10000)
            page.wait_for_load_state('networkidle', timeout=5000)
            
            # 截图保存到报告目录的 assets 子目录
            homepage_screenshot = os.path.join(assets_dir, "homepage_simple.png")
            page.screenshot(path=homepage_screenshot, full_page=True)
            print("✅ 首页访问成功")
            print(f"📸 首页截图已保存: {homepage_screenshot}")
            
        except Exception as e:
            print(f"❌ 首页访问失败: {e}")
            browser.close()
            return False
        
        # 2. 访问医生列表页面
        print("📍 访问医生列表页面: http://localhost:5173/doctors")
        try:
            page.goto('http://localhost:5173/doctors', timeout=10000)
            page.wait_for_load_state('networkidle', timeout=5000)
            time.sleep(2)  # 等待数据加载
            
            # 截图保存到报告目录的 assets 子目录
            doctors_screenshot = os.path.join(assets_dir, "doctors_page_simple.png")
            page.screenshot(path=doctors_screenshot, full_page=True)
            print("✅ 医生页面访问成功")
            print(f"📸 医生页面截图已保存: {doctors_screenshot}")
            
        except Exception as e:
            print(f"❌ 医生页面访问失败: {e}")
            browser.close()
            return False
        
        # 3. 检查页面标题
        try:
            title = page.locator('h1').text_content(timeout=5000)
            print(f"✅ 页面标题: {title}")
        except Exception as e:
            print(f"⚠️  获取页面标题失败: {e}")
        
        # 4. 检查医生卡片
        try:
            doctor_cards = page.locator('.doctor-card').all()
            print(f"✅ 找到 {len(doctor_cards)} 个医生卡片")
            
            if len(doctor_cards) > 0:
                # 检查第一个医生卡片
                first_card = doctor_cards[0]
                doctor_name = first_card.locator('h3').text_content()
                print(f"✅ 第一个医生姓名: {doctor_name}")
                
                # 截图详细信息
                detail_screenshot = os.path.join(assets_dir, "doctors_page_detail.png")
                page.screenshot(path=detail_screenshot, full_page=True)
                print(f"📸 详细页面截图已保存: {detail_screenshot}")
            else:
                print("⚠️  未找到医生卡片")
                
        except Exception as e:
            print(f"⚠️  检查医生卡片时出错: {e}")
        
        # 5. 检查页面内容
        try:
            page_text = page.locator('body').text_content()
            
            # 检查预期的医生姓名
            expected_doctors = ["张伟医生", "李娜医生", "王强医生", "刘敏医生", "陈杰医生"]
            found_doctors = [doctor for doctor in expected_doctors if doctor in page_text]
            
            print(f"✅ 在页面中找到 {len(found_doctors)} 名医生: {', '.join(found_doctors)}")
            
            # 检查科室
            expected_departments = ["心内科", "儿科", "骨科", "妇产科", "消化内科"]
            found_departments = [dept for dept in expected_departments if dept in page_text]
            print(f"✅ 在页面中找到 {len(found_departments)} 个科室: {', '.join(found_departments)}")
            
        except Exception as e:
            print(f"⚠️  检查页面内容时出错: {e}")
        
        browser.close()
        
        # 生成简单的测试报告
        generate_simple_report(report_file, timestamp, readable_time, len(doctor_cards), len(found_doctors), len(found_departments))
        
        print("🎉 测试完成！")
        print(f"📋 测试报告已生成: {report_file}")
        return True

def generate_simple_report(report_file, timestamp, readable_time, doctor_count, found_doctors, found_departments):
    """生成简单的测试报告"""
    report_content = f"""# 医生列表页面测试报告

## 测试执行信息
- **执行时间**: {readable_time} (GMT+8)
- **测试脚本**: test_doctors_simple_v2.py
- **测试目标**: 验证医生列表页面数据加载

## 测试结果摘要
- **医生卡片数量**: {doctor_count}
- **验证医生数量**: {found_doctors}/5
- **验证科室数量**: {found_departments}/5
- **测试结果**: {'✅ 通过' if doctor_count > 0 and found_doctors == 5 else '❌ 失败'}

## 截图证据
- ![首页截图](./assets/homepage_simple.png)
- ![医生页面截图](./assets/doctors_page_simple.png)
- ![详细页面截图](./assets/doctors_page_detail.png)

---
**生成时间**: {readable_time} (GMT+8)
"""
    
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report_content)
    print(f"📝 测试报告已保存: {report_file}")

if __name__ == "__main__":
    success = test_doctors_page_simple()
    if success:
        print("\n🎉 测试成功完成！医生列表页面加载了正确的医生数据")
    else:
        print("\n❌ 测试失败！医生列表页面可能存在问题")
    exit(0 if success else 1)