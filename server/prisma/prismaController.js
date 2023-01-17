const { computePrice, validateAdultsAndKids } = require('../utils/helper');
const { sendVerification, sendConfirmation } = require('../utils/mailer');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
// const { tokenLifetime } = require('../utils/tokenLifetime');
const prisma = new PrismaClient();

let db = {};

db.addEmployee = async (employeeData) => {
    try {
        const hashedPassword = await bcrypt.hash(employeeData.password, 10);
        const employee = await prisma.admin.create({
            data: {
                name: employeeData.name,
                email: employeeData.email,
                phone: employeeData.phone,
                password: hashedPassword,
                role: employeeData.role,
            },
        });
        return { employee: employee, error: null };
    } catch (error) {
        console.log(error);
        return { employee: null, error: error };
    }
};

db.getEmployees = async () => {
    try {
        const employees = await prisma.admin.findMany({
            orderBy: {
                role: 'asc',
            },
        });
        return { employees: employees, error: null };
    } catch (error) {
        console.log(error);
        return { employees: null, error: error };
    }
};

db.getAvailableRooms = async () => {
    const today = new Date();
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
    });
    return rooms;
};

db.getAvailableCottages = async (checkin, checkout) => {
    const checkinDate = new Date(checkin);
    const checkouDate = new Date(checkout);
    // const today = new Date()
    const cottages = await prisma.cottage.findMany({
        where: {
            NOT: {
                Booking: {
                    some: {
                        checkin: { lte: checkouDate },
                        checkout: { gte: checkinDate },
                    },
                },
            },
        },
        orderBy: {
            cottageId: 'asc',
        },
    });
    console.log(cottages);
    return cottages;
};

db.getAllRooms = async () => {
    const rooms = await prisma.room.findMany();
    return rooms;
};

db.filterByStatus = async (filter) => {
    if (filter === 'all') {
        const rooms = await prisma.room.findMany({
            orderBy: {
                roomNumber: 'asc',
            },
        });
        return rooms;
    } else {
        const rooms = await prisma.room.findMany({
            where: {
                status: filter,
            },
            orderBy: {
                roomNumber: 'asc',
            },
        });
        return rooms;
    }
};

db.filterByDateAndType = async ({ checkin, checkout, type }) => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    if (type === 'all') {
        const rooms = await prisma.room.findMany({
            where: {
                status: 'operational',
                NOT: {
                    Booking: {
                        some: {
                            checkout: { gte: checkinDate },
                            checkin: { lte: checkoutDate },
                        },
                    },
                },
            },
        });
        return rooms;
    } else {
        const rooms = await prisma.room.findMany({
            where: {
                status: 'operational',
                type: type,
                NOT: {
                    Booking: {
                        some: {
                            checkout: { gte: checkinDate },
                            checkin: { lte: checkoutDate },
                        },
                    },
                },
            },
        });
        return rooms;
    }
};

db.getRoom = async (id) => {
    const room = await prisma.room.findUnique({
        where: {
            roomNumber: parseInt(id),
        },
    });
    return room;
};

db.getReservations = async () => {
    const roomReservations = await prisma.roomBooking.findMany({
        where: {
            status: 'verified',
        },
    });
    const cottageReservations = await prisma.cottageBooking.findMany({
        where: {
            status: 'verified',
        },
    });
    return { rooms: roomReservations, cottages: cottageReservations };
};

db.addRoom = async (roomDetails) => {
    console.log({ roomDetails });
    const room = await prisma.room.create({
        data: {
            type: roomDetails.type,
            bed: Number(roomDetails.bed),
            status: roomDetails.status,
            price: Number(roomDetails.rate),
            description: roomDetails.desc,
        },
    });
    return room;
};

db.editRoom = async (modifications) => {
    console.log({ modifications });
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
    });
    return room;
};

db.getAllCottages = async () => {
    const cottages = await prisma.cottage.findMany();
    return cottages;
};

