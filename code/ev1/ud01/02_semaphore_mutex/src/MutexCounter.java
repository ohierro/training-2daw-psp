public class MutexCounter implements ICounter{
    private int counter = 0;
    private Object mutex = new Object();

    public void increment() {
        // consulta a BD
        synchronized(mutex) {
            counter++;
        }
        // Fetch
    }

    public int getCounter() {
        return counter;
    }
}
