import {Request, Response} from "express";
import {v4 as uuidv4, validate} from 'uuid';

import {AppDataSource} from "../data-source";
import {Invoice} from "../entity/Invoice.entity";
import {Reservation} from "../entity/Reservation.entity";
import {Room} from "../entity/Room.entity";
import {ReservationReq} from "../types/CreateReservation";
import {PayRequest} from "../types/PayReservation";
import {StatusReservation} from "../types/StatusReservation";

// Create required repositories 
const reservationRepository = AppDataSource.getRepository(Reservation);
const roomRepository = AppDataSource.getRepository(Room);


export const createReservation = async(req:ReservationReq,res:Response)=>{
  // Get fields from body req
  const {checkin,checkout,clientEmail,clientName,methodPayment,roomId, amountPaid, invoiceDescription,totalAmount} = req.body;

  try{
    // Get room by id
    const currentRoom = await roomRepository.findOneBy({id:roomId})

    // Validates if room exists
    if(!currentRoom){
      return res.status(400).json({
        error: `No existe habitacion con el id: ${roomId}`
      })
    }

    // Validates that a price higher than the total price of the reservation is not paid.
    if(amountPaid && amountPaid > totalAmount){
      return res.status(400).json({
        error: 'El monto pagado no puede ser mayor al monto total de la reserva.'
      })
    }

    // Create data for the reservation invoice
    const invoice = new Invoice();
    invoice.date = new Date();
    invoice.description = invoiceDescription;
    invoice.totalAmount = totalAmount;

    // Create data for the reservation
    const reservation = new Reservation();
    reservation.checkin = new Date(checkin);
    reservation.checkout = new Date(checkout);
    reservation.clientEmail = clientEmail;
    reservation.clientName = clientName;
    reservation.methodPayment = methodPayment;
    reservation.amountPaid = amountPaid || 0;
    reservation.status = (!amountPaid || amountPaid < totalAmount) ? StatusReservation.PENDIENTE : StatusReservation.PAGADO
    reservation.room = currentRoom;
    reservation.invoice = invoice;

    // Save reservation on DB 
    await reservationRepository.save(reservation);

    // Return the saved reservation to the client
    return res.status(201).json({
      reservation
    })
  } catch(error:any){
    handleErrors(error,res);
  }
}

export const getAllReservations = async(req:ReservationReq,res:Response)=>{
  // Get querys from request if exists
  const {page=1,limit=10} = req.query;

  try {
    // Find all reservations by pagination
    const [reservations, totalReservations] = await reservationRepository.findAndCount({
      take:+limit,
      skip: (+page * +limit) - (+limit)
    });
  
    // Return all reservations found to the client
    return res.status(200).json({
      totalReservations,
      page,
      limit,
      reservations,
    })
  } catch (error) {
    handleErrors(error,res);
  }
}

export const getReservationById = async(req:ReservationReq,res:Response)=>{
  // Get if from de request params (url)
  const {id} = req.params;
  console.log(id);
  
  
  try {
      const reservation = await reservationRepository.findOneBy({id});
  
      console.log(reservation);
      
    // Validate if reservation exists
    if(!reservation){
      return res.status(404).json({
        error: `No existe reserva con el id: ${id}`
      })
    }

    // Return reservation found to the client
    return res.status(200).json({
      reservation
    })
  } catch (error) {
    handleErrors(error,res);
  }
}

export const payReservation = async(req:PayRequest,res:Response)=>{
  // Get if from de request params (url)
  const {id} = req.params;
  // Get amount to pay from request body
  const {amountPaid} = req.body;

  try {
    // Find reservation by id
    const reservation = await reservationRepository.findOneBy({id});
  
    // Validate if reservation exists
    if(!reservation){
      return res.status(404).json({
        error: `No existe reserva con el id: ${id}`
      })
    }

    // Validates that a price higher than the total price of the reservation is not paid.
    if(amountPaid > reservation.invoice.totalAmount - reservation.amountPaid){
      return res.status(400).json({
        error: 'El monto pagado no puede ser mayor al monto restante a pagar.'
      })
    }

    // Add current amount to pay to amount existing
    reservation.amountPaid += amountPaid;

    // If total amount of the reservation is paid change the reservation status to "PAGADO"
    if(reservation.amountPaid === reservation.invoice.totalAmount){
      reservation.status = StatusReservation.PAGADO;
    }

    // Save the updated reservation on DB
    await reservationRepository.save(reservation);

    // Return the updated reservation to the client
    return res.status(200).json({
      reservation
    });

  } catch (error) {
    handleErrors(error, res)
  }
}

export const deleteReservation = async(req:Request,res:Response)=>{
  // Get if from de request params (url)
  const {id} = req.params;

  try {
    // Find reservation by id
    const reservation = await reservationRepository.findOneBy({id});
  
    // Validate if reservation exists
    if(!reservation){
      return res.status(404).json({
        error: `No existe reserva con el id: ${id}`
      })
    }

    // Change the reservation status to "ELIMINADO"
    reservation.status = StatusReservation.ELIMINADO;

    // Save the updated reservation on DB
    await reservationRepository.save(reservation);

    // Return the updated reservation to the client
    return res.status(200).json({
      msg: 'Reserva eliminada exitosamente',
      reservation,
    })
  } catch (error) {
    handleErrors(error,res);
  }
}

export const handleErrors = (error:any, res:Response)=>{
  // Show error in console
  console.log(error);

  // Return a custom message error to the client
  return res.status(500).json({
    msg: 'Ha ocurrido un error, comuniquese con el administrador.'
  })
}