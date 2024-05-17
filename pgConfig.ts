// pgConfig.ts
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: "postgres",
    password: "Shinde@225", // Change this with your actual password
    port: 5432,
});

export default pool;
