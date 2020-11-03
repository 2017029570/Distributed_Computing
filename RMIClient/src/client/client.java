package client;

import java.rmi.*;
import java.util.*;
import rdate.RemoteDate;


public class client {
	//@SuppressWarnings("deprecation")
	public static void main(String args[]) {
		
		System.setProperty("java.security.policy", "ClientSecurity.policy");
		//System.setProperty("java.rmi.server.codebase", "file:/C:/Users/³²Çýºó/eclipse-workspace/RMIServer/");
		System.setSecurityManager(new RMISecurityManager());
		try {
			RemoteDate aRemoteDate = (RemoteDate)Naming.lookup("//localhost/RemoteDate");
			Date nowDate = aRemoteDate.remoteDate();
			System.out.println(nowDate);
			String EnDate = aRemoteDate.regionalDate(new Locale("ENGLISH"));
			System.out.println(EnDate);
			String KrDate = aRemoteDate.regionalDate(new Locale("KOREAN"));
			System.out.println(KrDate);
			
		}catch(Exception e) {
			System.out.println("Client : " + e.getMessage());
		}
	}
}