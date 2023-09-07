import {useProperty} from "./index.hook.js";
import {Col, Dropdown, Row} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

const Property = ({property, checkSelection, disableButtons}) => {
    const { name, values, isDisabled} = useProperty(property);
    return (
        <Col>
            <Row>
                <Dropdown>
                    <DropdownToggle

                        variant={"secondary"}
                        disabled={isDisabled || disableButtons}
                    >
                        {name}
                    </DropdownToggle>
                    <DropdownMenu>
                        {
                            values.map((value, index) => {
                                return (
                                    <DropdownItem
                                        // disabled={disableButtons}
                                        key={index}
                                        onClick={() => {
                                            checkSelection(name, value)
                                        }
                                    }
                                    >
                                        {value}
                                    </DropdownItem>
                                )
                            })
                        }
                    </DropdownMenu>
                </Dropdown>
            </Row>
        </Col>
    )
}

export default Property;