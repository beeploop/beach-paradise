const bcrypt = require('bcrypt');

async function hash() {
    const res = await bcrypt.hash('admin', 10);
    console.log(res);
}

hash();
