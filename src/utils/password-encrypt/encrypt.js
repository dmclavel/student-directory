const bcryptjs = require('bcryptjs');
const saltRounds = 10;

export const encrypt = (password) => {
    return new Promise((resolve, reject) => {
        bcryptjs.genSalt(saltRounds, (err, salt) => {
            bcryptjs.hash(password, salt, (err, hash) => {
                if (err)
                    reject(err);
                else
                    resolve(hash);
            });
        })
    });
};
