import { useEffect, useState } from 'react';

type TEmployee = {
    name: string;
    role: string;
    email: string;
    phone: string;
};

export default function useEmployee() {
    const [employees, setEmployees] = useState<TEmployee[]>([]);
    const [loading, setLoading] = useState(false);
    const { VITE_REACT_APP_BASE_URL } = import.meta.env;

    // useEffect(() => {
    //     getEmployees();
    // }, [employees]);

    async function getEmployees() {
        setLoading(true);
        const response = await fetch(
            `${VITE_REACT_APP_BASE_URL}/api/admin/employee`
        );
        setLoading(false);
        const data = await response.json();
        if (data.employees) {
            data.employees.map((employee: TEmployee) => {
                setEmployees((prev) => [...prev, employee]);
            });
            return data.employees;
        }
    }

    async function addEmployee(employeeData: TEmployee) {
        setLoading(true);
        const response = await fetch(
            `${VITE_REACT_APP_BASE_URL}/api/admin/employee/add`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            }
        );
        setLoading(false);
        const data = await response.json();
        if (data.employee) {
            setEmployees([...employees, data.employee]);
        }
    }

    return {
        data: employees,
        loading: loading,
        getEmployees: getEmployees,
        setEmployees: addEmployee,
    };
}
