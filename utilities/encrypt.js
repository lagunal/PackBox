const encrypt = require('bcryptjs');

exports.encrypt = (passwrod) => {
    const genSalt = encrypt.genSaltSync();
    const hashpass = encrypt.hashSync(passwrod, genSalt);
    return hashpass;
};

exports.compare = async (pass1, pass2) => {
    return await encrypt.compare(pass1, pass2);
};



