const pg = require("pg");

// const connectionString = 'postgresql://postgres:123456@localhost:5432/project1';
const connectionString = 'postgresql://aufal:123456@localhost:5432/project1';

const pool = new pg.Pool({
    connectionString,
});

const query = async (text, params) => {
    try {
        const result = await pool.query(text, params);
        return result
    } catch (error) {
        throw error
    }
};


module.exports = { query };