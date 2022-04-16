const pool = require('../db');

class Task {
    static async findAll(){
        const sql = `SELECT * FROM tasks`;
        const dbResult = await pool.query(sql);
        return dbResult.rows;
    }
    static async create(data){
        const { name, description} = data;
        const sql = `INSERT INTO tasks (name) values ($1) returning *`;
        const dbResult = await pool.query(sql, [name]);
        return dbResult.rows;
    }

    static async find(id){
        if(!id) throw new Error(`An id is required`);
        const sql = `SELECT * FROM tasks where task_id = $1`;
        const dbResult = await pool.query(sql, [id]);
        return dbResult.rows;
    }
    static async remove(id){
        if(!id) throw new Error(`An id is required`);
        const sql = `DELETE FROM tasks where task_id = $1`;
        const dbResult = await pool.query(sql, [id]);
    }
    static async update(name, id){
        if(!id) throw new Error(`An id is required`);
        // const { name, description } = data;
        const sql = `UPDATE tasks SET name = $1 where task_id = $2 returning *`;
        const dbResult = await pool.query(sql, [name, id]);
        console.log(dbResult)
        return dbResult.rows[0];
    }
    static async complete(id, completed){
        if(!id) throw new Error(`An id is required`);
        const sql = `UPDATE tasks SET completed = true where task_id = $1`;
        const dbResult = await pool.query(sql, [id])
        return dbResult.rows[0];
    }
}

module.exports = Task;