import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

public class HashCalculator {
    public static int calculateHash(String data, int min, int max) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("md5");


        for (int i = min; i <= max; i++) {
            String msg = String.format("%03d%s", i, data);
            digest.update(msg.getBytes());

            String result = HexFormat.of().formatHex(digest.digest());
            System.out.println("Digest for " + i + ": " + result);

            if (result.startsWith("00")) {
                IO.println("----- FOUND FOUND FOUND FOUND FOUND FOUND -----");
                return i;
            }
        }

        return -1;
    }

    public static boolean validate(String data, int solution) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("md5");

        String msg = String.format("%03d%s", solution, data);
        digest.update(msg.getBytes());

        String result = HexFormat.of().formatHex(digest.digest());

        return result.startsWith("00");
    }
}
