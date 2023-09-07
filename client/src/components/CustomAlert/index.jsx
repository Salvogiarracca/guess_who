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
                        className={"d-flex align-items-center justify-content-center"}
                        variant={"success"}
                        style={{
                            height: "100vh",
                        }}
                    >
                        <BsCheckLg style={{fontSize: 50}}/>

                    </Alert> :
                    <Alert
                        className={"d-flex align-items-center justify-content-center"}
                        variant={"danger"}
                        style={{
                            height: "100vh",
                        }}
                    >
                        <BsXLg style={{fontSize: 50}}/>
                    </Alert>
            }

        </Container>
    )
}

export default customAlert;