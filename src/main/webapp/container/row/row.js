define(["jquery", "mustache"], function(sandbox, mustache) {
	return {
		dom : {
			self : null,
			parent : null
		},
		data : {
			id : null,
			innerHtml : null
		},
		template : 
            '<div id ="{{id}}" class="row-fluid">\n' + 
			'{{{innerHtml}}}\n' + 
            '</div>'
		, 
    	paint : function() {
    		var output = mustache.render(this.template, this.data);
    		this.dom.self.replaceWith(output);
    	},
		init : function (id) {
			//set dom elements
			this.dom.self = $("#" + id);
			this.dom.parent = this.dom.self.parent();
			
			//set data
			this.data.id = id;		
			this.data.innerHtml = this.dom.self.html();
			
			//draw widget
			this.paint();
			console.log("row executed");
		},
		destroy : function () {
			console.log("row destroyed");
		},
		addSpan : function (e) {
			console.log("span add: " + e.toString());
		}
	}
});