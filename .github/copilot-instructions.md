# Copilot Instructions for training-2daw-psp

## Project Overview

This is a **Java training repository** organized into learning units (UD) covering concurrent programming, networking, and UI frameworks. Each unit contains independent, self-contained examples demonstrating specific concepts.

- **ud01/**: Threads, concurrency patterns (semaphores, mutexes, atomic types), and futures
- **ud02/**: Socket programming (echo servers, client-server communication)
- **extra/**: Supplementary projects (hashing, JavaFX UI demonstrations)
- **presentations/**: Educational content (2EV planning with Node.js/NestJS curriculum)

## Architecture & Patterns

### 1. **Concurrency Pattern Strategy**
Each solution demonstrates a different synchronization approach for shared resources:
- **ICounter interface** (`ud01/02_semaphore_mutex/src/ICounter.java`): Base contract with `increment()` and `getCounter()`
- Multiple implementations: `SimpleCounter`, `SynchronizedCounter`, `SemaphoreCounter`, `MutexCounter`, `ReentrantCounter`, `AtomicIntegerCounter`
- Pattern: **Interchangeable implementations** - swap implementations in `Main.java` to compare behavior and thread-safety

**Key insight:** Use dependency injection pattern (pass `ICounter` to threads) to decouple synchronization strategy from thread logic.

### 2. **Socket Server Threading Model**
- **Server**: Accepts connections in main loop, spawns thread per client
- **EchoServer/EchoThread** (`ud02/04_sockets/` and `ud02/05_echo_server/`): Each client connection gets a dedicated thread
- **Advanced pattern** (05_echo_server): `Chat` class acts as **shared state manager** between threads
- Pattern: Thread-safe message passing through shared object when multiple clients need coordination

### 3. **Module System (Java 9+)**
- `module-info.java` exists in JavaFX projects: Declares module dependencies (`requires javafx.controls`, `requires javafx.fxml`)
- Pattern: Use `opens` clause to expose FXML-touched packages (`opens dev.ohierro.javafx to javafx.fxml`)

### 4. **JavaFX Project Structure**
- **Maven-based** (`extra/02_javafx/` and `demo_fx/`): Uses `javafx-maven-plugin` for GUI launching
- Controllers follow MVC pattern: `HelloController.java` handles FXML bindings from `hello-view.fxml`
- Pattern: FXML for UI layout, Controller for logic, `Launcher` class bridges to `HelloApplication`

## Build & Execution

### Standard Java Projects (ud01, ud02)
- **Compilation**: Use IDE (IntelliJ recommended) or `javac` directly
- **Execution**: Right-click and run `Main.java` from IDE, or `java Main` after compilation
- **IML files** present: IntelliJ project files; open project in IntelliJ for preconfigured builds

### Maven Projects (extra/02_javafx, demo_fx)
```bash
cd extra/02_javafx
mvn clean compile                # Compile
mvn javafx:run                   # Run JavaFX app
mvn compile test                 # If tests added
```

### Thread Testing Pattern
No formal test suite exists. Testing is manual:
1. Run threaded program and observe console output
2. Verify counter reaches expected value (thread-safe implementations) or shows race conditions (unsafe ones)
3. Example: Run with `SimpleCounter` (expect race condition) vs `MutexCounter` (expect correct result)

## Developer Conventions

### Naming & Package Structure
- **Package naming**: `dev.ohierro.[project]` (e.g., `dev.ohierro.javafx`, `dev.ohierro.demo_fx`)
- **Thread implementations**: Always named `CounterThread` or `EchoThread` pattern
- **Server/Client split**: Separate `.iml` projects in `ud02/04_sockets/` and `ud02/05_echo_server/`

### Import Patterns
- Standard library only in most projects (no external dependencies except Maven projects)
- Maven projects (`02_javafx`, `demo_fx`): Configure via `pom.xml` with properties for compiler version (currently Java 25)

### Exception Handling
- Methods declare throws: `throws IOException`, `throws InterruptedException`
- Minimal try-catch; exceptions bubble to `main()`

## Key Files & Examples

| Concept | Key File | Pattern |
|---------|----------|---------|
| Thread synchronization | `ud01/02_semaphore_mutex/src/ICounter.java` & implementations | Strategy pattern - swap implementations |
| Semaphore usage | `ud01/02_semaphore_mutex/src/SemaphoreCounter.java` | `acquire()`/`release()` wrapper |
| ReentrantLock | `ud01/02_semaphore_mutex/src/ReentrantCounter.java` | Explicit lock/unlock with try-finally |
| Socket server | `ud02/04_sockets/server/src/EchoServer.java` | Per-client thread model |
| Shared state (sockets) | `ud02/05_echo_server/sockets/src/Chat.java` | Thread-safe message store |
| JavaFX MVC | `extra/02_javafx/src/main/java/dev/ohierro/javafx/` | Controller + FXML |

## Critical Conventions to Follow

1. **Thread-safe modifications**: Always wrap shared variables with synchronization mechanism (don't assume single-threaded)
2. **Server socket patterns**: Always `new Thread(clientHandler).start()` for each connection in loop
3. **JavaFX FXML binding**: Controllers must be annotated, module-info must `opens` to `javafx.fxml`
4. **Exception propagation**: Let checked exceptions declare in method signature rather than catching globally
5. **No Framework Dependencies** (except Maven projects): ud01/ud02 use only Java standard library for educational clarity
