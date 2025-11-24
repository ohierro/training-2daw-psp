import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class EchoServer {

    public void start(int port) throws IOException {
        System.out.println("EchoServer start");
        ServerSocket serverSocket = new ServerSocket(port);

        Chat chat = new Chat();

        Socket client;
        while (true) {
            client = serverSocket.accept();
            System.out.println("EchoServer accept");

            new EchoThread(client, chat).start();
        }
    }
}
