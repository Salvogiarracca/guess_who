import MyNavBar from "../../components/NavBar/index.jsx";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <MyNavBar/>
            <Container fluid>
                <Outlet/>
            </Container>
        </>
    )
}
export default Layout;