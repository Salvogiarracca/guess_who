import {Button, Container, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import {useNavBar} from "./index.hooks.js";
import {Link} from "react-router-dom";

const MyNavBar = () => {
    const {navigate, handleLogout, user, showStats} = useNavBar();
    return (
        <>
            <Navbar bg={"dark"} data-bs-theme={"dark"} className={"fixed-top"} sticky={"top"}>
                <Container fluid>
                    <NavbarBrand className={'m-0'} onClick={()=> navigate("/")}>
                        <Link
                            to={"/"}
                            style={{
                                color: "white",
                                textDecoration: "none",
                                fontSize: 22
                            }}
                        >
                            Guess Who?
                        </Link>
                    </NavbarBrand>
                </Container>
                <Container className={'justify-content-center'}>
                    <Navbar.Text>
                        {
                            user && `Logged In as: ${user.name}`
                        }
                    </Navbar.Text>
                </Container>

                <Container fluid className={"justify-content-end"}>
                    {user ? (
                        <NavDropdown
                            className={'dropstart'}
                            title={"Menu"}
                            style={{
                                color: "white",
                        }}
                        >
                            {
                                !showStats?
                                    <NavDropdown.Item
                                        style={{right: "10%"}}
                                        onClick={()=>{
                                            navigate("/");
                                        }}
                                    >
                                        Home
                                    </NavDropdown.Item>:
                                    <NavDropdown.Item
                                        style={{right: "10%"}}
                                        onClick={()=> {
                                            navigate("/stats")
                                        }}
                                    >
                                        Statistics
                                    </NavDropdown.Item>

                            }

                            <NavDropdown.Item
                                onClick={()=> {
                                    handleLogout()
                                    navigate("/")
                                }}
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