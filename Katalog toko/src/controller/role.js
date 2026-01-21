import rolemodel from "../model/role.js"

const get_role = async (req, res) => {
    try{
        const {rows, field} = await rolemodel.getallRole();
        res.json({
            method :200,
            message:"Get all role successfully",
            Data: rows,
        });
    }catch(err){
        res.status(500).send({
            message:"err.message",
            method: 'get'

        });
    }
}

const create_role = async (req,res)=>{
    try{
        const {nama_role} = req.body;
        if(!nama_role){
            res.status(401).json({
                message:"nama_role no existe",
            })
        }else {
            const result= await rolemodel.CreateRole(nama_role);
            res.status(201).json({
                status:"success",
                result:result,
                message:"Successfully created role"
            })
        }

    }catch (err){
        res.status(401).json({
            error:err.message,
            message: `Error creating role ${err}`

        });
    }
}

export default {
    create_role,
    get_role
}