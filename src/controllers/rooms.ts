import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Room} from "../entity/Room.entity";
import {handleErrors} from "./reservations";

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

const roomRepository = AppDataSource.getRepository(Room);

export const loadDefaultRooms = async(req:Request, res:Response)=>{

  const existRooms = await roomRepository.find({})

  if(existRooms.length > 0){
    return res.status(403).json({
      error: 'Las habitaciones ya fueron cargadas.'
    })
  }

  const roomsCreated:Room[] = [];

  for(let i = 0; i<defaultRooms.length; i++){
    const room = new Room();
    room.floor = defaultRooms[i].floor;
    room.number = defaultRooms[i].number;
    room.beds = defaultRooms[i].beds;
    room.description = defaultRooms[i].description;

    roomsCreated.push(room);
  }

  try {
    await roomRepository.save(roomsCreated);
    return res.status(201).json({
      ok: true,
      msg: 'Habitaciones cargadas exitosamente.'
    })
  } catch (error) {
    handleErrors(error,res);
  }
}

export const getRooms = async(req:Request, res:Response)=>{
  try {
    const rooms = await roomRepository.find({})
  
    return res.status(200).json({
      rooms
    })
  } catch (error) {
    handleErrors(error,res);
  }
}