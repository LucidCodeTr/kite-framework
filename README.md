# Running the project locally

```
<<<<<<< HEAD
$ cd ${BASE_DIRECTORY}/spring-mvc-demo
$ clean package jetty:stop jetty:run-war
```

Launch the project at http://localhost:8080/{project-name}?f={functionalArea}&n={name}

# Deploying project on Heroku
	
	*Heroku Create (See: https://devcenter.heroku.com/articles/git#creating-a-heroku-remote)


# Feature Highlights

* File Structure

	* Derived from maven-webapp archetype, the project file structure is defined by kite-archetype as below:
	
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
	* Mustache Server Side Templating

* Hibernate

	* ORM Mapping
	* Model Validation
	* Transaction Management
	* Data-access-level pagination
		
* Maven

	* New application template is provided with Kite Archetype
	* Project Object Model (POM) Configuration
	* Parent Project (kite-base) controls over child app modules, which depend on seperate kite-framework package whose version is determined by kite-base
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
	* Implementation of Nicholas Zakas' Scalable JavaScript Application
	  Architecture
	* Client Side JavaScript Front-End Coding opposed to Server Side Java Front-End Coding
	*Rresponsive Design by responsive.js
	* Sophisticated JavaScript Library Dependency Management by require.js
	
* Database Management

	* MySQL
	
* Version Control

	* Bitbucket - Heroku	
	
* Other libraries used:

	* Log4j for logging
	* jCaptcha for captcha's
	* Jackson for json message translation

* Features planned for future

	* Tuckey URL Rewriting
	* jsDuck for automated documentation
