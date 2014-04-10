package tr.com.lucidcode.controller;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import tr.com.lucidcode.service.AccountService;


@Controller
public class HomeController {

	protected static Logger logger = Logger.getLogger("sessionListener");

	@Resource(name = "accountService")
	private AccountService accountService;

	@RequestMapping(value = "/")
	public ModelAndView listAll(@RequestParam("f") String functionalArea, @RequestParam("n") String name) {

		logger.debug("Application: " + functionalArea +  "requested");

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("index");
		
		//add parameters
		modelAndView.addObject("functionalArea", functionalArea);
		modelAndView.addObject("name", name);

		return modelAndView;
	}

}
