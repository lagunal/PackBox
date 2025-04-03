const fs = require('fs');

const errorLogger = (err, req, res, next) => {
    const message = "" + new Date() + " " + err.message + "\n";
    fs.appendFile("ErrorLog.txt", message, (err) => {
        if (err) console.log("Error creating the log file");
    })

    res.status(err.status).json({
        message: err.message
    })
};

module.exports = errorLogger;


