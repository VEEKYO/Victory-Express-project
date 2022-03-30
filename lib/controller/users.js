"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = exports.getUser = void 0;
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const writeProm = (0, util_1.promisify)(fs_1.default.writeFile);
(0, uuid_1.v4)();
let isExists = fs_1.default.existsSync("./database.json");
if (isExists === false) {
    writeProm("./database.json", '[]');
}
let database = JSON.parse(fs_1.default.readFileSync("./database.json", "utf8"));
const getUser = (req, res, next) => {
    const { id } = req.params;
    // const foundUsers = database.find((user: { userId: any; }) => user.userId === id);
    database.forEach((item, index) => {
        if (item['userId'] == id) {
            res.send(item);
        }
    });
};
exports.getUser = getUser;
const getUsers = (req, res, next) => {
    if (isExists == true) {
        fs_1.default.readFile('./database.json', 'utf8', (err, content) => {
            res.send(content);
        });
    }
    else {
        res.send('Database is empty');
    }
};
exports.getUsers = getUsers;
const createUser = (req, res, next) => {
    let body = req.body;
    let id = (0, uuid_1.v4)();
    let userWithId = Object.assign({ userId: id }, body);
    // database.push(userWithId);
    fs_1.default.readFile('./database.json', 'utf8', function (err, data) {
        let readData = JSON.parse(data);
        readData.push(userWithId);
        fs_1.default.writeFile('./database.json', JSON.stringify(readData, null, 2), "utf8", err => console.log(err));
    });
    res.send(userWithId);
};
exports.createUser = createUser;
const updateUser = (req, res, next) => {
    const { id } = req.params;
    let updated = req.body;
    const { userId, organization, createdAt, updatedAt, products, marketValue, address, ceo, country, noOfEmployees, employees } = updated;
    let newDate = new Date();
    let detailsData = {
        userId: userId || updated.userId,
        organization: organization || updated.organization,
        createdAt: createdAt || updated.createdAt,
        updatedAt: newDate.toISOString(),
        products: products || updated.products,
        marketValue: marketValue || updated.marketValue,
        address: address || updated.address,
        ceo: ceo || updated.ceo,
        country: country || updated.country,
        noOfEmployees: noOfEmployees || updated.noOfEmployees,
        employees: employees || updated.employees,
    };
    database.forEach((item, index) => {
        if (item['userId'] === id) {
            database[index] = detailsData;
            fs_1.default.writeFile('./database.json', JSON.stringify(database, null, 2), 'utf8', err => console.log(err));
        }
    });
    res.send(JSON.stringify(detailsData, null, 2));
};
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => {
    const { id } = req.params;
    database.forEach((item, index) => {
        if (item['userId'] === id) {
            database.splice(index, 1);
            fs_1.default.writeFile('./database.json', JSON.stringify(database, null, 2), 'utf8', err => console.log(err));
        }
    });
    res.send(`${id} deleted`);
};
exports.deleteUser = deleteUser;
