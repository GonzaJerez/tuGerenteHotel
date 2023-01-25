import {Request, Response} from "express";

import {AppDataSource} from "../data-source";
import {Invoice} from "../entity/Invoice";
import {Reservation} from "../entity/Reservation";
import {Room} from "../entity/Room";
import {ReservationReq} from "../types/CreateReservation";
import {PayRequest} from "../types/PayReservation";
import {StatusReservation} from "../types/StatusReservation";


const roomRepository = AppDataSource.getRepository(Room);
const reservationRepository = AppDataSource.getRepository(Reservation);

export const createReservation = async(req:ReservationReq,res:Response)=>{
  const {checkin,checkout,clientEmail,clientName,methodPayment,roomId, amountPaid, invoiceDescription,totalAmount} = req.body;

  try{
    const currentRoom = await roomRepository.findOneBy({id:roomId})

    if(!currentRoom){
      return res.status(400).json({
        error: `No existe habitacion con el id: ${roomId}`
      })
    }

    if(amountPaid && amountPaid > totalAmount){
      return res.status(400).json({
        error: 'El monto pagado no puede ser mayor al monto total de la reserva.'
      })
    }

    const invoice = new Invoice();
    invoice.date = new Date();
    invoice.description = invoiceDescription;
    invoice.totalAmount = totalAmount;


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


    await reservationRepository.save(reservation);
    return res.status(201).json({
      reservation
    })
  } catch(error:any){
    handleErrors(error,res);
  }
}

export const getAllReservations = async(req:ReservationReq,res:Response)=>{
  const {page=1,limit=10} = req.query;

  try {
    const [reservations, totalReservations] = await reservationRepository.findAndCount({
      take:+limit,
      skip: (+page * +limit) - (+limit)
    });
  
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
  const {id} = req.params;

  try {
    const reservation = await reservationRepository.findOneBy({id});
  
    if(!reservation){
      return res.status(404).json({
        error: `No existe reserva con el id: ${id}`
      })
    }

    return res.status(200).json({
      reservation
    })
  } catch (error) {
    handleErrors(error,res);
  }
}

export const payReservation = async(req:PayRequest,res:Response)=>{
  const {id} = req.params;
  const {amountPaid} = req.body;

  try {
    const reservation = await reservationRepository.findOneBy({id});
  
    if(!reservation){
      return res.status(404).json({
        error: `No existe reserva con el id: ${id}`
      })
    }

    if(amountPaid > reservation.invoice.totalAmount - reservation.amountPaid){
      return res.status(400).json({
        error: 'El monto pagado no puede ser mayor al monto restante a pagar.'
      })
    }

    reservation.amountPaid += amountPaid;

    if(reservation.amountPaid === reservation.invoice.totalAmount){
      reservation.status = StatusReservation.PAGADO;
    }

    await reservationRepository.save(reservation);

    return res.status(200).json({
      reservation
    });

  } catch (error) {
    handleErrors(error, res)
  }
}

export const deleteReservation = async(req:Request,res:Response)=>{
  const {id} = req.params;
  try {
    const reservation = await reservationRepository.findOneBy({id});
  
    if(!reservation){
      return res.status(404).json({
        error: `No existe reserva con el id: ${id}`
      })
    }

    reservation.status = StatusReservation.ELIMINADO;

    await reservationRepository.save(reservation);

    return res.status(200).json({
      msg: 'Reserva eliminada exitosamente',
      reservation,
    })
  } catch (error) {
    handleErrors(error,res);
  }
}

export const handleErrors = (error:any, res:Response)=>{
  console.log(error);
  return res.status(500).json({
    msg: 'Ha ocurrido un error, comuniquese con el administrador.'
  })
}