package server;

import java.rmi.*;
import java.rmi.server.*;
import java.util.Date;
import java.util.Locale;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import rdate.*;

public class RemoteDateServant extends UnicastRemoteObject implements RemoteDate{
	public RemoteDateServant() throws RemoteException {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public Date remoteDate() throws RemoteException {
		// TODO Auto-generated method stub
		
		Date serverDate = new Date();
		return serverDate;
	}
	@Override
	public String regionalDate(Locale language) throws RemoteException {
		// TODO Auto-generated method stub
		Date date = new Date();
		DateFormat format = null;
		
		System.out.println(language.getLanguage());
		if(language.getLanguage().equals("korean")) {
			format = new SimpleDateFormat("yyyy/MM/dd");
		}
		
		else if(language.getLanguage().equals("english")) {
			format = new SimpleDateFormat("MM/dd/yyyy");	
		}
		
		String dateStr = format.format(date);
		return dateStr;
	}
	
	
}
