import {Request} from "express";

// Type for the body request when someone pay reservation
export interface PayReservation {
  amountPaid: number;
}

export interface PayRequest extends Request{
  body: PayReservation;
}