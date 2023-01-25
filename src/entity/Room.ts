import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import {Reservation} from "./Reservation";

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("int")
    number: number;

    @Column("int")
    floor: number;

    @Column("text")
    description: string;

    @Column("int")
    beds: number;

    @OneToMany(
        ()=>Reservation,
        reservation => reservation.room,
        // {cascade: true, eager: true}
      )
    reservation: Reservation;

}