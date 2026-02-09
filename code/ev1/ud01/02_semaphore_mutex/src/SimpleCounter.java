public class SimpleCounter implements ICounter{
    private int counter = 0;

    public void  increment() {
        counter++;
    }

    public int getCounter() {
        return counter;
    }
}
