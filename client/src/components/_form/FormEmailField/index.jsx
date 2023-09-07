import {useFormEmailField} from "./index.hooks.js";
import {Controller} from "react-hook-form";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

const FormEmailField = ({name, ...props}) => {
    const {control, errors} = useFormEmailField();
    return (
        <Controller
            control={control}
            name={name}
            render={({field: {onChange, value, name}}) => {
                return (
                    <FormGroup>
                        <FormLabel>
                            {props.label}
                        </FormLabel>
                        <FormControl
                            placeholder={'Email'}
                            name={name}
                            {...props}
                            value={value}
                            onChange={ev => onChange(ev.target.value)}
                            isInvalid={errors[name]}
                        />
                        <FormControl.Feedback>
                            {errors[name].message}
                        </FormControl.Feedback>
                    </FormGroup>

                )
            }}
        />
    )
}

export default FormEmailField;