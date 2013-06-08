define(["jquery", "kendo-web"], function(sandbox) {
	return {
		init : function (id) {
			$("#kendo-grid").kendoGrid({
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
		            }
		        ],
		        editable: "popup"
		    });
		},
		destroy : function () {
			console.log("bar chart destroyed");
		}
	}
});