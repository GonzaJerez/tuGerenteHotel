import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Room} from "../entity/Room.entity";
import {handleErrors} from "./reservations";

// Default rooms existing in the hotel
const defaultRooms = [
  {
    floor: 1,
    number:1,
    beds: 1,
    description: 'Habitación simple',
  },
  {
    floor: 1,
    number:2,
    beds: 1,
    description: 'Habitación simple',
  },
  {
    floor: 1,
    number:3,
    beds: 2,
    description: 'Habitación doble',
  },
  {
    floor: 2,
    number:1,
    beds: 2,
    description: 'Habitación doble',
  },
  {
    floor: 2,
    number:2,
    beds: 3,
    description: 'Habitación grande',
  },
  {
    floor: 3,
    number:1,
    beds: 4,
    description: 'Suite',
  },
]

// Create required repositories 
const roomRepository = AppDataSource.getRepository(Room);

export const loadDefaultRooms = async(_req:Request, res:Response)=>{

  // Search for existing rooms
  const existRooms = await roomRepository.find({})

  // if any room already exists it does not allow to add default rooms
  if(existRooms.length > 0){
    return res.status(403).json({
      error: 'Las habitaciones ya fueron cargadas.'
    })
  }

  // Array to save all Room instances
  const roomsCreated:Room[] = [];

  // Create a Room instance for every room in "defaultRooms" and add to "roomsCreated"
  for(let i = 0; i<defaultRooms.length; i++){
    const room = new Room();
    room.floor = defaultRooms[i].floor;
    room.number = defaultRooms[i].number;
    room.beds = defaultRooms[i].beds;
    room.description = defaultRooms[i].description;

    roomsCreated.push(room);
  }

  try {
    // Save all rooms on DB
    await roomRepository.save(roomsCreated);
    
    // Return a custom message to the client
    return res.status(201).json({
      ok: true,
      msg: 'Habitaciones cargadas exitosamente.'
    })
  } catch (error) {
    handleErrors(error,res);
  }
}

export const getRooms = async(_req:Request, res:Response)=>{
  try {
    // Find all rooms in DB
    const rooms = await roomRepository.find({})
  
    // Return the rooms found to the client
    return res.status(200).json({
      rooms
    })
  } catch (error) {
      handleErrors(error,res);
  }
}