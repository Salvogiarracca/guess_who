import useLogin from "./index.hooks.js";
import {Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

const Login = setUser => {
    const {
        register,
        handleSubmit,
        errors,
        dirtyFields,
        onSubmit,
        navigate
    } = useLogin(setUser)

    return (
        <Container
            style={{
                marginTop: 20
            }}
        >
            <Form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <FormGroup className={"mb-3"}>
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        {...register("email")}
                        type={"email"}
                        placeholder={"Email"}
                        isInvalid={errors.email || errors.root?.serverError}
                        isValid={!errors.email && !errors.root?.serverError && dirtyFields.email}
                    />
                    <FormControl.Feedback
                        type="invalid"
                    >
                        {errors.root?.serverError.message
                            ? errors.root.serverError.message
                            : errors.email?.message}
                    </FormControl.Feedback>
                </FormGroup>
                <FormGroup
                    style={{
                        marginTop: 20
                    }}
                >
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        {...register("password")}
                        type={"password"}
                        placeholder={"Password"}
                        isInvalid={errors.password || errors.root?.serverError}
                        isValid={!errors.password && !errors.root?.serverError && dirtyFields.password}
                    />
                    <FormControl.Feedback
                        type="invalid"
                    >
                        {errors.password?.message}
                    </FormControl.Feedback>
                </FormGroup>
                <Button
                    variant={"primary"}
                    type={"submit"}
                    style={{
                        marginTop: 20
                    }}
                >
                    Submit
                </Button>
                <Button
                    style={{
                        marginTop: 20,
                        marginLeft: 20
                    }}
                    variant={"secondary"}
                    type={"button"}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Cancel
                </Button>
            </Form>
        </Container>
    )
}

export default Login;