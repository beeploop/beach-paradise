import {
    ActionIcon,
    createStyles,
    Menu,
    ScrollArea,
    Table,
} from '@mantine/core';
import { IconPencil, IconTableOptions, IconTrashX } from '@tabler/icons';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[3]
                    : theme.colors.gray[2]
            }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));

type TReservation = {
    bookingId: string;
    roomNumber: string;
    cottageName: string;
    userId: string;
    checkin: string;
    checkout: string;
    adults: string;
    kids: string;
    price: string;
    createdAt: string;
};
interface TableScrollAreaProps {
    data: TReservation[];
}

export default function RoomsReservation({ data }: TableScrollAreaProps) {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const rows = data.map((row) => (
        <tr key={row.bookingId}>
            <td>{row.bookingId}</td>
            <td>{row.roomNumber}</td>
            <td>{row.userId}</td>
            <td>{new Date(row.checkin).toLocaleDateString()}</td>
            <td>{new Date(row.checkout).toLocaleDateString()}</td>
            <td>{row.price}</td>
            <td>{new Date(row.createdAt).toLocaleDateString()}</td>
            <td>
                <Menu>
                    <Menu.Target>
                        <ActionIcon>
                            <IconTableOptions />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item icon={<IconPencil size={14} />}>
                            Reschedule
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Label>Danger</Menu.Label>
                        <Menu.Item
                            icon={<IconTrashX size={14} />}
                            color="red"
                        >
                            Cancel
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </td>
        </tr>
    ));

    return (
        <ScrollArea
            sx={{ height: 300 }}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
            <Table sx={{ minWidth: 700 }}>
                <thead
                    className={cx(classes.header, {
                        [classes.scrolled]: scrolled,
                    })}
                >
                    <tr>
                        <th>Booking ID</th>
                        <th>Room Number</th>
                        <th>User ID</th>
                        <th>Checkin</th>
                        <th>Checkout</th>
                        <th>Estimated Fee</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}
