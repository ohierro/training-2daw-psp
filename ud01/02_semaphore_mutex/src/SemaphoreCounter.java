import java.util.concurrent.Semaphore;

public class   SemaphoreCounter {
    private Semaphore semaphore = new Semaphore(2, true);
    private int counter;

    public void increment() throws InterruptedException {
        semaphore.acquire();

        counter++;

        semaphore.release();
    }

    public int getCounter() {
        return counter;
    }
}
