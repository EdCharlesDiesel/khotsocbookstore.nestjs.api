import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/order.entity";
import { Payment } from "../payment/payment.entity";
import { Shipment } from "../shipment/shipment.entity";
import { Cart } from "../cart/cart.entity";
import { Wishlist } from "../wishList/wishlist.entity";
@Entity('Customer')
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    public customer_id: string;

    @Column("varchar", { length: 200 },)
    public first_name: string;

    @Column("varchar", { length: 200 },)
    public last_name: string;

    @Column("varchar", { length: 200 })
    public email: string;

    @Column({ type: "int", width: 200 })
    public password: string;

    @Column("varchar", { length: 200 })
    public address: string;
    @Column({ type: "int", width: 200 })
    public phone_number: number;

    @OneToMany(() => Order, (order) => order.order_id )
    orders: Order[]


    @OneToMany(() => Payment, (payment) => payment.payment_id )
    payments: Payment[]

    @OneToMany(() => Cart, (cart) => cart.cart_id )
    carts: Cart[]

    @OneToMany(() => Wishlist, (wishlist) => wishlist.wishlist_id )
    wishlists: Wishlist[]



}
