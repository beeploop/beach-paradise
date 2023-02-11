const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

let rooms = {}

rooms.getAvailableRooms = async () => {
    try {
        const today = new Date()
        const rooms = await prisma.room.findMany({
            where: {
                status: 'operational',
                NOT: {
                    Booking: {
                        some: {
                            checkin: { lte: today },
                            checkout: { gte: today },
                        },
                    },
                },
            },
            orderBy: {
                roomNumber: 'asc',
            },
        })
        return rooms
    } catch (error) {
        console.log({ error })
        return error
    }
}

rooms.getAllRooms = async () => {
    const rooms = await prisma.room.findMany()
    return rooms
}

rooms.getRoom = async (id) => {
    const room = await prisma.room.findUnique({
        where: {
            roomNumber: parseInt(id),
        },
    })
    return room
}

rooms.addRoom = async (roomDetails) => {
    console.log({ roomDetails })
    const room = await prisma.room.create({
        data: {
            type: roomDetails.type,
            bed: Number(roomDetails.bed),
            status: roomDetails.status,
            price: Number(roomDetails.rate),
            description: roomDetails.desc,
        },
    })
    return room
}

rooms.editRoom = async (modifications) => {
    console.log({ modifications })
    const room = await prisma.room.update({
        where: {
            roomNumber: parseInt(modifications.roomNumber),
        },
        data: {
            type: modifications.type,
            bed: parseInt(modifications.bed),
            status: modifications.status,
            price: parseInt(modifications.rate),
            description: modifications.desc,
        },
    })
    return room
}

module.exports = rooms
