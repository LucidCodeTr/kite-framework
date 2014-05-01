define(["core/sandbox", "mustache"], function(Sandbox, mustache) {
	return {
		dom : {
			self : null,
			parent : null,
			minimizeButton : null,
			closeButton : null
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
            '        <a id ="{{id}}-wminimize" href="#" class="wminimize"><i class="icon-chevron-up"></i></a>\n' + 
            '        <a id ="{{id}}-wclose" href="#" class="wclose"><i class="icon-remove"></i></a>\n' + 
            '      </div>\n' + 
            '      <div class="clearfix"></div>\n' + 
            '    </div> ' + 
            '    <!-- Widget content -->\n' + 
            '    <div class="widget-content">\n' + 
            '      <div class="padd">\n' + 
			' 	 {{{ innerHtml }}}\n' + 
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
			
			this.dom.self = $("#" + id);
			
			//set dom elements
			this.dom.parent = this.dom.self.parent();
			this.dom.minimizeButton = $("#" + id + "-wminimize");
			this.dom.closeButton = $("#" + id + "-wclose");
			
			//set data
			this.data.id = id;		
			this.data.innerHtml = this.dom.self.html();
			this.data.color = this.dom.self.attr("data-color");
						
			//draw widget
			this.paint();
						
			//bind events
			this.bindEvents();
			
			//set instance to module registry
			Sandbox.Core.registerContainerInstance(this);
			
			console.log("widget initialized");
		},
		destroy : function () {
			console.log("widget destroyed");
		},
		addGadget : function (e) {
			console.log("gadget add: " + e.toString());
		},
		bindEvents : function() {
			this.dom.closeButton.click(this.closeClicked); 
			this.dom.minimizeButton.click(this.minimizeClicked);		
		},
		closeClicked : function (e) {
				e.preventDefault();
				var $wbox = $(this).parent().parent().parent();
				$wbox.hide(100);
		},
		minimizeClicked : function(e) {
			e.preventDefault();
			var $wcontent = $(this).parent().parent().next(
					'.widget-content');
			if ($wcontent.is(':visible')) {
				$(this).children('i').removeClass(
						'icon-chevron-up');
				$(this).children('i').addClass(
						'icon-chevron-down');
			} else {
				$(this).children('i').removeClass(
						'icon-chevron-down');
				$(this).children('i').addClass(
						'icon-chevron-up');
			}
			$wcontent.toggle(500);
		}
	}
});