import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/order.entity";

@Entity('OrderItem')
export class OrderItem {

    @PrimaryGeneratedColumn("uuid")
    public order_item_id: string;

    @Column({ type: "int", width: 200 })
    public quantity: number;

    @Column({ type: "int", width: 200 })
    public price: number;

    @ManyToOne(() => Order, (order) => order.order_id)
    Order_id: Order;

}
