import pool from '../config/database.js'

const CreateRole =async (nama_role) =>{
    try{
        const [result] =await pool.execute(`INSERT INTO role_admin (nama_role) values (?)`,[nama_role])
        return result;
    }catch (e){
        throw e.message;
    }
}

const getallRole = async (nama_role) =>{
    try{
        const [rows, field] = await pool.execute(`SELECT * FROM role_admin`)
        return {
            rows,
            field
        }
    }catch (err) {
        throw err;
    }
}


export default{
    CreateRole,
    getallRole,
}