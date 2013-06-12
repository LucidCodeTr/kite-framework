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
	    '<div id="{{id}}">\n' + 
	    '  <div id="todaydate" class="hasDatepicker">\n' + 
		'	<div class="ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" style="display: block;">\n' + 
		'		<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">\n' + 
		'			<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="Prev">\n' + 
		'				<span class="ui-icon ui-icon-circle-triangle-w">Prev</span>\n' + 
		'			</a>\n' + 
		'			<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="Next">\n' + 
		'				<span class="ui-icon ui-icon-circle-triangle-e">Next</span>\n' + 
		'			</a>\n' + 
		'			<div class="ui-datepicker-title">\n' + 
		'				<span class="ui-datepicker-month">May</span>&nbsp;\n' + 
		'				<span class="ui-datepicker-year">2013</span>\n' + 
		'			</div>\n' + 
		'		</div>\n' + 
		'		<table class="ui-datepicker-calendar">\n' + 
		'			<thead><tr><th class="ui-datepicker-week-end"><span title="Sunday">Su</span></th><th><span title="Monday">Mo</span></th><th><span title="Tuesday">Tu</span></th><th><span title="Wednesday">We</span></th><th><span title="Thursday">Th</span></th><th><span title="Friday">Fr</span></th><th class="ui-datepicker-week-end"><span title="Saturday">Sa</span></th></tr></thead>\n' + 
		'			<tbody>\n' + 
		'				<tr>\n' + 
		'					<td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>\n' + 
		'					<td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>\n' + 
		'					<td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013">\n' + 
		'						<a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">1</a>\n' + 
		'					</td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">2</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">3</a></td>\n' + 
		'					<td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">4</a></td>\n' + 
		'				</tr>\n' + 
		'				<tr>\n' + 
		'					<td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">5</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">6</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">7</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">8</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">9</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">10</a></td>\n' + 
		'					<td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">11</a></td>\n' + 
		'				</tr>\n' + 
		'				<tr>\n' + 
		'					<td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">12</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">13</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">14</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">15</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">16</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">17</a></td>\n' + 
		'					<td class=" ui-datepicker-week-end ui-datepicker-days-cell-over  ui-datepicker-current-day ui-datepicker-today" data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default ui-state-highlight ui-state-active ui-state-hover" href="http://wbpreview.com/previews/WB0GRG7H2/#">18</a></td>\n' + 
		'				</tr>\n' + 
		'				<tr>\n' + 
		'					<td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">19</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">20</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">21</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">22</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">23</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">24</a></td>\n' + 
		'					<td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">25</a></td>\n' + 
		'				</tr>\n' + 
		'				<tr>\n' + 
		'					<td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">26</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">27</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">28</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">29</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">30</a></td>\n' + 
		'					<td class=" " data-handler="selectDay" data-event="click" data-month="4" data-year="2013"><a class="ui-state-default" href="http://wbpreview.com/previews/WB0GRG7H2/#">31</a></td>\n' + 
		'					<td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>\n' + 
		'				</tr>\n' + 
		'			</tbody>\n' + 
		'		</table>\n' + 
		'	</div>\n' + 
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
			
			console.log("datepicker initialized");
		},
		destroy : function () {
			console.log("datepicker destroyed");
		}
	}
});