# Assignment1

* Setting

    1. Server측의 codebase는 RMIServer/src/server/RemoteDateServant.java로 설정되어있다.

    2. Client의 codebase는 server.RemoteDateServant가 저장되어있는 RMIServer/ 이다.

    3. Server와 Client의 Security Policy는 모두 허용하도록 설정하였다.


* Running
    1. RemoteDate 인터페이스를 정의하는 RemoteDateServant로 Server Stub을 만든다.
    ```
    rmic -d C:\Users\남혜빈\eclipse-workspace\RMIServer\ server.RemoteDateServant
    ```

    2. server를 실행한다.
    ```
    java server
    ```

    3. client를 실행한다.
    ```
    java client
    ```

