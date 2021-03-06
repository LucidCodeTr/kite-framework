package tr.com.lucidcode.model.response;

import java.util.List;

import tr.com.lucidcode.model.Account;


public class ResponseAccountList {
	
	private List<Account> accountList;
	private Long rowCount;

	public List<Account> getAccountList() {
		return accountList;
	}

	public void setAccountList(List<Account> accountList) {
		this.accountList = accountList;
	}

	public Long getRowCount() {
		return rowCount;
	}

	public void setRowCount(Long rowCount) {
		this.rowCount = rowCount;
	}

}
