import {FC} from "react";

const InputDate : FC <{
    value : string;
    title : string;
    name : string;
    onChange: (event: any) => void;
    error? : string| null;
}> = ({value, name,title, onChange,error}) =>{

    return(
        <div className="field">
            <label className="label">{title}</label>
            <p className="control">
                <input
                    type="date"
                    className="input"
                    name={name}
                    value={value}
                    onChange={onChange}
                ></input>
            </p>
            {error && <p className="help is-danger">{error}</p>}
        </div>
    )
}
export default InputDate
