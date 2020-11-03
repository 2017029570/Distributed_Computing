package rdate;

import java.rmi.*;
import java.util.*;

public interface RemoteDate extends Remote {
	Date remoteDate() throws RemoteException;
	String regionalDate(Locale language) throws RemoteException;
}