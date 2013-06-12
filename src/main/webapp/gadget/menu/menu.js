define(["core/sandbox", "mustache"], function(sandbox, mustache) {
	return {
		dom : {
			self : null
		},
		data : {
			id : null
		},
		template : 
		'<!-- Sidebar -->\n' + 
	    '<div id={{id}} class="sidebar">\n' + 
	    '   <div class="sidebar-dropdown"><a href="http://wbpreview.com/previews/WB0GRG7H2/#">Navigation</a></div>\n' + 
	    '    <div class="sidebar-inner">\n' + 
		'	<!-- Search form -->\n' + 
	    '     <div class="sidebar-widget">\n' + 
	    '       <form class="form-inline">\n' + 
	    '          <div class="input-append row-fluid">\n' + 
	    '           <input type="text" class="span8" placeholder="Search">\n' + 
	    '           <button type="submit" class="btn btn-info">Search</button>\n' + 
	    '          </div>\n' + 
	    '        </form>\n' + 
	    '      </div>\n' + 
	    '     <!--- Sidebar navigation -->\n' + 
	    '      <!-- If the main navigation has sub navigation, then add the class "has_submenu" to "li" of main navigation. -->\n' + 
	    '      <ul class="navi">\n' + 
	    '        <!-- Use the class nred, ngreen, nblue, nlightblue, nviolet or norange to add background color. You need to use this in <li> tag. -->\n' + 
	    '        <li class="nred current"><a href="http://wbpreview.com/previews/WB0GRG7H2/#"><i class="icon-desktop"></i> Dashboard</a></li>\n' + 
	    '        <!-- Menu with sub menu -->\n' + 
	    '        <li class="has_submenu nlightblue">\n' + 
	    '          <a href="http://wbpreview.com/previews/WB0GRG7H2/#">\n' + 
	    '            <!-- Menu name with icon -->\n' + 
	    '            <i class="icon-th"></i> Widgets \n' + 
	    '            <!-- Icon for dropdown -->\n' + 
	    '            <span class="pull-right"><i class="icon-angle-right"></i></span>\n' + 
	    '          </a>\n' + 
	    '          <ul>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/widgets1.html">Widgets #1</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/widgets2.html">Widgets #2</a></li>\n' + 
	    '        </li>\n' + 
	    '        <li class="ngreen"><a href="http://wbpreview.com/previews/WB0GRG7H2/charts.html"><i class="icon-bar-chart"></i> Charts</a></li>\n' + 
	    '        <li class="norange"><a href="http://wbpreview.com/previews/WB0GRG7H2/ui.html"><i class="icon-sitemap"></i> UI Elements</a></li>\n' + 
	    '        <li class="has_submenu nviolet">\n' + 
	    '          <a href="http://wbpreview.com/previews/WB0GRG7H2/#">\n' + 
	    '            <i class="icon-file-alt"></i> Pages #1\n' + 
	    '            <span class="pull-right"><i class="icon-angle-right"></i></span>\n' + 
	    '          </a>\n' + 
	    '          <ul>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/calendar.html">Calendar</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/post.html">Make Post</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/login.html">Login</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/register.html">Register</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/statement.html">Statement</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/error-log.html">Error Log</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/support.html">Support</a></li>\n' + 
	    '          </ul>\n' + 
	    '        </li> \n' + 
	    '        <li class="has_submenu nblue">\n' + 
	    '          <a href="http://wbpreview.com/previews/WB0GRG7H2/#">\n' + 
	    '            <i class="icon-file-alt"></i> Pages #2\n' + 
	    '            <span class="pull-right"><i class="icon-angle-right"></i></span>\n' + 
	    '          </a>\n' +       
	    '          <ul>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/error.html">Error</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/gallery.html">Gallery</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/grid.html">Grid</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/invoice.html">Invoice</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/media.html">Media</a></li>\n' + 
	    '            <li><a href="http://wbpreview.com/previews/WB0GRG7H2/profile.html">Profile</a></li>\n' + 
	    '          </ul>\n' + 
	    '        </li>\n' +  
	    '        <li class="nred"><a href="http://wbpreview.com/previews/WB0GRG7H2/forms.html"><i class="icon-list"></i> Forms</a></li>\n' + 
	    '        <li class="nlightblue"><a href="http://wbpreview.com/previews/WB0GRG7H2/tables.html"><i class="icon-table"></i> Tables</a></li>\n' + 
	    '      </ul>\n' + 
	    '      <!-- Date -->\n' + 
	    '      <div class="sidebar-widget">\n' + 
	    '		<aside id="datepicker1" data-type="gadget" data-bind="datepicker.datepicker"></aside>\n' + 
	    '      </div>\n' + 
	    '   </div>\n' + 
	    '</div>'
		, 
    	paint : function() {
    		var output = mustache.render(this.template, this.data);
    		this.dom.self.replaceWith(output);
    	},
		init : function (id) {
			
			//set dom elements
			this.dom.self = $("#" + id);
			
			//set data
			this.data.id = id;
			
			//draw widget
			this.paint();
			
			//load nested gadgets
			sandbox.Core.loadGadgets(sandbox.Core, this.data.id);
			
			console.log("menu initialized");
		},
		destroy : function () {
			console.log("menu destroyed");
		},
		rowClicked : function (e) {
			console.log("row clicked: " + e.toString());
		}
	}
});