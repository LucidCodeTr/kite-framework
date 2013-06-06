define(["jquery"], function(sandbox) {
	return {
		display : function () {
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