根据用户给出的测试目标和测试步骤，编写测试用例脚本。如果用户没有给出任何输入，请立即停止执行并向用户询问测试目标和测试步骤。 一旦用户给出了测试目标和测试步骤，参考以下目录中的测试用例包结构编写新的测试用例包以执行用户给定的测试。

参考测试用例包： 目录：test/e2e/001-doctor-list-page 配置文件：test/e2e/001-doctor-list-page/package.json 入口说明：test/e2e/001-doctor-list-page/README.md 测试脚本目录：test/e2e/001-doctor-list-page/scripts 测试报告目录：test/e2e/001-doctor-list-page/reports

首先读取以上示例测试用例包的内容，了解测试用例包的结构和使用方法。 然后根据用户给出的测试目标和测试步骤，编写测试用例脚本。

特别注意：

    确保使用正确的 timestamp 格式和时区设置，以便在报告中正确显示测试时间。
    确保生成的 README.md 文件内容与示例入口说明一致
    仅使用 playwright 作为测试框架，不要引入其他测试框架，如 cypress、jest、puppeteer 等。

测试编写完毕后，立即执行并验证测试可以正常执行。
