import { FC } from 'react';
import { Product } from '../../utils/types/Product';
import ProductCard from './ProductCard';

const ProductGrid: FC<{ products: Product[] }> = ({ products }) => {
  console.log(products[0].name)
  return (
    <div className="columns is-multiline">
      {products &&
        products.map((product) => {
          return (
            <div className="column is-3" key={product._id}>
              <ProductCard product={product} />
            </div>
          );
        })}
    </div>
  );
};

export default ProductGrid;
