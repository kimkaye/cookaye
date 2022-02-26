import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index.js'
import db from './config/Database.js';

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log('Database Connected...');
} catch (e) {
  console.log(e);
}

app.use(cors({ credentials: true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
// app.use("*", async (req, res)=> {
//   console.log(req.path)
// });

app.listen(process.env.PORT, ()=> {
  console.log(`server running at port ${process.env.PORT}`)
})
