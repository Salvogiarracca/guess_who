import {useFormPassword} from "./index.hooks.js";
import {Controller} from "react-hook-form";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export const FormPassword = (({name, ...props}) => {
    const {control, errors} = useFormPassword();
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
                            placeholder={'Password'}
                            name={name}
                            {...props}
                            value={value}
                            onChange={ev => onChange(ev.target.value)}
                        />
                        {/*<FormControl.Feedback>*/}
                        {/*    {errors.root?.message}*/}
                        {/*</FormControl.Feedback>*/}
                    </FormGroup>
                )
            }}
        />
    )
});