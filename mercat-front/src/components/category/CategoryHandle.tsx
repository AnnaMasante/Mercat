import {Category} from "../../utils/types/Category";
import {useEffect, useState} from "react";
import InputForm from "../form/InputForm";
import CategoryRow from "./CategoryRow";
import {AxiosError, AxiosResponse} from "axios";
import {useAxios} from "../../utils/hooks/useAxios";
import {useGet} from "../../utils/hooks/useGet";
import {useForm} from "../../utils/hooks/useForm";

const CategoryHandle = () => {

    const axios = useAxios()
    const [ categories, isPending, error, setCategories] = useGet<Category[]>("/categories")

    const createCategory = async () => {
        console.log((values.label))
        const newCategory: Category = {
            label:values.label,
        }
        axios
            .post('/categories', newCategory)
            .then((res : AxiosResponse) => console.log(res))
            .catch((err : AxiosError) => console.log(err.message))
        if (categories!=null){
            categories.push(newCategory)
            console.log("Nouvelle catégorie "+categories[0].label)
            setCategories(categories)
        }else{
            const data : Category[] = []
            data.push(newCategory)
            setCategories(data)
        }
        values.label=''
    }

    const initialState: Record<string, any> = {
        label: '',
    }

    const validateForm = (values : Record<string, any>) => {
        let errors: Record<string, string> = {}
        console.log(values)
        if(values.label.trim().length === 0){
            errors.label = 'the category name must not be empty'
        }
        return errors
    }

    const {onChange, onSubmit, errors, values} = useForm(
        createCategory,
        initialState,
        validateForm
    )


    const handleDelete = () => {
        console.log("Attention")
    }

    useEffect( () => {
        console.log(values)
    }, [values])

    return (
        <>
            <div className="columns">
                <div className="column">
                    <InputForm
                        value={values.label}
                        onChange={onChange}
                        name="label"
                        title="Ajouter une catégorie"
                        error={errors.label}
                        placeholder="Votre catégorie ici">
                    </InputForm>
                </div>
                <div className="column">
                    <button className="button is-black" onClick={onSubmit}>Ajouter</button>
                </div>
            </div>
            <div className="columns">
                {categories &&
                categories.map((category,index) =>
                    <CategoryRow key={index} category={category}  onDelete={handleDelete} categories={categories} setCategory={setCategories}></CategoryRow>)
                }
            </div>
        </>
    )
}
export default CategoryHandle
