import {FC, useState} from "react";
import {BsEyeSlash, BsFillEyeSlashFill} from "react-icons/all"

const PasswordInput : FC <{
    title : string
    value: string;
    name : string;
    onChange: (event : any) => void;
    error? : string | null;
}> = ({title, value, name, onChange, error }) => {

    const [byDefault, setByDefault] = useState('password')
    const [show, setShow] = useState(false)

    const hiddenInput = () => {
        console.log("YOUPI")
        if(byDefault === 'password'){
            setByDefault('text')
            setShow(true)
        }else{
            setByDefault('password')
            setShow(false)
        }
    }

    return (
        <div className="field">
            <label className="label">{title}</label>
            <div className="field has-addons">
                <div className="control">
                    <input
                        className="input"
                        name={name}
                        value={value}
                        onChange={onChange}
                        type="password"
                    />
                    <button className="button">
                    <span className="icon is-small is-right" onClick={hiddenInput}>
                    {
                        show ? (
                            <BsFillEyeSlashFill />
                        ) : (<BsEyeSlash /> )
                    }
                    </span>
                    </button>
                </div>
                {error && <p className="help is-danger">{error}</p> }
            </div>
        </div>
    )
}

export default PasswordInput
