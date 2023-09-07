import {useGame} from "./index.hooks.js";
import ItemsList from "../../components/ItemsList/index.jsx";
import PropertiesList from "../../components/PropertiesList/index.jsx";
import {
    Alert,
    Button,
    Col,
    Container,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    Row
} from "react-bootstrap";
import LoadingSpinner from "../../components/LoadingSpinner/index.jsx";
import CustomAlert from "../../components/CustomAlert/index.jsx";

const Game = () => {
    const {
        difficulty,
        items,
        setItems,
        properties,
        setProperties,
        checkSelection,
        checkEnd,
        handleClose,
        handleShow,
        show,
        guess,
        setGuess,
        isLoading,
        isPlaying,
        setIsPlaying,
        start,
        showAlert,
        isTrue,
        finish,
        finishedGame,
        navigate,
        disableButtons
    } = useGame();

    return (
        <>
            {
                isPlaying ?
                    <>
                        <Modal
                            show={show}
                            onHide={handleClose}
                            animation={true}
                            centered
                        >
                            <ModalHeader>
                                <ModalTitle>
                                    {guess}
                                </ModalTitle>
                            </ModalHeader>
                            <ModalBody>
                                Do you want to confirm your selection?
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    onClick={() => {
                                        setGuess("");
                                        handleClose()
                                    }}
                                >
                                    Back
                                </Button>
                                <Button onClick={() => {
                                    handleClose()
                                    checkEnd()
                                }}
                                >
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </Modal>

                        {
                            isLoading ?
                                <LoadingSpinner/> :
                                <Row
                                    // style={{alignItems: "center", justifyContent: "center"}}
                                >
                                    <Col
                                        style={{
                                            margin: "inherit"
                                        }}
                                        // className={'align-items-center justify-content-center text-center'}
                                        // style={{alignItems:"center", justifyContent:"center", textAlign:"center"}}
                                    >
                                        {
                                            showAlert &&
                                            <div>
                                                <CustomAlert isTrue={isTrue} pos={"start"}/>
                                            </div>
                                        }


                                    </Col>
                                    <Col
                                        className={"col-10"}
                                    >
                                        {
                                            finish ?
                                                <Container
                                                    style={{
                                                        textAlign: "center",
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)'
                                                    }}
                                                >
                                                    <Alert>
                                                        <Row>
                                                            <Container
                                                                fluid
                                                                style={{
                                                                    fontSize: 80
                                                                }}
                                                            >
                                                                YOU {finish}
                                                            </Container>
                                                        </Row>
                                                        <Row style={{fontSize: 20}}>
                                                            <Col style={{fontStyle:""}}>
                                                                Secret Item: {finishedGame.secret_item}
                                                            </Col>
                                                            <Col>
                                                                Selected Item: {guess}
                                                            </Col>
                                                        </Row>
                                                        <Row style={{fontSize: 40}}>
                                                            <Container>
                                                                Score: {finishedGame.score}
                                                            </Container>

                                                        </Row>




                                                    </Alert>
                                                    <Button
                                                        variant={"secondary"}
                                                        onClick={()=> navigate("/")}
                                                    >
                                                        New Game
                                                    </Button>
                                                </Container>
                                                :
                                                <>
                                                    <ItemsList
                                                        difficulty={difficulty}
                                                        items={items}
                                                        setItems={setItems}
                                                        checkEnd={checkEnd}
                                                        handleClose={handleClose}
                                                        handleShow={handleShow}
                                                    />
                                                    <PropertiesList
                                                        checkSelection={checkSelection}
                                                        properties={properties}
                                                        setProperties={setProperties}
                                                        disabledButtons={disableButtons}
                                                    />
                                                </>
                                        }

                                    </Col>
                                    <Col>
                                        {
                                            showAlert &&
                                            <div>
                                                <CustomAlert isTrue={isTrue} pos={"end"}/>
                                            </div>
                                        }
                                    </Col>
                                </Row>

                            //{/*</Container>*/}
                        }
                    </> :
                    <Container
                        fluid
                        className={'justify-content-center align-items-center text-center'}
                        style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
                    >
                        <Button
                            style={{
                                width: '200px',
                                height: '50px',
                                transition: 'transform 0.3s',
                                transform: 'scale(1)',
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'scale(1.2)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'scale(1)';
                            }}
                            variant={"secondary"}
                            onClick={() => {
                                setIsPlaying(true)
                                start()
                            }}
                        >
                            Start Game
                        </Button>
                    </Container>

            }
        </>
    )
}
export default Game;