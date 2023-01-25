import {Request} from "express";

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