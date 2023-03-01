import { useGet } from '../../utils/hooks/useGet';
import { Product } from '../../utils/types/Product';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';
import ProductGrid from './ProductGrid';
import {useEffect, useState} from "react";

const ResultsProductName = () => {
  let { nameProduct } =
    useParams<{ nameProduct: string}>();
  const [products, isPending] = useGet<Product[]>(
      '/products/' + nameProduct)

  return (
    <>
      {isPending && <Loading />}

      {products &&
      <div className="columns">
        <div className="column is-2"></div>
        <div className="column">
          <ProductGrid products={products}></ProductGrid>
        </div>
        <div className="column is-2"></div>
      </div> }
    </>
  );
};

export default ResultsProductName;
