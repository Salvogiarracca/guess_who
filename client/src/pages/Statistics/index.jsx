import {Container, Table} from "react-bootstrap";
import {useStatistics} from "./index.hooks.js";

const Statistics = ({setShowStats}) => {

    const {games, totScore} = useStatistics(setShowStats);

    return (
        <Container>
            <Container
                fluid
                style={{
                    marginTop: 20
                }}
            >
                <Table
                    striped
                    bordered={false}
                    hover
                    variant="dark"
                >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Date</th>
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
                                    <td>{game.secret_item}</td>
                                    <td>{game.difficulty}</td>
                                    <td>{game.score}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    <tfoot>
                        <tr style={{
                            borderBottom: 0
                        }}
                        >
                            <td
                                colSpan={4}
                                style={{
                                    backgroundColor: "white"
                                }}
                            >
                            </td>
                            <td
                                style={{
                                    textAlign: "start"
                                }}
                            >
                                Total Score
                            </td>
                            <td>{totScore}</td>
                        </tr>
                    </tfoot>
                </Table>
            </Container>
        </Container>
    )
}

export default Statistics;