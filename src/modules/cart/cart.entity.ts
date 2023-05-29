import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity('Cart')
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    public cart_id: string;

    @Column({ type: "int", width: 200 , nullable: true})
    public quantity: number;

}
