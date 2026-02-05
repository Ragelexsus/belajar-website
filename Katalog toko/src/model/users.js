import pool from '../config/database.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

// Controller
const CreateNewUser = async (username, password, role) =>{
    const conn = await pool.getConnection();
    try{
        await conn.beginTransaction();
        const hashPassword = await HashPassword(password);
        const [{id_role}] = await searchrole(role);

        const checkusername = await checkUser(username);

        if(!checkusername){
            throw new Error("User already exists");
        }else{
            const [row] = await conn.execute(`INSERT INTO user_admin(username,password,id_role) values (?,?,?)`, [username, hashPassword, id_role]);
            await conn.commit();
            return row;
        }
    }catch (e){
        await conn.rollback()
        console.log(e);
        throw e;
    }finally {
        conn.release();
    }
}

const Getalluser = async () =>{
    try{
        const [row] = await pool.execute(`SELECT * FROM user_admin`)
        return row;
    }catch (e){
        throw e;
    }
}

const login = async (username, plain_password)=>{
    try{
        const [row] = await pool.execute(`SELECT * FROM user_admin WHERE username=?`, [username]);
        const data= row[0];

        if (!row|| row.length == 0){
            throw new Error("User Not Found");
        }else{
            const checkpasswords = checkpassword(plain_password, data.password);
            if(!checkpasswords){
                throw new Error("Username or passwords incorrect");
            }else{
                console.info("Berhasil Login")
                return row
            }
        }


    }catch (e){
        throw e;
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
        throw e;
    }

}

const checkUser= async (username) =>{
    try{
        const [rows] = await pool.execute(`SELECT * FROM user_admin WHERE username LIKE '%${username}%'`);
        if(!rows || rows.length === 0){
            return true;
        }else{
            return false;
        }
    }catch (e){
        throw e;
    }
}

const checkpassword = async (plain_password, password)=>{
    const ismatch = await bcrypt.compare(plain_password, password);
    if(ismatch){
        console.log(`info ${ismatch}`)
        return true
    }else{
        console.log(`info ${ismatch}`)
        return false
    }
}

export default{
    CreateNewUser,
    Getalluser,
    searchrole,
    login
}