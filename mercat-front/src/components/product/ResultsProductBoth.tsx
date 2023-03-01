import { useGet } from '../../utils/hooks/useGet';
import { Product } from '../../utils/types/Product';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';
import ProductGrid from './ProductGrid';
import {useEffect, useState} from "react";

const ResultsProductName = () => {
    let { nameProduct, city } =
        useParams<{ nameProduct: string, city : string}>();

    const [products, isPending] = useGet<Product[]>(
        '/products/' + nameProduct + "/"+city)

    return (
        <>
            {isPending && <Loading />}
            {products && <ProductGrid products={products} />}
        </>
    );
};

export default ResultsProductName;
