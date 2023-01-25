import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm"
import {Reservation} from "./Reservation.entity";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("date")
    date: Date;

    @Column("text",{
      default: ''
    })
    description: string;

    @Column("int")
    totalAmount: number;

    @OneToOne(
        ()=>Reservation,
        reservation => reservation.invoice,
        // {cascade: true, eager: true}
      )
    reservation: Reservation;

}