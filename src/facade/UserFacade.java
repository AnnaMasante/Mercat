package facade;

import model.User;
import dao.DAO;

import java.util.*;

/**
 * 
 */
public class UserFacade<T> implements Facade<T> {

    /**
     * Default constructor
     */
    public UserFacade() {
    }


    /**
     * 
     */
    private User user;






    /**
     * @return
     */
    public User getUser() {
        // TODO dao.implement here
        return null;
    }

    /**
     * @param login 
     * @param password 
     * @param emailAddress 
     * @param phoneNumber 
     * @param streetAddress 
     * @param city 
     * @param postalCode 
     * @return
     */
    public void signUpConsumer(String login, String password, String emailAddress, String phoneNumber, String streetAddress, String city, String postalCode) {
        // TODO dao.implement here
    }

    /**
     * @param login 
     * @param password 
     * @return
     */
    public boolean login(String login, String password) {
        // TODO dao.implement here
        return false;
    }

    /**
     * @return
     */
    public boolean isConnected() {
        // TODO dao.implement here
        return false;
    }

    /**
     * @param login 
     * @param password 
     * @param emailAddress 
     * @param phoneNumber 
     * @param streetAddress 
     * @param city 
     * @param postalCode 
     * @param companyName 
     * @return
     */
    public void signUpSeller(String login, String password, String emailAddress, String phoneNumber, String streetAddress, String city, String postalCode, String companyName) {
        // TODO dao.implement here
    }

    /**
     * @param user 
     * @return
     */
    public void updateUser(User user) {
        // TODO dao.implement here
    }

    /**
     * @return
     */
    public DAO<T> getDAO() {
        // TODO dao.implement here
        return null;
    }

    /**
     * @param info 
     * @return
     */
    public void update(ArrayList<String> info) {
        // TODO dao.implement here
    }

    /**
     * @param info 
     * @return
     */
    public void addInfo(ArrayList<String> info) {
        // TODO dao.implement here
    }

    /**
     * @param id 
     * @return
     */
    public T find(int id) {
        // TODO dao.implement here
        return null;
    }

}