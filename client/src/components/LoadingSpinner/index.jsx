import {Container, Spinner} from "react-bootstrap";

const LoadingSpinner = () => {
    return(
        <Container fluid>
            <Spinner animation={"grow"}/>
        </Container>
    )
}

export default LoadingSpinner;