import pool from '../config/database.js'
import bcrypt from 'bcrypt'

const CreateNewUser = async (username, password, role) =>{
    try{
        const hashPassword = await HashPassword(password);
        const [rows] = await pool.execute(`INSERT INTO user_admin(username,password,id_role) values (?,?,?)`, [username, hashPassword, role]);

    }catch (e){
        throw e.message;
    }
}

const HashPassword = async (plain_password) =>{
    const saltRounds = 10;
    return await bcrypt.hash(plain_password, saltRounds);
}

const searchrole = async (role)=>{
    try{
        const [rows] = await pool.execute(`SELECT * FROM role_admin where nama_role like '%${role}%'`)
        return rows;

    } catch (e){
        throw e.message;
    }

}

export default{
    searchrole
}