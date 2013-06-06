define(["jquery"], function(sandbox) {
	return {
		display : function () {
			console.log("span executed");
		},
		destroy : function () {
			console.log("span destroyed");
		},
		addWidget : function (e) {
			console.log("widget add: " + e.toString());
		}
	}
});