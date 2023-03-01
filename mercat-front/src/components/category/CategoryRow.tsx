import {Category} from "../../utils/types/Category";
import {FC} from "react";
import {TiDelete} from "react-icons/ti";
import "../../css/button.css"
import {useAxios} from "../../utils/hooks/useAxios";

const CategoryRow: FC<{category: Category,categories: Category[], onDelete: (category: Category) => void, setCategory: (categories : Category[]) => any}> = ({category,categories, onDelete, setCategory}) => {

    const axios = useAxios()
    console.log(categories)
    function deleteCategory(label : string){
        axios
            .delete(`/categories/${label}`)
            .then((res) => {
                console.log(res)
                onDelete(category)
            })
            .catch((err)=>
                console.log(err))
        const data = categories.filter(category => category.label !== label)
        setCategory(data)
    }

    return (
        <>
            {category &&
            <div className="box">
                <p>{category.label}</p>
                <button className="button is-large" id="is_circular">
                    <span className="icon is-medium">
                        <TiDelete color="red" onClick={() => deleteCategory(category.label)}></TiDelete>
                    </span>
                </button>
            </div>

            }
        </>
    )
}
export default CategoryRow
