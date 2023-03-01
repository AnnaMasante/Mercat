import {FC} from "react";

const InputHour : FC <{
    value: string,
    name : string,
    title : string,
    onChange : (event : any) => void,
    error?: string|null
}> = ({value, name, title, onChange, error}) =>{
    return(
        <div className="field">
            <label className="label">{title}</label>
            <p className="control">
                <input
                    className="input"
                    type="time"
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </p>
            {error && <p className="help is-danger">{error}</p>}
        </div>
    )
}
export default InputHour
