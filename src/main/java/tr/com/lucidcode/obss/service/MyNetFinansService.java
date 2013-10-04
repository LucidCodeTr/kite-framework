package tr.com.lucidcode.obss.service;

import java.net.URL;
import java.util.Iterator;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Service;

@Service("myNetFinansService")
public class MyNetFinansService {
		
	public enum PERIOD {
		DAY ("d"),
		WEEK ("w") ,
		MONTH ("m"),
		THREEMONTHS ("3m"),
		SIXMONTHS ("6m"),
		YEAR ("y"),
		THREEYEARS ("3y"),
		FIVEYEARS ("5y"),
		TWELVEYEARS ("12y");
		
		private PERIOD(String value) {
			this.setValue(value);
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		private String value;
		
		
	}
	
	public static final String MYNET_FINANS_MAIN_URL = "http://finans.mynet.com";
		
	public JsonNode getPricesByPeriod(String stockName, PERIOD period) {

		ObjectMapper mapper = new ObjectMapper();	
		JsonNode datasets;
		URL url;
		try {
			url = new URL(MYNET_FINANS_MAIN_URL + "/borsa/ajaxCharts/?type=stock&ticker=" + stockName +"&range=" + period.getValue());
			datasets = mapper.readValue(url, JsonNode.class);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} 
		
		JsonNode priceNode = datasets.path("Data").path("ohlc");
		return priceNode;
	}

}
