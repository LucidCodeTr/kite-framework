var settings = {
	a : 5,
	b : {
		b1 : {
			c : 2
		}
	}
};

var main = {
	init : function() {
		main.listView.init();
	}
};

main.listView = {
	dom : {},
	init : function() {
		var upper = this;
		this.dom.core = $("#account-template-area");
		upper.fillKendoGrid();
	},
	fill : function() {
		var upper = this;
		$.getJSON("ajax/listGedikStocks").success(
				function(data) {

					// fill table
					var template = $('#account-table-body-template').html();
					var html = Mustache.to_html(template, data);
					$('#account-table-body').html(html);

				});
	},
	fillKendoGrid : function() {
		$("#grid").kendoGrid({
            dataSource: {
                type: "jsonp",
                transport: {
                    read: "ajax/listGedikStocks"
                },
                schema: {
                	data : "gedikStockList"
                },
                pageSize: 20,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
            },
            height: 430,
            filterable: true,
            sortable: true,
            pageable: true,
            columns: [
                {
                    field:"stockName",
                    title: "Stock Name",
                    width: 120
            	}, {
                    field: "stockPrice",
                    title: "Stock Price",
                    width: 120
            	}, {
                    field: "priceDiff",
                    title: "Difference (%)",
                    width: 120
            	}, {
                    field: "volume",
                    title: "Volume",
                    width: 120
                }, {
                    field: "lowestPrice",
                    title: "Lowest Price",
                    width: 150
                }, {
                    field: "highestPrice",
                    title: "Highest Price",
                    width: 150
                },
                { command: { text: "Buy", click: showDetails }, title: "&nbsp;", title: "Command", width: "52px" }
            ],
            editable: "popup"
        });
	}
};

$(function() {
	main.init();
	
	var win = $("#window").kendoWindow({
        height: "200px",
        title: "Centered Window",
        visible: false,
        width: "200px"
    }).data("kendoWindow");
        
});

function showDetails (){
    var win = $("#window").data("kendoWindow");
    win.center();
    win.open();
};
