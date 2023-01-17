import {
    ActionIcon,
    Anchor,
    Badge,
    Group,
    Menu,
    ScrollArea,
    Table,
    Text,
} from '@mantine/core';
import { IconDots, IconEdit, IconMan, IconTrash } from '@tabler/icons';

interface UsersTableProps {
    data: {
        name: string;
        role: string;
        email: string;
        phone: string;
    }[];
}

const jobColors: Record<string, string> = {
    admin: 'teal',
    staff: 'red',
    user: 'lime',
};

export default function EmployeeTable({ data }: UsersTableProps) {
    const rows = data.map((item) => (
        <tr key={item.email}>
            <td>
                <Group spacing="sm">
                    <Text
                        size="sm"
                        weight={500}
                    >
                        {item.name}
                    </Text>
                </Group>
            </td>

            <td>
                <Badge
                    color={jobColors[item.role.toLowerCase()]}
                    variant="filled"
                >
                    {item.role}
                </Badge>
            </td>
            <td>
                <Anchor<'a'>
                    size="sm"
                    href="#"
                    onClick={(event) => event.preventDefault()}
                >
                    {item.email}
                </Anchor>
            </td>
            <td>
                <Text
                    size="sm"
                    color="dimmed"
                >
                    {item.phone}
                </Text>
            </td>
            <td>
                <Group
                    spacing={0}
                    position="right"
                >
                    <Menu shadow="md">
                        <Menu.Target>
                            <ActionIcon>
                                <IconDots size={14} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item icon={<IconEdit size={14} />}>
                                Edit
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Label>Danger</Menu.Label>
                            <Menu.Item
                                color="red"
                                icon={<IconTrash size={14} />}
                                onClick={() => {
                                    console.log(item);
                                }}
                            >
                                Terminate Contract
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </td>
        </tr>
    ));

    return (
        <ScrollArea>
            <Table
                sx={{ minWidth: 800 }}
                highlightOnHover
                verticalSpacing="lg"
            >
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}
