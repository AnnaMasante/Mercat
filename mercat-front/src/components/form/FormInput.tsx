import {FC} from "react";
import {type} from "os";

const FormInput: FC<{
    value : string,
    name : string,
    typeDiscount? : string,
    onChange: (event : any) => void,
    error? : string | null,
    title : string
}> = ({value, title, typeDiscount, name, onChange, error}) => {

    return(
        <>

            <div className="field">
                <label className="label">{title}</label>
                <p className="control">
                    <input
                        className="input"
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                </p>
                {error && <p className="help is-danger">{error}</p>}
            </div>


        </>

    )
}
export default FormInput



