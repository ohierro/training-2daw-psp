import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;

public class Main {
    public static void main(String[] args) throws IOException {
        Socket client = new Socket();

        client.connect(new InetSocketAddress("localhost", 3000));

        BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
        PrintWriter out = new PrintWriter(client.getOutputStream(), true);

        out.println("login:john");
        String msg;

        //
        //out.println("reaction:love");
        //out.println("SUMA:2:3");
        //out.println("2");
        //out.println("3");

        String line = in.readLine();
        System.out.println(line);

        client.close();
    }
}