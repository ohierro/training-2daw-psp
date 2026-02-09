import java.text.MessageFormat;

public class CounterRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(MessageFormat.format("[{0}] => {1}", Thread.currentThread().threadId(), i));
        }
    }
}
