import { useGet } from '../utils/hooks/useGet';
import { Product } from '../utils/types/Product';
import ProductGrid from '../components/product/ProductGrid';
import Loading from '../components/Loading';
import { useContext } from 'react';
import { UserContext } from '../contexts/user/types';

const ProductFavoritePage = () => {
  const { user } = useContext(UserContext);
  const [favoriteProducts] = useGet<Product[]>(
    `clients/${user!.sub}/favorites`,
  );

  return (
    <>
      {!favoriteProducts ? (
        <Loading></Loading>
      ) : (
          <div className="columns">
            <div className="column is-2"></div>
            <div className="column">
              <ProductGrid products={favoriteProducts}></ProductGrid>
            </div>
            <div className="column is-2"></div>
          </div>

      )}
    </>
  );
};
export default ProductFavoritePage;
