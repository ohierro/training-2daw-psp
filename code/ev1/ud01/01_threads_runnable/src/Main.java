public class Main {
    public static void main(String[] args) throws InterruptedException {

        //Counter counter = new Counter();
        //ReentrantCounter counter = new ReentrantCounter();
        //SemaphoreCounter counter = new SemaphoreCounter();
        ICounter counter = new MutexCounter();

        var ct1 = new CounterThread(counter);
        var ct2 = new CounterThread(counter);
        var ct3 = new CounterThread(counter);

        System.out.println("Valor del contador: " + counter.getCounter());

        ct1.start();
        ct2.start();
        ct3.start();

        ct1.join();
        ct2.join();
        ct3.join();

        System.out.println("Valor del contador: " + counter.getCounter());
        System.out.println("End of program!!");
    }
}