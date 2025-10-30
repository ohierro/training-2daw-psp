import java.util.concurrent.Semaphore;

public class SemaphoreCounter implements ICounter{
    private int counter = 0;
    private Semaphore semaphore = new Semaphore(2);

    public synchronized void increment() {
        try {
            semaphore.acquire(1);

            counter++;

            semaphore.release();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public int getCounter() {
        return counter;
    }
}
