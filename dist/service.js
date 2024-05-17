"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndCreateTable = exports.getOrders = exports.createOrder = void 0;
// service.ts
const pgConfig_1 = __importDefault(require("./pgConfig"));
function createOrder(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'INSERT INTO orders (orderID) VALUES ($1)';
        const values = [orderID];
        try {
            yield pgConfig_1.default.query(query, values);
        }
        catch (err) {
            console.error('Error inserting order into database', err);
            throw err;
        }
    });
}
exports.createOrder = createOrder;
// Read
function getOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT * FROM orders';
        const result = yield pgConfig_1.default.query(query);
        return result.rows;
    });
}
exports.getOrders = getOrders;
// Check and Create Table if Not Exists
function checkAndCreateTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            orderID VARCHAR(255) NOT NULL
        )
    `;
        yield pgConfig_1.default.query(createTableQuery);
    });
}
exports.checkAndCreateTable = checkAndCreateTable;
