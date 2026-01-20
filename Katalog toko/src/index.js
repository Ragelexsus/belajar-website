import express from 'express';
import userRoute from './router/users.js'

const app = express();

app.use('/users', userRoute);

app.listen(4000, ()=>{
    console.log('Server started on port 4000');
})
