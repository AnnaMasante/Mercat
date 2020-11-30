import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

// https://www.youtube.com/watch?v=T5Hey0e2Y_g
// Exemple pour ajouter la librairie
// La lib est peut etre spécifique à windows


public class Demo {
Statement st = null;
    public static void main(String[] args) {
        try {

            Class.forName("com.mysql.jdbc.Driver");
            Connection cn = DriverManager.getConnection("jdbc:mysql://localhost/Mercat", "root","");
            Statement st = cn.createStatement();
            st.executeUpdate("INSERT INTO user VALUES ('b','a','a','a','a','a','a','1','a','a','a')");
        }
        catch (SQLException | ClassNotFoundException ex) {
            // handle any errors
            System.out.println("SQLException: " + ex.getMessage());
        }


    }
}


