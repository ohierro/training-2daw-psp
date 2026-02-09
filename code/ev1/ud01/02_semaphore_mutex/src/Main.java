public class Main {
    public static void main(String[] args) throws InterruptedException {
        CounterThread[] threads = new CounterThread[3];
        // ICounter counter = new SimpleCounter();
        // ICounter counter = new SynchronizedCounter();
        // ICounter counter = new SynchronizedBlockCounter();
        // ICounter counter =  new ReentranLockCounter();
        // ICounter counter = new SemaphoreCounter();
        ICounter counter = new AtomicIntegerCounter();

        for(int i = 0; i < threads.length; i++){
            threads[i] = new CounterThread(counter);
            threads[i].start();
        }

        for(int i = 0; i < threads.length; i++){
            threads[i].join();
        }

        System.out.println("Counter: " + counter.getCounter());
    }
}