db.addCottage = async (cottageDetails) => {
    console.log({ cottageDetails });
    try {
        const cottage = await prisma.cottage.create({
            data: {
                name: cottageDetails.name,
                price: parseInt(cottageDetails.rate),
                description: cottageDetails.desc,
            },
        });
        return { data: cottage, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
};

db.editCottage = async (modifications) => {
    console.log({ modifications });
    const cottage = await prisma.cottage.update({
        where: {
            cottageId: parseInt(modifications.id),
        },
        data: {
            name: modifications.name,
            price: parseInt(modifications.rate),
            description: modifications.desc,
        },
    });
    return cottage;
    // try {
    // } catch (error) {
    //     return { result: null }
    // }
};

db.getCottage = async (id) => {
    console.log({ id });
    const cottage = await prisma.cottage.findUnique({
        where: {
            cottageId: parseInt(id),
        },
    });
    return cottage;
};

db.findUserProfileByEmail = async (email) => {
    const profile = await prisma.profile.findUnique({
        where: {
            email: email,
        },
    });
    return profile;
};

db.reserveCottage = async (bookingDetails) => {
    const user = await db.checkUserThenInsert({
        firstname: bookingDetails.firstname,
        lastname: bookingDetails.lastname,
        email: bookingDetails.email,
        phone: bookingDetails.phone,
        street: bookingDetails.street,
        city: bookingDetails.city,
        state: bookingDetails.state,
        postal: bookingDetails.postal,
    });
    console.log({ user });

    // const { adults, kids } = validateAdultsAndKids({
    //     adults: bookingDetails.numOfAdults,
    //     kids: bookingDetails.numOfKids,
    // })

    // console.log({ kids, adults })

    const cottage = await prisma.cottage.findUnique({
        where: {
            cottageId: parseInt(bookingDetails.cottageId),
        },
    });

    const booking = await prisma.cottageBooking.create({
        data: {
            cottageName: cottage.name,
            // roomNumber: parseInt(bookingDetails.roomNumber),
            userId: user.userId,
            checkin: new Date(bookingDetails.checkin),
            checkout: new Date(bookingDetails.checkout),
            // adults: adults,
            // kids: kids,
            price: computePrice(
                bookingDetails.checkin,
                bookingDetails.checkout,
                bookingDetails.rate
            ),
        },
    });

    const token = await prisma.token.create({
        data: {
            bookerId: user.userId,
            bookingId: booking.bookingId,
            type: 'cottage',
        },
    });

    // ! newly add feature. unifinished
    // const tokenLife = new tokenLifetime()
    // tokenLife.printLifetime()
    // tokenLife.countLife().then((res) => {
    //     db.cancelBooking(token.tokenId, booking.bookingId)
    // })

    console.log({ user, token });
    sendVerification(user.email, token.tokenId);
    return { bookingData: booking, userData: user };
};

db.reserveRoom = async (bookingDetails) => {
    const user = await db.checkUserThenInsert({
        firstname: bookingDetails.firstname,
        lastname: bookingDetails.lastname,
        email: bookingDetails.email,
        phone: bookingDetails.phone,
        street: bookingDetails.street,
        city: bookingDetails.city,
        state: bookingDetails.state,
        postal: bookingDetails.postal,
    });
    console.log({ user });

    const { adults, kids } = validateAdultsAndKids({
        adults: bookingDetails.numOfAdults,
        kids: bookingDetails.numOfKids,
    });

    console.log({ kids, adults });

    const booking = await prisma.roomBooking.create({
        data: {
            // cottageId: null,
            roomNumber: parseInt(bookingDetails.roomNumber),
            userId: user.userId,
            checkin: new Date(bookingDetails.checkin),
            checkout: new Date(bookingDetails.checkout),
            adults: adults,
            kids: kids,
            price: computePrice(
                bookingDetails.checkin,
                bookingDetails.checkout,
                bookingDetails.rate
            ),
        },
    });

    const token = await prisma.token.create({
        data: {
            bookerId: user.userId,
            bookingId: booking.bookingId,
            type: 'room',
        },
    });

    // ! newly add feature. unifinished
    // const tokenLife = new tokenLifetime()
    // tokenLife.printLifetime()
    // tokenLife.countLife().then((res) => {
    //     db.cancelBooking(token.tokenId, booking.bookingId)
    // })

    console.log({ user, token });
    sendVerification(user.email, token.tokenId);
    return { bookingData: booking, userData: user };
};

db.verifyReservation = async (token) => {
    const tokenStoredInDB = await prisma.token.findFirst({
        where: {
            tokenId: token,
            status: 'pending',
        },
    });
    if (!tokenStoredInDB) return;

    let booking;
    if (tokenStoredInDB.type === 'room') {
        const userBooking = await prisma.roomBooking.update({
            where: {
                bookingId: tokenStoredInDB.bookingId,
            },
            data: {
                status: 'verified',
            },
        });
        booking = userBooking;
    } else {
        const userBooking = await prisma.cottageBooking.update({
            where: {
                bookingId: tokenStoredInDB.bookingId,
            },
            data: {
                status: 'verified',
            },
        });
        booking = userBooking;
    }

    const user = await prisma.user.findUnique({
        where: {
            userId: booking.userId,
        },
        select: {
            profileId: true,
        },
    });
    const userProfile = await prisma.profile.findUnique({
        where: {
            profileId: user.profileId,
        },
    });
    sendConfirmation(userProfile.email, booking);
    await prisma.token.update({
        where: {
            tokenId: token,
        },
        data: {
            status: 'verified',
        },
    });
    return booking;
};

db.checkUserThenInsert = async ({
    firstname,
    lastname,
    email,
    phone,
    street,
    city,
    state,
    postal,
}) => {
    const userWithEmail = await db.findUserProfileByEmail(email);
    console.log({ userWithEmail });
    if (userWithEmail) {
        console.log('email found');
        const user = await prisma.user.findUnique({
            where: {
                profileId: userWithEmail.profileId,
            },
        });
        console.log('user with the email found ', user);
        return { userId: user.userId, email: userWithEmail.email };
    }

    console.log('no email found. creating user and profile...');
    const user = await db.createUserAndProfile({
        firstname,
        lastname,
        email,
        phone,
        street,
        city,
        state,
        postal,
    });
    console.log('newly created user: ', user);
    return user;
};

db.createUserAndProfile = async ({
    firstname,
    lastname,
    email,
    phone,
    street,
    city,
    state,
    postal,
}) => {
    const profile = await prisma.profile.create({
        data: {
            email: email,
            phone: phone,
            street: street,
            city: city,
            state: state,
            postal: Number(postal),
        },
    });
    console.log('profile created ', profile);
    const user = await prisma.user.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            profileId: profile.profileId,
        },
    });
    console.log('user created');
    return { userId: user.userId, email: profile.email };
};

