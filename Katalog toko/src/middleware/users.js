import jwt from 'jsonwebtoken';

const authenticationtoken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(`Token ${token}`);
    if(!token){
        res.status(401).json({"error": "No credentials sent!"})
    }else{
        jwt.verify(token, process.env.JWT_KEY_RAHASIA, (err, decoded) => {
            if(err){
                res.status(401).json({"error": "Unauthorized"})
            }
            req.decoded = decoded;
            next();
        })
    }
}

export default {
    authenticationtoken,
};