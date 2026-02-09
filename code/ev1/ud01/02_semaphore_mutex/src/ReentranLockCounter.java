import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class ReentranLockCounter implements ICounter{
    private int counter = 0;
    private ReentrantLock lock = new ReentrantLock();

    public synchronized void increment() {
        // consulta a BD
        //while (!lock.tryLock()) {}


        try {
            while (!lock.tryLock(5, TimeUnit.MILLISECONDS)) {}

            counter++;

            lock.unlock();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        // Fetch
    }

    public int getCounter() {
        return counter;
    }
}
