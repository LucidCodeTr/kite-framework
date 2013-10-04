package tr.com.lucidcode.obss.util;

import tr.com.lucidcode.obss.service.AccountService;

/**
 * 
 * Utility method for dispatching service requests.
 *
 */
public class ServiceDispatcher {

	private static AccountService singletonAccountService;

	public static AccountService getAccountService() {
		if (singletonAccountService == null) {
			singletonAccountService = new AccountService();
		}
		return singletonAccountService;
	}
}
