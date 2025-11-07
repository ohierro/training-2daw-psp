import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class EchoThread extends Thread {
    private Socket client;

    public EchoThread(Socket client) {
        this.client = client;
    }

    @Override
    public void run() {
        try {
            // Ya tengo conexión
            BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
            PrintWriter out = new PrintWriter(client.getOutputStream(), true);

            String msg;
            while ((msg = in.readLine()) != null) {
                System.out.println("[client] " + msg);
                out.println("[server " + Thread.currentThread() + " )] " + msg);
            }
        } catch (IOException e) {
            System.err.println(e);
        }
    }
}
