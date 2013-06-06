define(["jquery"], function(sandbox) {
	return {
		display : function () {
			console.log("page display executed");
		},
		destroy : function () {
			console.log("page destroyed");
		},
		addRow : function (e) {
			console.log("row add: " + e.toString());
		}
	}
});