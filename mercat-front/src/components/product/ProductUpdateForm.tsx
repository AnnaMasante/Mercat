import ProductForm from './ProductForm';
import { FC } from 'react';
import { Product } from '../../utils/types/Product';
import { useHistory, useParams } from 'react-router-dom';
import { useGet } from '../../utils/hooks/useGet';
import { useEffect } from 'react';
import Loading from "../Loading";
import {log} from "util";

const ProductUpdateForm: FC = () => {

  console.log("updateForm")
  const { id: idProduct } = useParams<{ id: string }>();
  const [product, isPending] = useGet<Product>(`/products/${idProduct}`);
  const history = useHistory();

  useEffect(()=> console.log(product))
  /*useEffect(() => {
    console.log(product,isPending,error)
    if (!isPending && error!==null) {
      history.push('/compte/produits');
    }
  }, [product, isPending, error, history]);*/

  return <>
    {isPending && <Loading></Loading>}
    {product != null && <ProductForm product={product} updateMode={true} />}</>;
};
export default ProductUpdateForm;
