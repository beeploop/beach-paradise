const crypto = require('crypto');
const express = require('express');
const db = require('../prisma/prismaController');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const admin = await db.AdminAuth({
        email: email,
        password: password,
    });
    console.log({ admin });
    if (admin.result) {
        res.send({
            token: crypto.randomUUID(),
            data: admin.result,
        });
        return;
    }
    console.log('error: ', admin.error);
    res.send({
        token: null,
    });
});

module.exports = router;
