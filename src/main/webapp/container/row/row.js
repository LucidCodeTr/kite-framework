define(["jquery"], function(sandbox) {
	return {
		display : function () {
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