// service.ts
import pool from './pgConfig';


export async function createOrder(orderID:string) {
    const query = 'INSERT INTO orders (orderID) VALUES ($1)';
    const values = [orderID];

    try {
        await pool.query(query, values);
    } catch (err) {
        console.error('Error inserting order into database', err);
        throw err;
    }
}

// Read
export async function getOrders(): Promise<any[]> {
    const query = 'SELECT * FROM orders';
    const result = await pool.query(query);
    return result.rows;
}

// Check and Create Table if Not Exists
export async function checkAndCreateTable(): Promise<void> {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            orderID VARCHAR(255) NOT NULL
        )
    `;
    await pool.query(createTableQuery);
}
