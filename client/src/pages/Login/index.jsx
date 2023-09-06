import useLogin from "./index.hooks.js";
import {Button, Container, Form} from "react-bootstrap";
import {FormProvider} from "react-hook-form";
import FormEmailField from "../../components/_form/FormEmailField/index.jsx";
import {FormPassword} from "../../components/_form/FormPassword/index.jsx";
import {Link} from "react-router-dom";

const Login = setUser => {
    const {formData, onSubmit} = useLogin(setUser);

    return (
        <Container>
            <FormProvider {...formData}>
                <Form onSubmit={onSubmit}>
                    <FormEmailField
                        name={"username"}
                        label={"Email"}
                    />
                    <FormPassword
                        name={"password"}
                        label={"Password"}
                    />
                    <Button
                        type='submit'
                        variant='secondary'
                    >
                        Login
                    </Button>
                    <Link to={"/"}>
                        <Button
                            variant={"danger"}
                        >
                            Cancel
                        </Button>
                    </Link>
                </Form>
            </FormProvider>
        </Container>
    )
}

export default Login;