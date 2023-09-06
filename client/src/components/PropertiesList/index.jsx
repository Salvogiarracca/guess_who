import {usePropertiesList} from "./index.hook.js";
import {Container, Row} from "react-bootstrap";
import Property from "../Property/index.jsx";

const PropertiesList = ({checkSelection}) => {
    const {properties} = usePropertiesList();

    return (
        <Container
            fluid
            style={{
                position: 'fixed',
                bottom: '1%',
                left: '0',
                right: '0',
            }}

        >
            <Row md={"auto"} className={"justify-content-center"}>
            {
                properties.map((prop, index) => {
                    return (
                        <Property
                            key={index}
                            property={prop}
                            checkSelection={checkSelection}
                        />
                    )
                })
            }
            </Row>
        </Container>
    )
}
export default PropertiesList;