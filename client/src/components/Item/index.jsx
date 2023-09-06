import {useItem} from "./index.hooks.js";
import {Col, Container, Figure, Image, Row} from "react-bootstrap";
import {useContext} from "react";
import GameContext from "../../contexts/gameContext.js";
import FigureImage from "react-bootstrap/FigureImage";
import FigureCaption from "react-bootstrap/FigureCaption";


const Item = ({item, checkEnd, handleClose, handleShow}) => {
    const {name, image_name, sex, skin, job, alive, glasses, eyes, hair, beard, navigate} = useItem(item);
    const {setGuess} = useContext(GameContext);
    return (
        <Col>
            {/*style={{justifyContent: "center", marginTop: 20}}*/}
            <Row>
                <Container style={{alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                    <Figure>
                        <FigureImage
                            className={"rounded-4"}
                            src={`http://localhost:3000/static/imgs/${image_name}.png`}
                            style={{
                                flexShrink: 1,
                                margin: 15,
                                width: '150px',
                                transition: 'transform 0.3s',
                                transform: 'scale(1)'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'scale(1.2)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'scale(1)';
                            }}
                            onClick={()=> {
                                setGuess(name)
                                handleShow()
                            }}
                        />
                        <FigureCaption
                            className={"font-monospace text-center"}
                            style={{fontSize: '20px'}}
                        >
                            {name}
                        </FigureCaption>
                    </Figure>
                </Container>
            </Row>
        </Col>
    );
};

export default Item;