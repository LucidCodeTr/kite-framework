define(["jquery"], function(sandbox) {
	return {
		init : function (id) {
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