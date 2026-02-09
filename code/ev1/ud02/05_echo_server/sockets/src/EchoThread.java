import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class EchoThread extends Thread implements PropertyChangeListener {
    private Socket client;
    private Chat chat;
    private BufferedReader in;
    private PrintWriter out;
    private boolean running = true;
    // User defined
    private String userName;

    public EchoThread(Socket client, Chat chat) {
        this.client = client;
        this.chat = chat;

        chat.addPropertyChangeListener(this);
    }

    @Override
    public void run() {
        try {
            // Ya tengo conexión
            in = new BufferedReader(new InputStreamReader(client.getInputStream()));
            out = new PrintWriter(client.getOutputStream(), true);

            for (String msg : chat.getMessages()) {
                out.println(msg);
            }

            String msg;
            while (running && (msg = in.readLine()) != null) {
                //chat.addMessage(msg);
                processMessage(msg);
            }
        } catch (IOException e) {
            System.err.println(e);
        }
    }

    private void processMessage(String msg) {
        // 0 0 0 0 | 0 0 0 0 | 0 0 0 0 | 0 0 0 0
        // 0 0 0 0 | 0 0 0 0 | 0 0 0 1 | 0 0 0 0 Login  === 16
        // 0 0 0 0 | 0 0 0 0 | 0 0 1 0 | 0 0 0 0 Logout === 32
        // 0 0 0 0 | 0 0 0 0 | 0 0 1 1 | 0 0 0 0 Logout === 48

        if (msg.startsWith("login:")) {
            // username
            userName = msg.split(":")[1];

            if  (userName.equals("admin")) {
                out.println("login:rejected");
            } else {
                out.println("login:accepted");
            }
            out.flush();
        }
        if (msg.startsWith("chat:")) {
            chat.addMessage("[" + userName + "] " + msg);
        }
        if (msg.startsWith("logout:")) {
            out.print("Bye, bye!!");
            out.flush();
            chat.addMessage(userName + " has been logged out!");
            running = false;
            //this.stop();
        }
    }

    @Override
    public void propertyChange(PropertyChangeEvent propertyChangeEvent) {
        out.println(propertyChangeEvent.getNewValue());
    }
}
