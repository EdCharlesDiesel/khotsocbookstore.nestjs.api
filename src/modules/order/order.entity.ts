import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn, VersionColumn
} from "typeorm";
import { Shipment } from "../shipment/shipment.entity";
import { OrderItem } from "../order-Item/order-item.entity";
import { Payment } from "../payment/payment.entity";
import { Customer } from "../customer/customer.entity";


@Entity("Order")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  public order_id: string;

  @Column({ type: "timestamptz" })
  public order_date: Date;

  @Column({ type: "int", width: 200 })
  public total_price: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  order: Order;

  @ManyToOne(() => Shipment, (shipment) => shipment.orders)
  shipment: Shipment;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order_item_id)
  orderItems: OrderItem[];



  @ManyToOne(() => Payment, (payment) => payment.Payment_payment_id)
  Payment_payment_id: Payment;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  modified_at: Date;
  @VersionColumn()
  revision: number;

}
