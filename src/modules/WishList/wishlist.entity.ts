import {  Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity('Wishlist')
export class Wishlist {
    @PrimaryGeneratedColumn("uuid")
    public wishlist_id: string;

}
