import pool from '../config/database.js'
import bcrypt from 'bcrypt'

// Controller
const CreateNewUser = async (username, password, role) =>{
    try{
        const hashPassword = await HashPassword(password);
        const [{id_role}] = await searchrole(role);
        const [row] = await pool.execute(`INSERT INTO user_admin(username,password,id_role) values (?,?,?)`, [username, hashPassword, id_role]);
        return row;
    }catch (e){
        console.log(e);
        throw e.message;
    }
}

const Getalluser = async () =>{
    try{
        const [row] = await pool.execute(`SELECT * FROM user_admin`)
        return row;
    }catch (e){
        throw e.message;
    }
}



// fungsi
const HashPassword = async (plain_password) =>{
    try{
        const saltRounds = 10;
        return await bcrypt.hash(plain_password, saltRounds);
    }catch (e){
        console.error(e.message);
    }

}

const searchrole = async (role)=>{
    try{
        const [rows] = await pool.execute(`SELECT * FROM role_admin where nama_role like '%${role}%'`)
        return rows;

    } catch (e){
        console.log(e);
        throw e.message;
    }

}

export default{
    CreateNewUser,
    Getalluser,
    searchrole
}