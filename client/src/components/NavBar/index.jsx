import {Button, Container, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import {useNavBar} from "./index.hooks.js";
import DropdownItem from "react-bootstrap/DropdownItem";

const MyNavBar = () => {
    const {navigate, handleLogout, user} = useNavBar();
    return (
        <>
            <Navbar bg={"dark"} data-bs-theme={"dark"} className={"fixed-top"} sticky={"top"}>
                <Container fluid>
                    <NavbarBrand className={'m-0'} onClick={()=> navigate("/")}>Guess Who?</NavbarBrand>
                </Container>
                <Container className={'justify-content-center'}>
                    <Navbar.Text>
                        {
                            user && `Logged In as: ${user.name}`
                        }
                        {/*logged in as: {user && user.name}*/}
                    </Navbar.Text>
                </Container>

                <Container fluid className={"justify-content-end"}>
                    {user ? (
                        // <Button
                        //     variant={"danger"}
                        //     onClick={handleLogout}
                        // >
                        //     Logout
                        // </Button>
                        <NavDropdown
                            className={'dropstart'}
                            title={"Menu"}
                            style={{
                                color: "white",
                        }}
                        >
                            <NavDropdown.Item
                                style={{right: "10%"}}
                                onClick={()=>navigate("/stats")}
                            >
                                Statistics
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={()=>handleLogout()}
                            >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Button
                            variant={"primary"}
                            onClick={()=>navigate("/login")}
                        >
                            Login
                        </Button>
                    )}
                </Container>
            </Navbar>
        </>
    );
};
export default MyNavBar;