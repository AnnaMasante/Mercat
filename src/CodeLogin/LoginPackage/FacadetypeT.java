
import java.util.*;

/**
 * 
 */
public interface FacadetypeT {

    /**
     * @return
     */
    public DAO<T> getDAO();

    /**
     * @param info 
     * @return
     */
    public void update(ArrayList<String> info);

    /**
     * @param info 
     * @return
     */
    public void addInfo(ArrayList<String> info);

    /**
     * @param id 
     * @return
     */
    public T find(int id);

}