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
            '<div id ="{{id}}">\n' + 
			'<!-- Main bar -->\n' + 
			'<div class="mainbar">\n' + 
			'	<!-- Page heading -->\n' + 
			'	<div class="page-head">\n' + 
			'		<!-- Page heading -->\n' + 
			'		<h2 class="pull-left">Dashboard\n' +  
			'			<!-- page meta -->\n' + 
			'			<span class="page-meta">Something Goes Here</span>\n' + 
			'		</h2>\n' + 
			'		<!-- Breadcrumb -->\n' + 
			'		<div class="bread-crumb pull-right">\n' + 
			'			<a href="#"><i class="icon-home"></i> Home</a>\n' + 
			'			<!-- Divider -->\n' + 
			'			<span class="divider">/</span>\n' + 
			'			<a href="#" class="bread-current">Dashboard</a>\n' + 
			'		</div>\n' + 
			'		<div class="clearfix"></div>\n' + 
			'	</div>\n' + 
			'	<!-- Page heading ends -->\n' + 
			'	\n' + 
			'	<!-- Matter -->\n' + 
			'	<div class="matter">\n' + 
			'	<div class="container-fluid">\n' + 
			'		{{{innerHtml}}}\n' + 
			'	</div>\n' + 
			'</div>\n' + 
			'<!-- Matter ends -->\n' + 
			'</div>\n'
		, 
    	paint : function() {
    		var output = mustache.render(this.template, this.data);
    		this.dom.self.replaceWith(output);
    		$("#" + this.data.id).replaceWith(output);
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
			console.log("page display executed");
		},
		destroy : function () {
			console.log("page destroyed");
		},
		addRow : function (e) {
			console.log("row add: " + e.toString());
		}
	}
});