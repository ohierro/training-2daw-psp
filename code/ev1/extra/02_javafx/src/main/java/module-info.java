module dev.ohierro.javafx {
    requires javafx.controls;
    requires javafx.fxml;


    opens dev.ohierro.javafx to javafx.fxml;
    exports dev.ohierro.javafx;
}