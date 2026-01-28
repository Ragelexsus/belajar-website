import usermodel from "../model/users.js"

const getalluser = async (req, res)=>{
    try{
        const row  = await  usermodel.Getalluser();
        res.json({
            message :"Success get role",
            data: row,
        });
    }catch (e){
        res.status(400).json({
            message:e.message,
        })
    }
}

const CreateUser = async (req, res)=>{
    const {username, password, nama_role} = req.body
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

export default {
    getalluser,
    CreateUser,
}