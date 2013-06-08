define(["jquery", "mustache"], function(sandbox, mustache) {
	return {
		dom : {
			self : null,
			parent : null
		},
		data : {
			id : null,
			innerHtml : null,
			color : null,
		},
		template : 
			'<!-- Widget -->' + 
            '<div id ="{{id}}" class="widget w{{color}}">\n' + 
            '    <!-- Widget head -->\n' + 
            '    <div class="widget-head">\n' + 
            '      <div class="pull-left">Dashboard</div>\n' + 
            '      <div class="widget-icons pull-right">\n' + 
            '        <a href="#" class="wminimize"><i class="icon-chevron-up"></i></a>\n' + 
            '        <a href="#" class="wclose"><i class="icon-remove"></i></a>\n' + 
            '      </div>\n' + 
            '      <div class="clearfix"></div>\n' + 
            '    </div> ' + 
			' 	 {{{ innerHtml }}}\n' + 
            '    <!-- Widget content -->\n' + 
            '    <div class="widget-content">\n' + 
            '      <div class="padd">\n' + 
            '		</div>\n' + 
			'	 </div>\n' + 
			'	 <!-- Widget ends -->\n' + 
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
			this.data.color = this.dom.self.attr("data-color");
		
			//draw widget
			this.paint();
			
			console.log("widget executed");
		},
		destroy : function () {
			console.log("widget destroyed");
		},
		addGadget : function (e) {
			console.log("gadget add: " + e.toString());
		}
	}
});