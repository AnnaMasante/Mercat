import {FC} from "react";

const RadioForm : FC<{
    option1 : string,
    option2 : string,
    name : string,
    isPercentage : boolean,
    setIsPercentage : React.Dispatch<boolean>
    error? : string|null,
    title : string,
    onChange: (event :any)=> void}> =({
                                          option1,
                                          option2,
                                          name,
                                          isPercentage,
                                          setIsPercentage,
                                          error,
                                          title,
                                          onChange,

                                      }) => {

    const handleModification = (valueRadio : string) => {
        if(valueRadio ==="pourcentage"){
            setIsPercentage(true)
        }else{
            setIsPercentage(false)
        }
    }

    return(
        <>
            <label className="label">{title}</label>
            <input type="radio" value={option1} name="discount"/> Pourcentage
        </>
    )
}
export default RadioForm
