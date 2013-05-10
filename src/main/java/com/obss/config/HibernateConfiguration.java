package com.obss.config;

import java.util.Properties;

import org.hibernate.cfg.Environment;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

public class HibernateConfiguration {
	
	public static ServiceRegistry hibernateConfig() {
		Properties herokuProperties = new Properties();
		herokuProperties.setProperty(Environment.DIALECT,"org.hibernate.dialect.MySQLDialect");
		herokuProperties.setProperty(Environment.URL, "jdbc:mysql://us-cdbr-east-03.cleardb.com/heroku_f89f3481d9cb626?reconnect=true");
		herokuProperties.setProperty(Environment.DRIVER, "com.mysql.jdbc.Driver");
		herokuProperties.setProperty(Environment.USER, "b4d1de09400aed");
		herokuProperties.setProperty(Environment.PASS, "a1135ae7");
		
		Properties localProperties = new Properties();
		localProperties.setProperty(Environment.DIALECT,"org.hibernate.dialect.MySQLDialect");
		localProperties.setProperty(Environment.URL, "jdbc:mysql://localhost:3306/demoschema");
		localProperties.setProperty(Environment.DRIVER, "com.mysql.jdbc.Driver");
		localProperties.setProperty(Environment.USER, "root");
		localProperties.setProperty(Environment.PASS, "");

		ServiceRegistryBuilder serviceRegistryBuilder = new ServiceRegistryBuilder();
		
		//heroku
		//serviceRegistryBuilder.applySettings(herokuProperties);
		
		//local
		serviceRegistryBuilder.applySettings(localProperties);
		
		ServiceRegistry serviceRegistry = serviceRegistryBuilder.buildServiceRegistry();
		return serviceRegistry;
	}
}
