package tr.com.lucidcode.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import tr.com.lucidcode.obss.service.AccountService;


@Controller
public class HomeController {

	protected static Logger logger = Logger.getLogger("sessionListener");

	@Resource(name = "accountService")
	private AccountService accountService;

	@RequestMapping(value = "/")
	public ModelAndView listAll() {
		
		logger.debug("Homepage requested");

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("index");

		return modelAndView;
	}
}
