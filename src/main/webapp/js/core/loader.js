define([ "jquery"], function($) {	
	
	return {
		
		loadView : function(module, path, callback) {
			var that = this;
			//div + append is used to prevent multiple calls of $.load from
			//replacing $("#" + module.parentId) content on every call
			$('<div>').load(path + ".html", function() {
				$("#" + module.id).append($(this).html());
				callback();
			});		
		},
		loadController : function (module, path, callback) {
			var mdeps = [ path + ".js" ];
			require(mdeps, function(obj) {
				callback(obj);
			});
		},
		loadCSS : function (givenPath) {
		    if (givenPath != undefined) {
				var link = document.createElement("link");
			    link.type = "text/css";
			    link.rel = "stylesheet";
		    	link.href = givenPath;
			    document.getElementsByTagName("head")[0].appendChild(link);
		    } else {
				for (var path in pom.cssDependencies) {
					var link = document.createElement("link");
				    link.type = "text/css";
				    link.rel = "stylesheet";
				    link.href = pom.cssDependencies[path];
				    document.getElementsByTagName("head")[0].appendChild(link);
				}
		    }
		}
	};
});
