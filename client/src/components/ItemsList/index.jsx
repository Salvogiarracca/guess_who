import {useItemsList} from "./index.hooks.js";
import {Container, Row} from "react-bootstrap";
import Item from "../Item/index.jsx";

const ItemsList = ({checkEnd, handleClose, handleShow}) => {
    const { items } = useItemsList()
    return (
        <Container>
            <Row md={6} style={{margin: 20}}>
                {
                    items.map((item, index) => {
                        return (
                            <Item
                                item={item}
                                key={index}
                                checkEnd={checkEnd}
                                handleClose={handleClose}
                                handleShow={handleShow}
                            />
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default ItemsList;