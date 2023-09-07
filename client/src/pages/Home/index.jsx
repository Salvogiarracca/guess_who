import {Button, Container} from "react-bootstrap";
import {useHome} from "./index.hooks.js";

const Home = ({setShowStats}) => {
    const {
        modalities,
        handleDifficulty
    } = useHome(setShowStats);

    return (
        <>
            <Container
                fluid
                className={'justify-content-center align-items-center'}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
                <Container
                    className={'text-center'}
                >
                    <h1>
                        Ready to play?
                    </h1>
                </Container>
                <Container
                    className={'text-center mt-5'}
                >
                    <h2>
                        Select a difficulty
                    </h2>
                </Container>
                <Container
                    fluid
                    style={{textAlign: "center"}}
                >
                    {
                        modalities.map((mode, index) => {
                            return (
                                <Button

                                    className={"m-5"}
                                    variant={"secondary"}
                                    key={index}
                                    style={{
                                        width: '200px',
                                        transition: 'transform 0.3s',
                                        transform: 'scale(1)',
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = 'scale(1.2)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = 'scale(1)';
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleDifficulty(mode)
                                    }}
                                >
                                    {mode}
                                </Button>
                            )
                        })
                    }
                </Container>
            </Container>
        </>
    )
}

export default Home;