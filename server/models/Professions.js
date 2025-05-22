import pool from "../config/database.js"

const Professions = {

    async getAllProfessions(){
        const {rows} = await pool.query("SELECT * FROM professions")
        return rows;
    },

    async dropdownProfessions(){
        const {rows} = await pool.query("SELECT * FROM professions LIMIT 9");
        return rows;
    },

    async sidebarProfessions(){
        const {rows} = await pool.query("SELECT * FROM professions LIMIT 5");
        return rows;
    }
}

export default Professions;