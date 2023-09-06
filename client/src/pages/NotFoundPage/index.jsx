import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

function PageNotFound() {
    return (
        <Container fluid>
            <h1>
                PAGE NOT FOUND
            </h1>
            <h2>
                The requested page does not exist, please go back to the <Link to={"/"}>app</Link>
            </h2>
        </Container>
    );
}

export { PageNotFound };