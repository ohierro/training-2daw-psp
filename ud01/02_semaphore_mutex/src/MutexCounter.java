public class MutexCounter implements ICounter{
    private Object mutex = new Object();
    private int counter;

    @Override
    public void increment() {
        synchronized (mutex) {
            counter++;
        }
    }

    @Override
    public int getCounter() {
        return counter;
    }
}
