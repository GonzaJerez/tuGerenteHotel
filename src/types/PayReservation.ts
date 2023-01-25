import {Request} from "express";

export interface PayReservation {
  amountPaid: number;
}

export interface PayRequest extends Request{
  body: PayReservation;
}