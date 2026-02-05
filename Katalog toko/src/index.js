import express from 'express';
import userRoute from './router/users.js'
import roleRoute from './router/role.js'
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api/auth', userRoute);
app.use('/role', roleRoute);

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})
