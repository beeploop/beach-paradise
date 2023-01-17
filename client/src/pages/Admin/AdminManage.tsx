import { Button, Flex, LoadingOverlay, Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import AddEmployeeForm from '../../components/AddEmployeeForm';
import ContentHeader from '../../components/ContentHeader';
import EmployeeTable from '../../components/EmployeeTable';
import useEmployee from '../../hooks/useEmployee';

export default function AdminManage() {
    const [opened, setOpened] = useState(false);
    const { data } = useEmployee();
    const [employees, setEmployees] = useState<any[]>([]);
    const { VITE_REACT_APP_BASE_URL } = import.meta.env;

    useEffect(() => {
        getEmployeeData();
    }, [data]);

    async function getEmployeeData() {
        const response = await fetch(
            `${VITE_REACT_APP_BASE_URL}/api/admin/employee`
        );
        const data = await response.json();
        if (!data.error) {
            data.employees.map((employee: any) => {
                setEmployees((prev) => [...prev, employee]);
            });
        }
    }

    return (
        <div className="main">
            <ContentHeader text={'Manage'} />
            <Flex
                justify="end"
                my="md"
            >
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Add Employee"
                >
                    <AddEmployeeForm />
                </Modal>
                <Button onClick={() => setOpened(true)}>Add Employee</Button>
            </Flex>
            <EmployeeTable data={employees} />
        </div>
    );
}
