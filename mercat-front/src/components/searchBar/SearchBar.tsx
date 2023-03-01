import { BsSearch } from 'react-icons/all';
import 'bulma/css/bulma.min.css';
import { useForm } from '../../utils/hooks/useForm';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
  let history = useHistory();

  const validateSearch = (values: Record<string, string>) => {
    let errors: Record<string, string> = {};
    if (values.nameProduct.trim().length === 0) {
      errors.nameProduct = 'nameProduct must not be empty';
    }
    return errors;
  };

  const initialState: Record<string, string> = {
    nameProduct: '',
    city: '',
  };
  function submitSearch() {
    console.log(values.city, values.nameProduct)
    if(values.city === ''){
      console.log("city vide")
      history.push('produits/' + values.nameProduct+"/recherche");
    }else{
      console.log("autre")
      history.push('produits/' + values.nameProduct + '/' + values.city);
    }
  }

  const { onChange, onSubmit, values } = useForm(
    submitSearch,
    initialState,
    validateSearch,
  );

  return (
    <div className="field is-grouped">
      <div className="control is-expanded">
        <input
          className="input is-rounded"
          name="nameProduct"
          type="text"
          placeholder="Ce que vous voulez"
          onChange={onChange}
          value={values.nameProduct}
        />
      </div>
      <div className="control">
        <input
          className="input is-rounded"
          name="city"
          type="text"
          placeholder="Localité"
          onChange={onChange}
          value={values.city}
        />
      </div>
      <div className="control">
        <button className="button" onClick={onSubmit}>
          <span className="icon">
            <BsSearch></BsSearch>
          </span>
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
