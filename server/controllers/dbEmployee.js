const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

let employee = {}

employee.addEmployee = async (employeeData) => {
    try {
        const hashedPassword = await bcrypt.hash(employeeData.password, 10)
        const employee = await prisma.admin.create({
            data: {
                name: employeeData.name,
                email: employeeData.email,
                phone: employeeData.phone,
                password: hashedPassword,
                role: employeeData.role,
            },
        })
        return { employee: employee, error: null }
    } catch (error) {
        console.log(error)
        return { employee: null, error: error }
    }
}

employee.getEmployees = async () => {
    try {
        const employees = await prisma.admin.findMany({
            orderBy: {
                role: 'asc',
            },
        })
        return { employees: employees, error: null }
    } catch (error) {
        console.log(error)
        return { employees: null, error: error }
    }
}

module.exports = employee
