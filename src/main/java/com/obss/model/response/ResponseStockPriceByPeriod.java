package com.obss.model.response;

import java.util.Date;
import java.util.List;

public class ResponseStockPriceByPeriod {

	public ResponseStockPriceByPeriod() {}
	
	public ResponseStockPriceByPeriod(List<StockPriceByDate> stockPriceList) {
		super();
		this.stockPriceList = stockPriceList;
	}

	public class StockPriceByDate {
		
		public StockPriceByDate(Float stockPrice, Date date) {
			super();
			this.stockPrice = stockPrice;
			this.date = date;
		}
		
		private Float stockPrice;

		private Date date;
		
		public Float getStockPrice() {
			return stockPrice;
		}
		public void setStockPrice(Float stockPrice) {
			this.stockPrice = stockPrice;
		}
		public Date getDate() {
			return date;
		}
		public void setDate(Date date) {
			this.date = date;
		}
		
	}
	
	private List<StockPriceByDate> stockPriceList;
	
	public List<StockPriceByDate> getStockPriceList() {
		return stockPriceList;
	}

	public void setStockPriceList(List<StockPriceByDate> stockPriceList) {
		this.stockPriceList = stockPriceList;
	}

}
