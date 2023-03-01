import { FC, useState } from 'react';
import Loading from '../components/Loading';
import { useGet } from '../utils/hooks/useGet';
import { Seller } from '../utils/types/Seller';
import '../css/button.css';
import ProductRow from '../components/seller/ProductRow';
import { Product } from '../utils/types/Product';

const SellerProductsPage: FC = () => {
  const [seller, isPending, , setData] = useGet<Seller>('/sellers/profile');
  const [error, setError] = useState<string | null>(null);

  const deleteProduct = (product: Product) => {
    const newProducts = seller?.products.filter((p) => p._id !== product._id);
    const newSeller = { ...seller, products: newProducts };
    setData(newSeller);
  };

  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <div>
          {error && (
            <div className="notification is-danger">
              <button
                className="delete"
                onClick={() => setError(null)}
              ></button>
              {error}
            </div>
          )}
          {seller && seller.products && seller.products.length > 0
            ? seller.products.map((product) => {
                return (
                  <ProductRow
                    obj={product}
                    deleteObj={() => deleteProduct(product)}
                    setError={setError}
                  />
                );
              })
            : 'Pas de produits'}
        </div>
      )}
    </>
  );
};

export default SellerProductsPage;
