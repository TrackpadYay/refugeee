package main.java.refugees;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class Countries {
    private static final String API_KEY = "YOUR_API_KEY";
    private static final String API_URL = "https://api.unhcr.org/docs/refugee-statistics.html#api-_";

    public static void main(String[] args) {
        try {
            URL url = new URL(API_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Authorization", "Bearer " + API_KEY);

            Scanner scanner = new Scanner(conn.getInputStream());
            String response = scanner.useDelimiter("\\A").next();
            System.out.println(response);
            scanner.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
