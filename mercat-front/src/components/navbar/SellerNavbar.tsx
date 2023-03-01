import '../../css/Navbar.css';
import logo from '../../pictures/Mercotte.png';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user/types';
import { useHistory } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';

const SellerNavbar = () => {
  const [isActive, setisActive] = useState(false);
  const history = useHistory();
  const { logout } = useContext(UserContext);

  return (
    <nav
      className="navbar is-transparent mx-6"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={logo} width="112" height="56" alt="logo"></img>
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
          <a className="navbar-item" href="/creation">
            Créer un produit
          </a>

          <a className="navbar-item" href="/compte/produits">
            Mes produits
          </a>
          <a className="navbar-item" href="/commandes">
            Mes ventes
          </a>
          <a className="navbar-item" href="/promotions">
            Mes promotions
          </a>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <a className="navbar-item" href="/profil">
            <BsFillPersonFill />
          </a>
        </div>
        <div className="navbar-item">
          <div className="buttons">
            <a
              className="button is-light"
              onClick={() => {
                logout();
                history.push('/');
              }}
            >
              Se déconnecter
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SellerNavbar;
