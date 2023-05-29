import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('OrderItem')
export class OrderItem {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ type: "int", width: 200 })
    public quantity: number;

    @Column({ type: "int", width: 200 })
    public price: number;

}
