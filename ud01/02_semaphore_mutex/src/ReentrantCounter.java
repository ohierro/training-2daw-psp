import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class ReentrantCounter {
    private int counter;
    private ReentrantLock lock = new ReentrantLock();

    public void increment() throws InterruptedException {
        if (!lock.tryLock(2, TimeUnit.MILLISECONDS)) {
            return;
        }

        try {
            if (Math.random() < 0.1) { Thread.sleep(5); };
            counter++;
        } finally {
            lock.unlock();
        }

    }

    public int getCounter() {
        return counter;
    }
}
