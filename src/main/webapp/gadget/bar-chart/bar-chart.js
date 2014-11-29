define(["core/sandbox", "mustache", "flot", "flot.resize", "flot.time"], function(sandbox, mustache) {
	
	var midDay = function (inputTime) { 
	    var rd = new Date(inputTime); 
	    return new Date(rd.getFullYear(), rd.getMonth(), rd.getDate(), 12, 0, 0, 0); 
	};
	
	var filterWeekend = function(value) { 
	    // refDate = first monday since epoch (for date filtering) 
	    var refDate = new Date(1970, 0, 5, 12, 0, 0, 0); 
	    var inputDate = midDay(value); 
	    // lastMonday = monday of the week of the input date 
	    var lastMonday = midDay(value); 
	    lastMonday.setUTCDate(lastMonday.getUTCDate() - (lastMonday.getUTCDay() % 7 - 1)); 
	    // numInweek = the number of days of input date since previous monday 
	    var numInWeek = inputDate.getDay() - 1; 
	    // totalDays = the number of days since jan 5, 1970 (the first 
	    //monday after epoch) until last monday 
	    var totalDays = (lastMonday.getTime() - refDate.getTime()) / (24 * 60 * 60 * 1000); 
	    // total weekdays = 5/7 * total days + numInweek reduced to friday 
	    //in case of weekend days 
	    var totalWeekDays = Math.floor(5 / 7 * totalDays) + Math.min(4, numInWeek); 
	    return totalWeekDays; 
	};
	
	return {
		dom : {
			self : null
		},
		data : {
			id : null,
			loadUrl : "ajax/listPriceByPeriod",
			loadData : {
				stockName : "BIMAS",
				period : "WEEK"
			},
			height: 200,
			width: 200,
			top: 0,
			left: 0
		
		},
		template : 
            '<div id="{{id}}" class="bar-chart" style="' + 
			'padding: 0px; position: relative;' + 
			'width: {{width}}px; height: {{height}}px;' + 
			'top: {{top}}px; left: {{left}}px;"' + 
            '</div>'
		, 
    	loadTemplate : function() {
    		var output = mustache.render(this.template, this.data);
    		this.dom.self.replaceWith(output);
    	},
    	load : function(url, loadData) {
    		var that = this;
    		$.ajax({
	            url: this.data.loadUrl,
	            data: loadData,
	            method: 'GET',
	            dataType: 'json',
	            success: function(data) {
	            	that.plot(data, that.data.id);
	            }
	        });
    	},
    	plot : function(data, id) {	
			
    		//format data				
			var d1 = [];			
			for(var i = 0; i < data.length; i ++) {
				d1.push([data[i][0], data[i][1]]);
			}
			
			$.plot($("#" + id), [d1], {					
				xaxis: {
				      mode: "time",
				      //transform: filterWeekend
				},
				grid : {
					borderWidth : 0,
					color : "#777"
				},
				colors : [ "#52b9e9"],
				bars : {
					show : true,
					lineWidth : 15,
					fill : true
				}
			});			
    	},
		init : function (id) {
			
			//set dom elements
			this.dom.self = $("#" + id);
			
			//set data
			this.data.id = id;
			
			//set size and position
			if (this.dom.self.attr("data-width") != null) {
				this.data.width = this.dom.self.attr("data-width");
			}
			if (this.dom.self.attr("data-height") != null) {
				this.data.height = this.dom.self.attr("data-height");
			}
			
			if (this.dom.self.attr("data-top") != null) {
				this.data.top = this.dom.self.attr("data-top");
			}
			
			if (this.dom.self.attr("data-left") != null) {
				this.data.left = this.dom.self.attr("data-left");
			}
			
			//load html template
			this.loadTemplate();
			
			//load data if url exists
			if (this.data.loadUrl != null) {
				this.load(this.data.loadUrl, this.data.loadData);
			}
			
			console.log("bar chart initialized");

		},
		destroy : function () {
			console.log("bar chart destroyed");
		},
		
	}
});