package dao;

import model.Consumer;
import model.Seller;

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
        // TODO dao.implement here
        return null;
    }

    /**
     * @return
     */
    public DAO<Seller> getSellerDAO() {
        // TODO dao.implement here
        return null;
    }


}