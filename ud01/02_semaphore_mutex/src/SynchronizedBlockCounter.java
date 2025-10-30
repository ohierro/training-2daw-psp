public class SynchronizedBlockCounter implements ICounter{
    private int counter = 0;

    public void increment() {
        // consulta a BD
        synchronized(this) {
            counter++;
        }
        // Fetch
    }

    public int getCounter() {
        return counter;
    }
}
