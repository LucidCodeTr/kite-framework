define(["core/sandbox", "mustache"], function(sandbox, mustache) {
	return {
		dom : {
			self : null
		},
		data : {
			id : null
		},
		template : 
		'<div id={{id}} class="navbar navbar-fixed-top navbar-inverse">\n' + 
		'  <div class="navbar-inner">\n' + 
		'    <div class="container">\n' + 
		'      <!-- Menu button for smallar screens -->\n' + 
		'      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">\n' + 
		'            <span class="icon-bar"></span>\n' + 
		'            <span class="icon-bar"></span>\n' + 
		'            <span class="icon-bar"></span>\n' + 
		'      </a>\n' + 
		'      <!-- Site name for smallar screens -->\n' + 
		'      <a href="http://wbpreview.com/previews/WB0GRG7H2/index.html" class="brand">Metro <span class="bold">King</span></a>\n' + 
		'      <!-- Navigation starts -->\n' + 
		'      <div class="nav-collapse collapse">\n' + 
		'       <!-- Links -->\n' + 
		'        <ul class="nav pull-right">\n' + 
		'          <li class="dropdown pull-right">\n' + 
		'            <a data-toggle="dropdown" class="dropdown-toggle" href="http://wbpreview.com/previews/WB0GRG7H2/#">\n' + 
		'              <img src="img/user.jpg" alt="" class="nav-user-pic"> Admin <b class="caret"></b>\n' +            
		'            </a>\n' +          
		'            <!-- Dropdown menu -->\n' + 
		'            <ul class="dropdown-menu">\n' + 
		'              <li><a href="http://wbpreview.com/previews/WB0GRG7H2/#"><i class="icon-user"></i> Profile</a></li>\n' + 
		'              <li><a href="http://wbpreview.com/previews/WB0GRG7H2/#"><i class="icon-cogs"></i> Settings</a></li>\n' + 
		'              <li><a href="http://wbpreview.com/previews/WB0GRG7H2/login.html"><i class="icon-off"></i> Logout</a></li>\n' + 
		'            </ul>\n' + 
		'          </li>\n' +      
		'        </ul>\n' + 
		'       <!-- Notifications -->\n' + 
		'        <ul class="nav pull-right">\n' +       
		'          <!-- Comment button with number of latest comments count -->\n' + 
		'            <li class="dropdown dropdown-big">\n' + 
		'              <a class="dropdown-toggle" href="http://wbpreview.com/previews/WB0GRG7H2/#" data-toggle="dropdown">\n' + 
		'                <i class="icon-comments"></i> Chats <span class="badge badge-info">6</span> \n' + 
		'              </a>\n' + 
		'                <ul class="dropdown-menu">\n' + 
		'                  <li>\n' + 
		'                   <!-- Heading - h5 -->\n' + 
		'                    <h5><i class="icon-comments"></i> Chats</h5>\n' + 
		'                    <!-- Use hr tag to add border -->\n' + 
		'                    <hr>\n' + 
		'                  </li>\n' + 
		'                  <li>\n' + 
		'                    <!-- List item heading h6 -->\n' + 
		'                    <a href="http://wbpreview.com/previews/WB0GRG7H2/#">Hi :)</a> <span class="label label-warning pull-right">10:42</span>\n' + 
		'                    <div class="clearfix"></div>\n' + 
		'                    <hr>\n' + 
		'                  </li>\n' + 
		'                  <li>\n' + 
		'                    <a href="http://wbpreview.com/previews/WB0GRG7H2/#">How are you?</a> <span class="label label-warning pull-right">20:42</span>\n' + 
		'                    <div class="clearfix"></div>\n' + 
		'                    <hr>\n' + 
		'                  </li>\n' + 
		'                  <li>\n' + 
		'                    <a href="http://wbpreview.com/previews/WB0GRG7H2/#">What are you doing?</a> <span class="label label-warning pull-right">14:42</span>\n' + 
		'                    <div class="clearfix"></div>\n' + 
		'                    <hr>\n' + 
		'                  </li>\n' +              
		'                  <li>\n' + 
		'                    <div class="drop-foot">\n' + 
		'                      <a href="http://wbpreview.com/previews/WB0GRG7H2/#">View All</a>\n' + 
		'                    </div>\n' + 
		'                  </li>\n' +                                 
		'                </ul>\n' + 
		'            </li>\n' + 
		'       </ul>\n' + 
		'      </div>\n' + 
		'    </div>\n' + 
		'  </div>\n' + 
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
			
			console.log("navigation bar initialized");
		},
		destroy : function () {
			console.log("navigation bar destroyed");
		}
	}
});