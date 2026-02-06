import usermodel from "../model/users.js"
import jwtToken  from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

const getalluser = async (req, res)=>{
    try{
        const row  = await  usermodel.Getalluser();
        const data_token = [req.decoded]
        res.json({
            message :"Success get role",
            data: row,
            token: data_token
        });
    }catch (e){
        res.status(400).json({
            message:e.message,
        })
    }
}

const CreateUser = async (req, res)=>{
    const {username, password, nama_role} = req.body;
    try {
        if(!username || !password || !nama_role){
            throw "Username or Password is required";
        }
            const result = await usermodel.CreateNewUser(username, password, nama_role);
        if (!result || result.affectedRows === 0) {
            return res.status(400).json({
                message: "Failed to create user"
            });
        }else{
            res.status(201).json({
                message:"Success create User",
                data: result,
            })
        }
    }catch (e){
        console.log(`error: ${e}`);
        res.status(401).json({
            error: `${e.message}`,
            message : "Error Create User"
        })
    }
}

const login =async (req, res)=>{
    const {username, password}=req.body;
    try{
      const data=  await usermodel.login(username, password);
      const data_user = data[0];
      const payload = {id_user: data_user.user_id, id_role: data_user.id_role};
      const token = jwtToken.sign(payload, process.env.JWT_KEY_RAHASIA, {expiresIn: '1h'});
        res.json({
            message:"Success login",
            data: data,
            token: token,
        });
    }catch (e){
        res.status(400).json({
            message:e.message,
        });
    }
}

export default {
    getalluser,
    CreateUser,
    login
}