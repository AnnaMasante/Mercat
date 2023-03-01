import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ProductGrid from '../components/product/ProductGrid';
import { useGet } from '../utils/hooks/useGet';
import { Product } from '../utils/types/Product';

const CategoryProducts: FC = () => {
  const { label: categoryLabel } = useParams<{ label: string }>();
  const [products, isPending] = useGet<Product[]>(
    `/categories/${categoryLabel}/products`,
  );

  return <>{isPending ? <Loading /> : <ProductGrid products={products!} />}</>;
};

export default CategoryProducts;
