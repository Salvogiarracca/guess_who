import {Container, Table} from "react-bootstrap";
import {useStatistics} from "./index.hooks.js";

const Statistics = () => {

    const {games} = useStatistics();

    return (
        <Container
            fluid
            style={{
                marginTop: 20
            }}
        >
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>State</th>
                    <th>Secret Item</th>
                    <th>Difficulty</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {
                    games.map((game, index) => {
                        return (
                            <tr key={index}>
                                <td>{game.id}</td>
                                <td>{game.user}</td>
                                <td>{game.date}</td>
                                <td>{game.state}</td>
                                <td>{game.secret_item}</td>
                                <td>{game.difficulty}</td>
                                <td>{game.score}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </Container>
    )
}

export default Statistics;