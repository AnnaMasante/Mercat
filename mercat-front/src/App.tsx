import './css/App.css';
import CustomerNavbar from './components/navbar/CustomerNavbar';
import { Switch, Route } from 'react-router-dom';
import ProductCreationForm from './components/product/ProductCreationForm';
import RegisterPage from './pages/RegisterPage';
import StoreDetails from './pages/StoreDetails';
import { CartProvider } from './contexts/cart/provider';
import SearchBar from './components/searchBar/SearchBar';
import ResultsProductName from './components/product/ResultsProductName';
import ProductDetails from './components/product/ProductDetails';
import LoginPage from './pages/LoginPage';
import { useContext } from 'react';
import { CUSTOMER, SELLER, UserContext } from './contexts/user/types';
import SellerNavbar from './components/navbar/SellerNavbar';
import SellerProfile from './pages/SellerProfile';
import SellerProductsPage from './pages/SellerProductsPage';
import ProductFavoritePage from './pages/ProductFavoritePage';
import ProductsPage from './pages/ProductsPage';
import { WishListProvider } from './contexts/wishlist/provider';
import CategoryProducts from './pages/CategoryProducts';
import ProductUpdateForm from './components/product/ProductUpdateForm';
import CustomerProfile from './pages/CustomerProfile';
import FinishOrderPage from './pages/FinishOrderPage';
import CustomerOrdersPage from './pages/CustomerOrdersPage';
import SellerSalesPage from './pages/SellerSalesPage';
import CartPage from './pages/CartPage';
import DiscountsPage from './pages/DiscountsPage';
import ResultsProductBoth from "./components/product/ResultsProductBoth";

function App() {
  const { user, loggedIn } = useContext(UserContext);

  return (
    <CartProvider>
      {!user || user.role === CUSTOMER ? <CustomerNavbar /> : <SellerNavbar />}
      {!user || (user.role === CUSTOMER && <SearchBar />)}
      <Switch>
        {!loggedIn && (
          <>
            <Route exact path="/connexion" component={LoginPage} />
            <Route exact path="/compte/creation" component={RegisterPage} />
            <Route exact path="/produits" component={ProductsPage} />
            <Route exact path="/" component={ProductsPage} />
            <Route exact path="/magasins/:id" component={StoreDetails} />
            <Route exact path="/panier" component={CartPage} />
            <Route
              exact
              path="/produits/:nameProduct/:city"
              component={ResultsProductName}
            />
            <Route exact path="/produits/:id" component={ProductDetails} />
            <Route
              path="/categories/:label/produits"
              component={CategoryProducts}
            />
          </>
        )}
        {/* Customers */}
        {user && user.role === CUSTOMER && (
          <WishListProvider>
            <Route exact path="/" component={ProductsPage} />
            <Route exact path="/produits" component={ProductsPage} />
            <Route exact path="/magasins/:id" component={StoreDetails} />
            <Route exact path="/panier" component={CartPage} />
            <Route exact path="/profil" component={CustomerProfile} />
            <Route
              exact
              path="/produits/:nameProduct/:city"
              component={ResultsProductBoth}
            />
              <Route
                  exact
                  path="/produits/:nameProduct/recherche"
                  component={ResultsProductName}
              />
            <Route
              exact
              path="/favorites"
              component={ProductFavoritePage}
            ></Route>
            <Route exact path="/produits/:id" component={ProductDetails} />
            <Route
              exact
              path="/categories/:label/produits"
              component={CategoryProducts}
            />
            <Route exact path="/commander" component={FinishOrderPage} />
            <Route exact path="/commandes" component={CustomerOrdersPage} />
          </WishListProvider>
        )}
        {/* Only sellers */}
        {user && user.role === SELLER && (
          <>
            <Route exact path="/creation" component={ProductCreationForm} />
            <Route exact path="/profil" component={SellerProfile} />
            <Route
              exact
              path="/compte/produits"
              component={SellerProductsPage}
            />
            <Route
              exact
              path="/produits/:nameProduct/:city"
              component={ResultsProductName}
            />
            <Route
              exact
              path="/produits/:id/modifier"
              component={ProductUpdateForm}
            />
            <Route exact path="/produits/:id" component={ProductDetails} />
            <Route
              exact
              path="/categories/produits/:id"
              component={ProductDetails}
            />
            <Route exact path="/commandes" component={SellerSalesPage} />
            <Route exact path="/promotions" component={DiscountsPage}></Route>
          </>
        )}
      </Switch>
    </CartProvider>
  );
}

export default App;
