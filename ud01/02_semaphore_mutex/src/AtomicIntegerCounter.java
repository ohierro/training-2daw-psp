import java.util.concurrent.atomic.AtomicInteger;

public class AtomicIntegerCounter implements ICounter{
    //private int counter = 0;
    private AtomicInteger counter = new AtomicInteger();

    public void  increment() {
        counter.addAndGet(1);
    }

    public int getCounter() {
        return counter.intValue();
    }
}
