define(["jquery"], function(sandbox) {
	return {
		display : function () {
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