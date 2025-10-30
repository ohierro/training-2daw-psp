public class SynchronizedCounter implements ICounter{
    private int counter = 0;

    public synchronized void increment() {
        // consulta a BD
        counter++;
        // Fetch
    }

    public int getCounter() {
        return counter;
    }
}
