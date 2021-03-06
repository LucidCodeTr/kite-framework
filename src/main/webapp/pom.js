/**
 * Project Object Model (POM) object defines Content Delivery Networks (CDN's)
 * and local paths of required JavaScipt (JS) libraries and Cascading Style
 * Sheet (CSS) documents. It also manages versions of required JS libraries and
 * CSS files.
 * 
 * @see {@link http://requirejs.org/docs/api.html#config} for further
 *      information
 */
var pom = {
		
	repos : {
		'google' : '//ajax.googleapis.com/ajax/libs',
		'bootstrapcdn' : '//netdna.bootstrapcdn.com',
		'cloudfare' : '//cdnjs.cloudflare.com/ajax/libs',
		'jsdelivr' : '//cdn.jsdelivr.net'
	},
	versions : {
		'jquery' : '1.7.2',
		'jqueryui' : '1.10.2',
		'jquerycolor' : '2.1.2',
		'bootstrap' : '2.3.1',
		'datetimepicker' : '0.0.11',
		'flot' : '0.8',
		'sparkline' : '2.1',
		'fullcalendar' : '1.6.0',
		'sizzle' : '1.9.1',
		'prettyphoto' : '3.1.4'		
	},
	cssDependencies :  {
		
		// css delivered via cdn
		'bootstrap' : '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/css/bootstrap.min.css',
		'bootstrap-datetimepicker' : '//cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/0.0.11/css/bootstrap-datetimepicker.min.css',
		'bootstrap-responsive' : '//cdn.jsdelivr.net/bootstrap/2.3.2/css/bootstrap-responsive.css',
		'fontawesome' : '//cdnjs.cloudflare.com/ajax/libs/font-awesome/3.1.0/css/font-awesome.min.css',
		'jqueryui' : '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/css/smoothness/jquery-ui-1.10.2.custom.css',
		'fullcalendar' : '//cdnjs.cloudflare.com/ajax/libs/fullcalendar/1.6.1/fullcalendar.css',
		'prettyphoto' : '//cdn.jsdelivr.net/prettyphoto/3.1.5/css/prettyPhoto.css',
		
		// stored css
		'rateit' : 'css/rateit.css',
		'gritter' : 'css/jquery.gritter.css',
		'cleditor' : 'css/jquery.cleditor.css',
		'style' : 'css/style.css',
		'grid' : 'css/grid.css',
		'widgets' : 'css/widgets.css',
		'bootstrap-switch' : 'css/bootstrap-switch.css',
		'kendo-common' : 'css/kendo.common.min.css',
		'kendo-metro' : 'css/kendo.metro.min.css'
	}
}

/**
 * Project Object Model (POM) object defines Content Delivery Networks (CDN's)
 * and local paths of required JavaScr�pt (JS) libraries and Cascading Style
 * Sheet (CSS) documents. It also manages versions of required JS libraries and
 * CSS files.
 */
requirejs.config({
	
    /**
	 * @cfg {String} shim (optional) Configure the dependencies, exports, and
	 *      custom initialization for older, traditional "browser globals"
	 *      scripts that do not use define() to declare the dependencies and set
	 *      a module value.
	 */
	shim: {
		'sparkline' : ['jquery'],
		'sizzle' : ['jquery'],
		'color' : ['jquery'],
		'prettyPhoto' : ['jquery'],
		'jquery.cleditor.min' : ['jquery'],
		'jquery.gritter.min' : ['jquery'],
		'jquery.rateit.min' : ['jquery'],
		'jquery.toggle.buttons' : ['jquery'],
		'fullcalendar' : ['jquery'],
		'flot': ['jquery'],
        'flot.pie': ['flot', 'jquery'],
        'flot.resize': ['flot', 'jquery'],
        'flot.stack': ['flot', 'jquery'],
        'flot.time': ['flot', 'jquery'],
        'excanvas': ['flot', 'jquery'],
        'bootstrap' : ['jquery'],
        'jquery-ui' :['jquery'],
        'bootstrap-datetimepicker' :['bootstrap'],
        'kendo.web' : ['jquery'],
        'mustache' : [],
        
    },
    
    /**
	 * @cfg {String} baseUrl (required) The root path to use for all module
	 *      lookups.
	 */
	"baseUrl" : "js",
	
    /**
	 * @cfg {String} paths (required) Path mappings for module names not found
	 *      directly under baseUrl. The path settings are assumed to be relative
	 *      to baseUrl, unless the paths setting starts with a "/" or has a URL
	 *      protocol in it ("like http:").
	 */
	"paths" : {
		"lib" : "lib",
		"app" : "app",
		"core" : "core",
		"gadget" : "gadget",
		"jquery" : pom.repos.google + "/jquery/" + pom.versions.jquery + "/jquery.min",
		"jquery-ui" : pom.repos.google + "/jqueryui/" + pom.versions.jqueryui + "/jquery-ui.min",
		"bootstrap" : pom.repos.cloudfare + "/twitter-bootstrap/" + pom.versions.bootstrap + "/js/bootstrap.min",
		"bootstrap-datetimepicker" : pom.repos.cloudfare + "/bootstrap-datetimepicker/" + pom.versions.datetimepicker + "/js/bootstrap-datetimepicker.min", 
		"bootstrap-switch" : pom.repos.cloudfare + "/bootstrap-switch/1.3/bootstrapSwitch.min",
		"flot" : pom.repos.cloudfare + "/flot/" + pom.versions.flot + "/jquery.flot.min",
		"flot.pie" : pom.repos.cloudfare + "/flot/" + pom.versions.flot + "/jquery.flot.pie.min",
		"flot.resize" : pom.repos.cloudfare + "/flot/" + pom.versions.flot + "/jquery.flot.resize.min",
		"flot.stack" : pom.repos.cloudfare + "/flot/" + pom.versions.flot + "/jquery.flot.stack.min",
		"flot.time" : pom.repos.cloudfare + "/flot/" + pom.versions.flot + "/jquery.flot.time.min",	
		"excanvas" : pom.repos.cloudfare + "/flot/" + pom.versions.flot + "/excanvas.min",
		"sparkline" : pom.repos.jsdelivr + "/jquery.sparkline/" + pom.versions.sparkline + "/jquery.sparkline.min",
		"fullcalendar" : pom.repos.cloudfare + "/fullcalendar/" + pom.versions.fullcalendar + "/fullcalendar.min",
		"sizzle" : pom.repos.cloudfare + "/sizzle/" + pom.versions.sizzle + "/sizzle.min",
		"color" : pom.repos.cloudfare + "/jquery-color/" + pom.versions.jquerycolor + "/jquery.color.min",
		"prettyPhoto" : pom.repos.jsdelivr + "/prettyphoto/" + pom.versions.prettyphoto + "/jquery.prettyPhoto",
		"kendo-web" : "lib/kendo.web",
		// "jquery" : "lib/offline/jquery.min",
		"mustache" : "lib/offline/mustache"
	}
});

// Load the main app module to start the app
require(["core/sandbox"], 
		// This function will be called when all the dependencies
        // listed above in deps are loaded. Note that this
        // function could be called before the page is loaded.
        // This callback is optional.
		function(Sandbox) {
	Sandbox.Core.Loader.loadCSS();
})

