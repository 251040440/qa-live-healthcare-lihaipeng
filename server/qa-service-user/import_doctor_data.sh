#!/bin/bash

# 定义文件路径和容器信息
SQL_FILE="/home/azureuser/source/tkt01/qa-live-healthcare-bolt-vue-c1joxy7j/server/qa-service-user/src/main/resources/db/data/doctor_user_data.sql"
CONTAINER_NAME="healthcare_mysql"
DB_NAME="healthcare"
DB_USER="root"
DB_PASSWORD="root"

# 检查SQL文件是否存在
if [ ! -f "$SQL_FILE" ]; then
    echo "错误: 文件 $SQL_FILE 不存在"
    exit 1
fi

# 导入数据到MySQL
echo "正在导入数据到 $DB_NAME 数据库..."
docker exec -i $CONTAINER_NAME mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME < "$SQL_FILE"

# 检查导入是否成功
if [ $? -eq 0 ]; then
    echo "数据导入成功！"
else
    echo "错误: 数据导入失败"
    exit 1
fi