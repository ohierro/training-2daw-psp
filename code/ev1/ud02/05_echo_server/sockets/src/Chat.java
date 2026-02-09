import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.util.*;

public class Chat {
    private final List<String> messages = Collections.synchronizedList(new ArrayList<>());
    private final PropertyChangeSupport pcs = new PropertyChangeSupport(this);

    public void addMessage(String msg) {
        this.pcs.firePropertyChange("messages", this.messages, msg);
        messages.add(msg);
    }

    public List<String> getMessages() {
        return messages;
    }

    public void addPropertyChangeListener(PropertyChangeListener listener) {
        this.pcs.addPropertyChangeListener(listener);
    }

    public void removePropertyChangeListener(PropertyChangeListener listener) {
        this.pcs.removePropertyChangeListener(listener);
    }
}
