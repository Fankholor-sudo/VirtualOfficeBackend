
const sqlite = require('sqlite3').verbose();
const DB = new sqlite.Database('./Database/office_database.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
})

const Create = (req, res) => {
    try {
        const { MemberID, OfficeID, FirstName, LastName, Avatar } = req.body;
        if (!MemberID || !OfficeID || !FirstName || !LastName || !Avatar)
            throw "All fields are required";

        const sql = `INSERT INTO Members (MemberID, OfficeID, FirstName, LastName, Avatar) VALUES (?, ?, ?, ?, ?)`;

        DB.run(sql, [MemberID, OfficeID, FirstName, LastName, Avatar], (err) => {
            if (err) res.status(400).send({ message: "Error: Failed to create a member, try again later. " + err })
            else res.status(200).send({
                message: 'Member created successfully.', data: {
                    MemberID,
                    OfficeID,
                    FirstName,
                    LastName,
                    Avatar,
                }
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err });
    }
}

const ReadOne = (req, res) => {
    try {
        const { MemberID } = req.query;
        if (!MemberID) throw "MemberID is required.";

        let sql = `SELECT * FROM Members`;
        sql += ` WHERE MemberID LIKE '%${MemberID}%'`;

        DB.all(sql, [], (err, rows) => {
            if (err) res.status(400).send({ message: "Error: " + err });
            res.status(200).send({ message: "Success", data: rows });
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err });
    }
}

const ReadAll = (req, res) => {
    try {
        const { OfficeID } = req.query;
        if (!OfficeID) throw "OfficeID is required.";

        let sql = `SELECT * FROM Members`;
        sql += ` WHERE OfficeID LIKE '%${OfficeID}%'`;

        DB.all(sql, [], (err, rows) => {
            if (err) res.status(400).send({ message: "Error: " + err });
            res.status(200).send({ message: "Success", data: rows });
        })
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ message: err })
    }
}

const Update = (req, res) => {
    try {
        const { MemberID, FirstName, LastName, Avatar } = req.body;
        if (!MemberID || !FirstName || !LastName || !Avatar)
            throw "All fields are required";

        let sql = `UPDATE Members SET FirstName = ?, LastName = ?, Avatar = ?`;
        sql += ` WHERE MemberID LIKE '%${MemberID}%'`;

        DB.run(sql, [FirstName, LastName, Avatar], (err) => {
            if (err) res.status(400).send({ message: "Error: Failed to update a member, try again later. " + err });
            else res.status(200).send({
                message: 'Member updated successfully.', data: {
                    MemberID,
                    FirstName,
                    LastName,
                    Avatar,
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
        const { MemberID } = req.query;
        if (!MemberID) throw "MemberID is required.";

        let sql = `DELETE FROM Members WHERE MemberID = ?`;

        DB.run(sql, [MemberID], function(err) {
            if (err) res.status(400).send({ message: "Error: Failed to delete member. " + err })
            else {
                res.status(200).send({ message: "Success: Member deleted successfully."})
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
    Update,
    ReadOne,
    ReadAll,
    Delete,
}