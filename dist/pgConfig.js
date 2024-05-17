"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// pgConfig.ts
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: "postgres",
    password: "Shinde@225", // Change this with your actual password
    port: 5432,
});
exports.default = pool;
