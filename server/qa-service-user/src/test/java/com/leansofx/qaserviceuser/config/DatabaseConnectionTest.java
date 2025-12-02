package com.leansofx.qaserviceuser.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class DatabaseConnectionTest {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void testDataSourceConnection() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            assertNotNull(connection, "数据库连接不应该为null");
            assertTrue(connection.isValid(5), "数据库连接应该有效");
            System.out.println("数据库连接成功！");
        }
    }

    @Test
    public void testJdbcTemplateConnection() {
        Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        assertEquals(1, result, "数据库查询结果应该为1");
        System.out.println("JdbcTemplate 连接测试成功！");
    }
}