const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

let cottages = {}

cottages.getAvailableCottages = async (checkin, checkout) => {
    const checkinDate = new Date(checkin)
    const checkoutDate = new Date(checkout)
    // const today = new Date()
    const cottages = await prisma.cottage.findMany({
        where: {
            NOT: {
                Booking: {
                    some: {
                        checkin: { lte: checkoutDate },
                        checkout: { gte: checkinDate },
                    },
                },
            },
        },
        orderBy: {
            cottageId: 'asc',
        },
    })
    console.log(cottages)
    return cottages
}

cottages.getAllCottages = async () => {
    const cottages = await prisma.cottage.findMany()
    return cottages
}

cottages.addCottage = async (cottageDetails) => {
    console.log({ cottageDetails })
    try {
        const cottage = await prisma.cottage.create({
            data: {
                name: cottageDetails.name,
                price: parseInt(cottageDetails.rate),
                description: cottageDetails.desc,
            },
        })
        return { data: cottage, error: null }
    } catch (error) {
        return { data: null, error: error }
    }
}

cottages.editCottage = async (modifications) => {
    console.log({ modifications })
    const cottage = await prisma.cottage.update({
        where: {
            cottageId: parseInt(modifications.id),
        },
        data: {
            name: modifications.name,
            price: parseInt(modifications.rate),
            description: modifications.desc,
        },
    })
    return cottage
    // try {
    // } catch (error) {
    //     return { result: null }
    // }
}

cottages.getCottage = async (id) => {
    console.log({ id })
    const cottage = await prisma.cottage.findUnique({
        where: {
            cottageId: parseInt(id),
        },
    })
    return cottage
}

module.exports = cottages
