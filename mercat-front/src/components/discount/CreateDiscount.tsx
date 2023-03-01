import {Seller} from "../../utils/types/Seller";
import {FC, useEffect, useState} from "react";
import {useGet} from "../../utils/hooks/useGet";
import {Product} from "../../utils/types/Product";
import Loading from "../Loading";
import {Discount} from "../../utils/types/Discount";
import {useForm} from "../../utils/hooks/useForm";
import {useAxios} from "../../utils/hooks/useAxios";
import InputDate from "../form/InputDate";
import InputHour from "../form/InputHour";
import FormInput from "../form/FormInput";
import DropdownMenuFormDiscount from "../form/DropdownMenuFormDiscount";
import {AxiosError} from "axios";

const CreateDiscount : FC<{seller : Seller}> = ({seller}) =>{

    const [discount, setDiscount] = useState<string>("")
    const products = seller.products
    const axios = useAxios()
    const [checkedState, setCheckedState] = useState<boolean[]>([])
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    const [error, setError] = useState<string|null>(null)
    const tab : string[] = ["Pourcentage", "Réduction fixe"]

    const handleOnChange = (position : number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        )
        setCheckedState(updatedCheckedState)
        const teProducts : Product[] = []
        updatedCheckedState.map((currentState, index) =>{
            if(currentState === true){
                if (products) {
                    teProducts.push(products[index])
                }
            }
        })
        setSelectedProducts(teProducts)
    }


    const initialState : Record<string, any> = {
        ending : null,
        beginning : null,
        percentage : -1,
        fixed_discount : -1,
        validation : ""
    }

    const validateForm = (values : Record<string, any>) =>{
        let formErrors : Record<string, string> = {}
        if(values.ending < Date.now()){
            formErrors.ending = "Cette date de fin est invalide"
        }
        if(values.beginning < Date.now()){
            formErrors.beginning = "Cette date de début est invalide"
        }
        if(values.beginning > values.ending){
            formErrors.ending = "Dates incorrectes"
        }
        if(values.discount === -1){
            formErrors.discount = "Remplir le champ"
        }
        if(values.typeDiscount !== "Pourcentage" && values.typeDiscount !== "Réduction fixe"){
            formErrors.typeDiscount = "Le type de la promotion est incorrect"
        }
        return formErrors
    }
    const createDiscount = async () => {
        const endingDate = new Date(values.ending+" "+ values.ending_hour)
        const beginningDate = new Date(values.beginning+" "+ values.beginning_hour)
        const newDiscount : Discount = {
            ending : endingDate,
            beginning : beginningDate,
            discount : values.discount,
            typeDiscount : values.typeDiscount
        }
        console.log(newDiscount)
         selectedProducts.map((product) => {
             axios
                 .patch(`products/${product._id}`, {discounts: [...product.discounts!,newDiscount]})
                 .then((res)=> {
                     values.ending = null
                     values.beginning = null
                     values.percentage = -1
                     values.fixed_discount = -1
                     setError("Vous avez ajouté votre promotion !")
                 })
                 .catch((err : AxiosError) =>{
                     if(err.response?.status === 403){
                         setError("Il y a déjà une promotion à cette période, modifiez la date")
                     }else{
                         setError("Problème lors de l'ajout de la promotion, veuillez recommencer")
                     }
                 })
         })
    }

    const {onChange, onSubmit, errors, values} = useForm(
        createDiscount,
        initialState,
        validateForm,
    )

    useEffect(()=> {
        if(products){
            const p = new Array<boolean>(products.length).fill(false)
            setCheckedState(p)
        }
    },[products] )

    return(
        <>
            {products &&
            <>
                <div className="box">
                    <h4 className="subtitle is-5">Créer une promotion</h4>
                    <div className="columns">
                        <div className="column">
                            <InputDate
                                value={values.beginning}
                                title="Date de début"
                                name="beginning"
                                onChange={onChange}
                                error={errors.beginning}
                            ></InputDate>
                        </div>
                        <div className="column">
                            <InputHour
                                value={values.beginning_hour}
                                title="Heure de début"
                                name="beginning_hour"
                                onChange={onChange}
                                error={errors.beginning_hour}
                            >
                            </InputHour>
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column">
                            <InputDate
                                value={values.ending}
                                title="Date de fin"
                                name="ending"
                                onChange={onChange}
                                error={errors.ending}
                            ></InputDate>
                        </div>
                        <div className="column">
                            <InputHour
                                value={values.ending_hour}
                                title="Heure de fin"
                                name="ending_hour"
                                onChange={onChange}
                                error={errors.ending_hour}
                            >
                            </InputHour>
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column">
                            <DropdownMenuFormDiscount value={values.typeDiscount} error={errors.type} onChange={onChange} name="typeDiscount" title="Type de promotion" tab={tab} discount={discount} setDiscount={setDiscount} ></DropdownMenuFormDiscount>
                        </div>

                        {discount && discount === "Pourcentage" && <div className="column">
                            <FormInput value={values.discount} title={"Le pourcentage de la remise"}
                                       typeDiscount={values.typeDiscount} name="discount" onChange={onChange}
                                       error={errors.discount}></FormInput>
                        </div>
                        }
                            {discount && discount === "Réduction fixe" &&
                            <div className="column">
                            <FormInput value={values.discount} title={"Le montant de la remise"} typeDiscount={values.typeDiscount} name="discount" onChange={onChange} error={errors.discount} ></FormInput>
                        </div> }
                    </div>

                <p>Sélectionnez tous les produits auquels vous souhaitez appliquer une promotion</p>

                    <div className="columns">
                        <div className="column">
                            {products.map((product,index) => {
                                return <label className="checkbox">
                                    <div className="box">
                                        <input
                                            type="checkbox"
                                            name={product.name}
                                            value={product.name}
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
                                        /> {product.name}
                                        <figure className="image is-128x128">
                                            <img src={product.images[0]} alt={`product-image-${product._id}`} />
                                        </figure>
                                    </div>

                                </label>
                            })}
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <button className="button is-black" onClick={onSubmit}>Créer une promotion</button>
                            {error &&
                            <div className="notification is-danger">
                                <button className="delete" onClick={() => setError(null)}></button>
                                {error}
                            </div>}
                        </div>
                    </div>
                </div>
            </>}

        </>

    )
}
export default CreateDiscount
