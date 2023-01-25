import {Request} from "express";

// Typed for the body request when create reservation
export interface CreateReservation {
  roomId: string;
  checkin: Date;
  checkout: Date;
  amountPaid?: number;
  methodPayment: string;
  clientName: string;
  clientEmail: string;
  invoiceDescription: string;
  totalAmount: number;
}

export interface ReservationReq extends Request{
  body: CreateReservation
}