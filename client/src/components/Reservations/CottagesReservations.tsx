import { Table } from '@mantine/core'

function CottagesReservations({ cottageReservations }: any) {
    const elements = cottageReservations
    const rows = elements.map((element: any) => (
        <tr key={element.bookingId}>
            <td>{element.bookingId}</td>
            <td>{element.cottageName}</td>
            <td>{element.userId}</td>
            <td>{new Date(element.createdAt).toLocaleDateString()}</td>
            <td>{new Date(element.checkin).toLocaleDateString()}</td>
            <td>{new Date(element.checkout).toLocaleDateString()}</td>
            <td>{element.price}</td>
        </tr>
    ))

    return (
        <Table withColumnBorders striped>
            <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Cottage</th>
                    <th>User ID</th>
                    <th>Created At</th>
                    <th>Checkin</th>
                    <th>Checkout</th>
                    <th>Fee</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )
}

export default CottagesReservations
