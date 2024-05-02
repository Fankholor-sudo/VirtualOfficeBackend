
const sqlite = require('sqlite3').verbose();
const DB = new sqlite.Database('./Database/office_database.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
})

const Create = (req, res) => {
    try {
        const { OfficeID, OfficeName, Address, Email, PhoneNumber, MaxCapacity, OfficeColor } = req.body;
        if (!OfficeID || !OfficeName || !Address || !Email || !PhoneNumber || !MaxCapacity, !OfficeColor)
            throw "All fields are required";

        const sql = `INSERT INTO Offices (OfficeID, OfficeName, Address, Email, PhoneNumber, MaxCapacity, OfficeColor) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        DB.run(sql, [OfficeID, OfficeName, Address, Email, PhoneNumber, MaxCapacity, OfficeColor], (err) => {
            if (err) res.status(400).send({ message: "Error: Failed to create office." + err })
            else res.status(200).send({
                message: 'Office created successfully.', data: {
                    OfficeID,
                    OfficeName,
                    Address,
                    Email,
                    PhoneNumber,
                    MaxCapacity,
                    OfficeColor,
                }
            });
        });
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: err })
    }
}

const ReadOne = (req, res) => {
    try {
        const { OfficeID } = req.query;
        if (!OfficeID) throw "OfficeID is required.";

        let sql = `SELECT * FROM Offices`;
        sql += ` WHERE OfficeID LIKE '%${OfficeID}%'`;

        DB.all(sql, [], (err, rows) => {
            if (err) res.status(400).send({ message: "Error: Failed to read office details. " + err })
            res.status(200).send({ message: "Success", data: rows })
        })
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: err })
    }
}

const ReadAll = (req, res) => {
    try {
        let sql = `SELECT * FROM Offices`;

        DB.all(sql, [], (err, rows) => {
            if (err) res.status(400).send({ message: "Error: There are no offices available. " + err });
            res.status(200).send({ message: "Success", data: rows });
        });
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: err })
    }
}

const Update = (req, res) => {
    try {
        const { OfficeID, OfficeName, Address, Email, PhoneNumber, MaxCapacity, OfficeColor } = req.body;
        if (!OfficeID) throw "OfficeID Id is required.";

        let sql = `UPDATE Offices SET OfficeName = ?, Address = ?, Email = ?, PhoneNumber = ?, MaxCapacity = ?, OfficeColor = ?`;
        sql += ` WHERE OfficeID LIKE '%${OfficeID}%'`;

        DB.run(sql, [OfficeName, Address, Email, PhoneNumber, MaxCapacity, OfficeColor], (err) => {
            if (err) res.status(400).send({ message: "Error: Failed to update office details, try again later. " + err })
            else res.status(200).send({
                message: 'Office updated successfully.', data: {
                    OfficeID,
                    OfficeName,
                    Address,
                    Email,
                    PhoneNumber,
                    MaxCapacity,
                    OfficeColor,
                }
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err });
    }
}

const Delete = (req, res) => {
    try {
        const { OfficeID } = req.query;
        if (!OfficeID) throw "OfficeID is required.";

        let sql = `DELETE FROM Offices WHERE OfficeID = ?`;
        let sqlMem = `DELETE FROM Members WHERE OfficeID = ?`;

        DB.run(sql, [OfficeID], function(err) {
            if (err) res.status(400).send({ message: "Error: Failed to delete office. " + err })
            else {
                DB.run(sqlMem, [OfficeID], function(err) {
                    if (err) res.status(400).send({ message: "Error: Failed to delete members. " + err })
                    else {
                        res.status(200).send({ message: "Success: Office deleted successfully."})
                    }
                });
            }
        });
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: err })
    }
}


module.exports = {
    Create,
    ReadOne,
    ReadAll,
    Update,
    Delete,
}