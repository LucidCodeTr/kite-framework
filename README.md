# Running the project locally

```
$ cd ${BASE_DIRECTORY}/spring-mvc-demo
$ mvn clean test jetty:stop jetty:run
```

Launch the project at http://localhost:8080/stock-analyzer/

# Deploying project on Heroku
	
* Heroku Create 

	* See: https://devcenter.heroku.com/articles/git#creating-a-heroku-remote

```
$ cd ${BASE_DIRECTORY}/spring-mvc-demo
$ git push heroku master
```

# Feature Highlights

* File Structure

	* Based on maven-webapp archetype, the project file structure is defined as below:
	
	* src/main/java for Java Sources
	* src/main/resources for static configuration files
	* src/test/* for tests
	* src/main/webapp for static web resources (css, html, img, js)

* Spring MVC

	* Annotation Based Configuration
	* Selective Component Scan
	* Inversion of Control
	* Mock HttpServletResponse & Response for Integration Testing
	* SpringJUnit4ClassRunner for utilizing annotations during testing

* Hibernate

	* ORM Mapping
	* Model Validation
	* Transaction Management
	* Data-access-level pagination
		
* Maven

	* Project Object Model (POM) Configuration
	* Platform independent resource & compilation encoding
	* Utilization of jetty-maven-plugin
	* Single line of command (clean test jetty:stop jetty:run) to clean, test, build and deploy

* Testing

	* JUnit and EasyMock for testing

* Front-End

	* Mustache.js for Document Object Model (DOM) Templating
	* jQuery for DOM Manipulation
	* Bootstrap for front-end styling and modal popUp actions
	* Namespacing pattern adopted for JavaScript
	
* Database Management

	* MySQL
	
* Version Control

	* Bitbucket - Heroku
	
	
* Other libraries used:

	* Log4j for logging
	* jCaptcha for captcha's
	* Jackson for json message translation
