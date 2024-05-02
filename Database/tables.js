const sqlite = require('sqlite3').verbose();

//__________Connect to the Database__
const DB = new sqlite.Database('office_database.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
    console.log("Connected to sqlite database.");
});

//____________Create Tables_____________
const office_table =
    'CREATE TABLE IF NOT EXISTS Offices (' +
    'OfficeID VARCHAR PRIMARY KEY, ' +
    'OfficeName VARCHAR(50), ' +
    'Address VARCHAR(300), ' +
    'Email VARCHAR(100), ' +
    'PhoneNumber VARCHAR(50), ' +
    'MaxCapacity INTEGER, '+
    'OfficeColor VARCHAR(50))';

const member_table =
    'CREATE TABLE IF NOT EXISTS Members (' +
    'MemberID VARCHAR PRIMARY KEY, ' +
    'OfficeID VARCHAR, ' +
    'FirstName VARCHAR(50), ' +
    'LastName VARCHAR(50), ' +
    'Avatar VARCHAR, ' +
    'FOREIGN KEY (OfficeID) REFERENCES Offices(OfficeID))';


DB.run(office_table);
DB.run(member_table);