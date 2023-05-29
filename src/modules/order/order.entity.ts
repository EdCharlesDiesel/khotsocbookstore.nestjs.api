import { Column, Entity,  OneToMany,  PrimaryGeneratedColumn, } from "typeorm";
import { OrderItem } from "../order-Item/order-item.entity";

@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ type: 'timestamptz'})
    public orderDate : Date;

    @Column({ type: "int", width: 200 })
    public cartTotal: number;

}
