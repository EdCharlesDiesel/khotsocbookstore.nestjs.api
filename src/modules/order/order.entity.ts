import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Shipment } from "../shipment/shipment.entity";
import { OrderItem } from "../order-Item/order-item.entity";
import { Payment } from "../payment/payment.entity";


@Entity("Order")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  public order_id: string;

  @Column({ type: "timestamptz" })
  public order_date: Date;

  @Column({ type: "int", width: 200 })
  public total_price: number;

  @ManyToOne(() => Shipment, (shipment) => shipment.orders)
  Shipment_shipment_id: Shipment;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order_item_id)
  orderItems: OrderItem[];

  @ManyToOne(() => Order, (order) => order.Customer_customer_id)
  Customer_customer_id: Order;

  @ManyToOne(() => Payment, (payment) => payment.Payment_payment_id)
  Payment_payment_id: Payment;

}
