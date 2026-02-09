import java.security.NoSuchAlgorithmException;

//public class Main {
//    public static void main(String[] args) throws NoSuchAlgorithmException {
//        IO.println("Calculando hashes del 0 al 200");
//        HashCalculator.calculateHash("Cadena de ejemplo", 0, 200);
//    }
//}

////TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
//// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
void main() throws NoSuchAlgorithmException {
    IO.println("Calculando hashes del 0 al 100");
    int solution = HashCalculator.calculateHash("Cadena de ejemplo", 0, 200);

    if (HashCalculator.validate("Cadena de ejemplo", solution)) {
        IO.println("Solución válida: " + solution);
    }
}
