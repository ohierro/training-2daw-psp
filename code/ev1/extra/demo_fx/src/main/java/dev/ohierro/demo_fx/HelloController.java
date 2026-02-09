package dev.ohierro.demo_fx;

import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.layout.HBox;

import java.awt.event.ActionEvent;

public class HelloController {
    @FXML
    private TextField filePath;

    @FXML
    private Button addButton;

    @FXML
    private TabPane  tabPane;

    @FXML
    public void onAddButtonClick() {
        Tab tab = new Tab();
        tab.setText(filePath.getText());

        tab.setContent(loadPane(filePath.getText()));

        tabPane.getTabs().add(tab);
        filePath.clear();
    }

    protected HBox loadPane(String filePath) {
        HBox hBox = new HBox();
        hBox.setSpacing(10);

        Label label = new Label();
        label.setText(filePath);

        hBox.getChildren().add(label);

        ProgressBar progressBar = new ProgressBar();
        hBox.getChildren().add(progressBar);

        return hBox;
    }

    @FXML
    protected void onLoadDefaults() { IO.println("Cargando fichero " + filePath.getText()); }
}
