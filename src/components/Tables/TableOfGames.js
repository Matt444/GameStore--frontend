import { Table } from "react-bootstrap";

export const TableOfGames = ({ order }) => (
    <Table responsive>
        <thead>
            <tr>
                <th className="no-border-top">Gra</th>
                <th className="no-border-top" style={{ width: "140px" }}>
                    Cena
                </th>
            </tr>
        </thead>
        <tbody>
            {order.games.map((game) => (
                <tr key={game.id}>
                    <td>
                        {game.name} {game.key && `- ${game.key}`}
                    </td>
                    <td>{game.price} zł</td>
                </tr>
            ))}
        </tbody>
    </Table>
);
