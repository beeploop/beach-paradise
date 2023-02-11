const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const users = {}

users.findUserProfileByEmail = async (email) => {
    const profile = await prisma.profile.findUnique({
        where: {
            email: email,
        },
    })
    return profile
}

users.checkUserThenInsert = async ({
    firstname,
    lastname,
    email,
    phone,
    street,
    city,
    state,
    postal,
}) => {
    const userWithEmail = await users.findUserProfileByEmail(email)
    console.log({ userWithEmail })
    if (userWithEmail) {
        console.log('email found')
        const user = await prisma.user.findUnique({
            where: {
                profileId: userWithEmail.profileId,
            },
        })
        console.log('user with the email found ', user)
        return { userId: user.userId, email: userWithEmail.email }
    }

    console.log('no email found. creating user and profile...')
    const user = await users.createUserAndProfile({
        firstname,
        lastname,
        email,
        phone,
        street,
        city,
        state,
        postal,
    })
    console.log('newly created user: ', user)
    return user
}

users.createUserAndProfile = async ({
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
    })
    console.log('profile created ', profile)
    const user = await prisma.user.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            profileId: profile.profileId,
        },
    })
    console.log('user created')
    return { userId: user.userId, email: profile.email }
}

module.exports = users
