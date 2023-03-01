import '../../css/Navbar.css';
import logo from '../../pictures/Mercotte.png';
import { useState } from 'react';
import { GrBasket } from 'react-icons/gr';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart/provider';
import { getNumberOfProducts } from '../../utils/cartFunctions';
import { CUSTOMER, UserContext } from '../../contexts/user/types';
import { useHistory } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { useGet } from '../../utils/hooks/useGet';
import { Category } from '../../utils/types/Category';
import { BsHeartFill } from 'react-icons/all';

const CustomerNavbar = () => {
  const [categories] = useGet<Category[]>('/categories');

  const [isActive, setisActive] = useState(false);
  const { user, logout, loggedIn } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const history = useHistory();

  return (
    <nav
      className="navbar is-transparent mx-6"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} width="112" height="56"></img>
        </a>

        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        className={`navbar-menu ${isActive ? 'is-active' : ''}`}
        id="navbarBasicExample"
      >
        <div className="navbar-start">
          {categories &&
            categories.map((category, index) => {
              return (
                <a
                  key={`category-${index}`}
                  className="navbar-item"
                  href={`/categories/${category.label}/produits`}
                >
                  {category.label}
                </a>
              );
            })}

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Autres</a>

            <div className="navbar-dropdown">
              <a className="navbar-item" href="/produits">
                Catalogue
              </a>
              {loggedIn && (
                <>
                  <a className="navbar-item" href="/profil">
                    Mon profil
                  </a>
                  <a className="navbar-item" href="/commandes">
                    Mes commandes
                  </a>
                </>
              )}
              <hr className="navbar-divider" />
              <a className="navbar-item">Nous contacter</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button" href="/panier">
                <GrBasket /> {getNumberOfProducts(cart)}
              </a>
              {!loggedIn ? (
                <>
                  <a
                    className="button"
                    id="signUp-button"
                    href="/compte/creation"
                  >
                    <strong>Créer un compte</strong>
                  </a>
                  <a className="button is-light" href="/connexion">
                    Connexion
                  </a>
                </>
              ) : (
                <>
                  <a className="button" href="/favorites">
                    <BsHeartFill></BsHeartFill>
                  </a>
                  <a className="button" href="/profil">
                    <BsFillPersonFill />
                  </a>
                  <a
                    className="button is-light"
                    onClick={() => {
                      logout();
                      history.push('/');
                    }}
                  >
                    Se déconnecter
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