db.cancelBooking = async (token, bookingId) => {
    await prisma.token.delete({
        where: {
            tokenId: token,
        },
    });
    const booking = await prisma.roomBooking.delete({
        where: {
            bookingId: bookingId,
        },
    });
    return booking;
};

db.AdminAuth = async ({ email, password }) => {
    console.log(email);
    try {
        const admin = await prisma.admin.findFirst({
            where: {
                email: email,
            },
        });
        // console.log({ admin });
        if (!admin) return { result: null };

        const isValid = await bcrypt.compare(password, admin.password);
        if (isValid) return { result: admin, error: null };
        return { result: null, error: 'mismatch password' };
    } catch (error) {
        console.log('there was an error');
        return { error: error };
    }
};

db.getDashboardData = async () => {
    const users = await prisma.user.count();
    const roomReservations = await prisma.roomBooking.count();
    const cottageReservations = await prisma.cottageBooking.count();
    const totalRooms = await prisma.room.count();
    const totalCottages = await prisma.cottage.count();
    const pendingRoom = await prisma.roomBooking.count({
        where: {
            status: 'pending',
        },
    });
    const pendingCottage = await prisma.cottageBooking.count({
        where: {
            status: 'pending',
        },
    });
    const roomIncome = await prisma.roomBooking.aggregate({
        _sum: {
            price: true,
        },
    });
    const cottageIncome = await prisma.cottageBooking.aggregate({
        _sum: {
            price: true,
        },
    });
    // if (!pendingRoom && !pendingCottage) return
    console.log({ pendingRoom, pendingCottage });
    return {
        users,
        roomReservations,
        cottageReservations,
        pendingCottage,
        pendingRoom,
        roomIncome,
        cottageIncome,
        totalCottages,
        totalRooms,
    };
};

module.exports = db;
