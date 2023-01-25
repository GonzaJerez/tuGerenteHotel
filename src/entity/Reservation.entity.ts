import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from "typeorm"
import {StatusReservation} from "../types/StatusReservation";
import {Invoice} from "./Invoice.entity";
import {Room} from "./Room.entity";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("date")
    checkin: Date;

    @Column("date")
    checkout: Date;

    @Column("float",{
      default: 0
    })
    amountPaid: number;

    @Column("text")
    methodPayment: string;

    @Column("text")
    clientName: string;

    @Column("text")
    clientEmail: string;

    @Column("text",{
      default: StatusReservation.PENDIENTE
    })
    status: string;

    @OneToOne(
      ()=>Invoice,
      invoice => invoice.reservation,
      {cascade: true, eager: true}
    )
    @JoinColumn()
    invoice: Invoice;

    @ManyToOne(
      ()=>Room,
      room => room.reservation,
      {eager: true}
    )
    room: Room;

}