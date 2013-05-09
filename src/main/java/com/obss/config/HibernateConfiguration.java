package com.obss.config;

import java.util.Properties;

import org.hibernate.cfg.Environment;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

public class HibernateConfiguration {
	
	public static ServiceRegistry hibernateConfig() {
		Properties properties = new Properties();
		properties.setProperty(Environment.DIALECT,"org.hibernate.dialect.MySQLDialect");
		properties.setProperty(Environment.URL, "jdbc:mysql://us-cdbr-east-03.cleardb.com/heroku_f89f3481d9cb626?reconnect=true");
		properties.setProperty(Environment.DRIVER, "com.mysql.jdbc.Driver");
		properties.setProperty(Environment.USER, "b4d1de09400aed");
		properties.setProperty(Environment.PASS, "a1135ae7");

		ServiceRegistryBuilder serviceRegistryBuilder = new ServiceRegistryBuilder();
		serviceRegistryBuilder.applySettings(properties);
		
		ServiceRegistry serviceRegistry = serviceRegistryBuilder.buildServiceRegistry();
		return serviceRegistry;
	}
}
