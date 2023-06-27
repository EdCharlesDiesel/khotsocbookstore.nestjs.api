import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import { Order } from "../order/order.entity";
import { Payment } from "../payment/payment.entity";
import { Cart } from "../cart/cart.entity";
import { Wishlist } from "../wishList/wishlist.entity";
import { Country } from "../country/country.entity";
import { Representative } from "../representative/representative.entity";
@Entity('Customer')
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    public customer_id: string;

    @Column("varchar", { length: 200 },)
    public first_name: string;

    @Column("varchar", { length: 200 },)
    public last_name: string;

    @Column("varchar", { length: 200 })
    public emailAddress: string;    

    @Column("varchar", { length: 200 })
    public address: string;

    @Column({ type: "int", width: 200 })
    public phone_number: number;

    @Column("varchar", { length: 200 },)
    public company?: string;

    @Column("varchar")
    date?: string;

    @Column("varchar", { length: 200 },)
    status?: string;

    @Column("int")
    activity?: number;

    @Column("boolean")
    public verified?: boolean;

    @Column("int")
    public balance?: number;

    @OneToMany(() => Order, (order) => order.order_id)
    orders: Order[]

    @OneToMany(() => Payment, (payment) => payment.payment_id)
    payments: Payment[]

    @OneToMany(() => Cart, (cart) => cart.cart_id)
    carts: Cart[]

    @OneToMany(() => Wishlist, (wishlist) => wishlist.wishlist_id)
    wishlists: Wishlist[]

    @OneToOne(() => Country,country =>country.country_id)
    @JoinColumn()
    country?: Country;

    @OneToOne(() => Representative, representative => representative.representative_id)
    @JoinColumn()
    representative?: Representative;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    modified_at: Date;

    @VersionColumn()
    revision: number;
}
