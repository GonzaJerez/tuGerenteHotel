import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {AppDataSource} from './data-source';

// Read environmet variables
dotenv.config();

// Create express server
const app = express();

const port = process.env.PORT;

AppDataSource.initialize()
  .then(()=>{
    console.log("Database running");
  })
  .catch((e:any)=>{
    console.log(e);
    
  })

// CORS
app.use(cors())

app.use( express.json() );

// Routes
app.use('/api/reservations', require('./routes/reservations'))

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
  
})