import {useGet} from "../../utils/hooks/useGet";
import {Product} from "../../utils/types/Product";
import {Seller} from "../../utils/types/Seller";
import {FC, useEffect, useState} from "react";
import Loading from "../Loading";
import ProductGrid from "../product/ProductGrid";
import {Discount} from "../../utils/types/Discount";

const Discounts : FC<{seller : Seller}> = ({seller}) => {

    const [discountedProducts, isPending] = useGet<Product[]>(`/products/${seller._id}/discounts`)
    const [discounts, setDiscounts] = useState<Discount[]>([])
    const date : Date = new Date()

    const seeDiscounts = () => {
        const discounts : Discount[] = []
        discountedProducts?.map((discountedProduct) => {
            discountedProduct.discounts?.map((discount) => {
                if(!discounts.includes(discount)){
                    discounts.push(discount)
                }
            })
        })
        setDiscounts(discounts)
    }

    const seeProductsFromDiscount = (discount : Discount) => {
        const products : Product[] = []
        discountedProducts?.map((product) => {
            if(product.discounts?.includes(discount)){
                products.push(product)
            }
        })
        return products
    }


    useEffect(() => {
        if(discountedProducts){
            /*setOnGoingDiscounts(onGoingDiscountedProducts)
            setPassedDiscounts(passedDiscountedProducts)
            setFutureDiscounts(futureDiscountedProducts(discountedProducts))*/
            seeDiscounts()
        }
    }, [ discountedProducts ])

    return(
        <>
            <div className="box">
                <h5 className="subtitle is-5">Voir mes promotions</h5>
                {isPending && <Loading></Loading>}
                {/*discountedProducts !== null && discountedProducts.length===0 ?(<p>Vous n'avez pas de promotions</p>) : (<>
                    <ProductGrid products={discountedProducts!}></ProductGrid>
                </>)
                */}

                <h6 className="subtitle is-6">En cours : </h6>
                <div className="columns">
                    <div className="box">
                        {discounts.map((discount)=> {
                            if(discount.beginning<date && discount.ending>date){
                                return <div className="box">
                                    <p>Date de début : {discount.beginning}</p>
                                    <p>Date de fin : {discount.ending}</p>
                                    <p>Type : {discount.typeDiscount}</p>
                                    <p>Valeur : {discount.discount}</p>
                                    <p>Produits concernés : {
                                        seeProductsFromDiscount(discount).map((p) =>
                                            <p>{p.name}</p>
                                        )}
                                    </p>
                                </div>

                            }})}
                    </div>

                </div>

                <h6 className="subtitle is-6">A venir</h6>
                <div className="columns">
                    <div className="box">
                        {discounts.map((discount)=> {
                            if(new Date(discount.beginning)>date){
                                return <div className="box">
                                    <p>Date de début : {discount.beginning}</p>
                                    <p>Date de fin : {discount.ending}</p>
                                    <p>Type : {discount.typeDiscount}</p>
                                    <p>Valeur : {discount.discount}</p>
                                    <p>Produits concernés : {
                                        seeProductsFromDiscount(discount).map((p) =>
                                            <p>{p.name}</p>
                                        )}
                                    </p>
                                </div>

                            }})}
                    </div>
                </div>

                <h6 className="subtitle is-6">Passées</h6>
                <div className="columns">
                    <div className="box">
                        {discounts.map((discount)=> {
                            if(discount.ending<date){
                                return <div className="box">
                                    <p>Date de début : {discount.beginning}</p>
                                    <p>Date de fin : {discount.ending}</p>
                                    <p>Type : {discount.typeDiscount}</p>
                                    <p>Valeur : {discount.discount}</p>
                                    <p>Produits concernés : {
                                        seeProductsFromDiscount(discount).map((p) =>
                                            <p>{p.name}</p>
                                        )}
                                    </p>
                                </div>

                            }})}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Discounts
