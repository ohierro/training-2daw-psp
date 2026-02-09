module dev.ohierro.demo_fx {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.desktop;


    opens dev.ohierro.demo_fx to javafx.fxml;
    exports dev.ohierro.demo_fx;
}