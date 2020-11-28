package CodeLogin.LoginPackage;

import java.util.*;

/**
 * 
 */
public class AbstractFactoryDAO {

    /**
     * Default constructor
     */
    public AbstractFactoryDAO() {
    }

    /**
     * @return
     */
    public DAO<Consumer> getConsumerDAO() {
        // TODO implement here
        return null;
    }

    /**
     * @return
     */
    public DAO<Seller> getSellerDAO() {
        // TODO implement here
        return null;
    }

    /**
     * @return
     */
    public DAO<Admin> getAdminDAO() {
        // TODO implement here
        return null;
    }

}