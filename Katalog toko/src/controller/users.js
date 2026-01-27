import usermodel from "../model/users.js"

const getalluser = async (req, res)=>{
    try{
        const row  = await  usermodel.searchrole('user')
        res.json({
            message :"Success get role",
            data: row,
        })
    }catch (e){
        res.status(400).json({
            message:e.message,
        })
    }
}

export default {
    getalluser,
}