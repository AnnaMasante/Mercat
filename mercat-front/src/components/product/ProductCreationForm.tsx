import ProductForm from './ProductForm';
import { FC } from 'react';

const ProductCreationForm: FC = () => {
  return (
    <>
      <ProductForm updateMode={false} />
    </>
  );
};
export default ProductCreationForm;
