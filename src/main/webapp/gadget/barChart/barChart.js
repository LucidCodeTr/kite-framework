define(["jquery", "flot"], function(sandbox) {
	return {
		display : function () {
			
			/* Bar Chart starts */

			var d1 = [];
			
			for ( var i = 0; i <= 30; i += 1)
				d1.push([i, parseInt(Math.random() * 30) ]);
			
			var d2 = [];
			for ( var i = 0; i <= 30; i += 1)
				d2.push([i, parseInt(Math.random() * 30) ]);

			var stack = 0, bars = true, lines = false, steps = false;

			function plotWithOptions() {
				$.plot($("#bar-chart"), [ d1, d2 ], {
					series : {
						stack : stack,
						lines : {
							show : lines,
							fill : true,
							steps : steps
						},
						bars : {
							show : bars,
							barWidth : 0.8
						}
					},
					grid : {
						borderWidth : 0,
						hoverable : true,
						color : "#777"
					},
					colors : [ "#52b9e9", "#0aa4eb" ],
					bars : {
						show : true,
						lineWidth : 0,
						fill : true,
						fillColor : {
							colors : [ {
								opacity : 0.9
							}, {
								opacity : 0.8
							} ]
						}
					}
				});
			}

			plotWithOptions();

			$(".stackControls input")
					.click(
							function(e) {
								e.preventDefault();
								stack = $(this).val() == "With stacking" ? true : null;
								plotWithOptions();
							});
			$(".graphControls input").click(
					function(e) {
						e.preventDefault();
						bars = $(this).val().indexOf("Bars") != -1;
						lines = $(this).val().indexOf("Lines") != -1;
						steps = $(this).val().indexOf("steps") != -1;
						plotWithOptions();
					});

			console.log("bar chart initialized");
			/* Bar chart ends */
		},
		destroy : function () {
			console.log("bar chart destroyed");
		}
	}
});