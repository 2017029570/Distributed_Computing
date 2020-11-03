package server;

import java.rmi.*;
import java.rmi.server.*;
import rdate.RemoteDate;

public class server{
	//@SuppressWarnings("deprecation")
	
	public static void main(String args[]) {
		System.setProperty("java.security.policy", "ServerSecurity.policy");
		//System.setProperty("java.rmi.server.codebase", "file:/C:/Users/³²Çýºó/eclipse-workspace/RMIServer/src/server/RemoteDateServant.java");
		System.setSecurityManager(new RMISecurityManager());
		try {
			RemoteDate aRemoteDate = new RemoteDateServant();
			Naming.rebind("//localhost/RemoteDate", aRemoteDate);
			System.out.println("RemoteDate server ready");
		}catch(Exception e) {
			System.out.println("RemoteDate server main " + e.getMessage());
		}
	}
}