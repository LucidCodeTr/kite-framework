package tr.com.lucidcode.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import tr.com.lucidcode.service.AccountService;
import tr.com.lucidcode.service.GedikStockService;


@Configuration
@ComponentScan("tr.com.lucidcode.service")
public class ServiceConfiguration {
	
	@Bean
    public AccountService accountService() {
        return new AccountService();
    }
	
	@Bean
    public GedikStockService gedikStockService() {
        return new GedikStockService();
    }
}
