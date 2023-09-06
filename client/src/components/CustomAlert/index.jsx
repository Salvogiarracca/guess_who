import {Alert, Container} from "react-bootstrap";
import {BsCheckLg, BsXLg} from 'react-icons/bs'


const customAlert = ({isTrue}) => {
    return (
        <Container
            className={"col-1"}
            style={{
                position: "fixed",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            {
                isTrue?
                    <Alert
                        variant={"success"}
                        style={{
                            height: "100vh",
                        }}
                    >
                        <BsCheckLg/>

                    </Alert> :
                    <Alert
                        variant={"danger"}
                        style={{
                            height: "100vh",
                        }}
                    >
                        <BsXLg/>
                    </Alert>
            }

        </Container>
    )
}

export default customAlert;