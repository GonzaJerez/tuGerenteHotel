import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {AppDataSource} from './data-source';

// Read environmet variables
dotenv.config();

// Initialize express
const app = express();

// Read port from environment variables
const port = process.env.PORT;

// Initialize DB
AppDataSource.initialize()
  .then(()=>{
    console.log("Database running");
  })
  .catch((e:any)=>{
    console.log(e);
    throw new Error('No se pudo conectar con la base de datos');
  })

// CORS
app.use(cors())

// Allow handling json in requests
app.use( express.json() );

// Routes
app.use('/api/reservations', require('./routes/reservations'))
app.use('/api/rooms', require('./routes/rooms'))

// Create express server
app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
  
})
