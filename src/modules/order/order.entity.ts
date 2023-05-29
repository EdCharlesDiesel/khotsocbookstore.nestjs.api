import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Shipment } from "../shipment/shipment.entity";
import { OrderItem } from "../order-Item/order-item.entity";


@Entity('Order')
export class Order {
    @PrimaryGeneratedColumn("uuid")
    public order_id: string;

    @Column({ type: 'timestamptz'})
    public order_date : Date;

    @Column({ type: "int", width: 200 })
    public total_price: number;

    @ManyToOne(() => Shipment, (shipment) => shipment.orders)
    Shipment_shipment_id: Shipment;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.Order_id )
    orderItems: OrderItem[]

}
