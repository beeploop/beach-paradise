import { Table } from '@mantine/core'

function RoomReservations({ roomReservations }: any) {
    const elements = roomReservations
    const rows = elements.map((element: any) => (
        <tr key={element.bookingId}>
            <td>{element.bookingId}</td>
            <td>{element.roomNumber}</td>
            <td>{element.userId}</td>
            <td>{new Date(element.checkin).toLocaleDateString()}</td>
            <td>{new Date(element.checkout).toLocaleDateString()}</td>
            <td>{element.adults}</td>
            <td>{element.kids}</td>
            <td>{new Date(element.createdAt).toLocaleDateString()}</td>
            <td>{element.price}</td>
        </tr>
    ))

    return (
        <Table withColumnBorders striped>
            <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Room No</th>
                    <th>User ID</th>
                    <th>Checkin</th>
                    <th>Checkout</th>
                    <th>Adults</th>
                    <th>Kids</th>
                    <th>Created At</th>
                    <th>Fee</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )
}

export default RoomReservations
