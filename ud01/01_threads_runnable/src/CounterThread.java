import java.text.MessageFormat;

public class CounterThread extends Thread {

    private ICounter counter;

    public CounterThread(ICounter counter) {
        System.out.println(MessageFormat.format("Estado {0}", Thread.currentThread().getState()));
        this.counter = counter;
    }

    @Override
    public void run() {
        for (int i = 0; i < 3000; i++) {
            try {
                counter.increment();
            } catch (InterruptedException e) {
                //throw new RuntimeException(e);
            }
        }
    }
}
