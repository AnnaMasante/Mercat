import { FC } from 'react';
import { Product } from '../utils/types/Product';
import { useGet } from '../utils/hooks/useGet';
import Loading from '../components/Loading';
import ProductGrid from '../components/product/ProductGrid';

const ProductsPage: FC = () => {
  const [products] = useGet<Product[]>('/products');

  return (
    <>{products === null ? <Loading /> :

            <div className="columns">
              <div className="column is-2"></div>
              <div className="column">
                  <ProductGrid products={products} />
              </div>
              <div className="column is-2"></div>
            </div>

        }</>
  );
};
export default ProductsPage;
