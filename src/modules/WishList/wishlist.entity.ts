import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shipment } from "../shipment/shipment.entity";
import { Customer } from "../customer/customer.entity";

@Entity('Wishlist')
export class Wishlist {
    @PrimaryGeneratedColumn("uuid")
    public wishlist_id: string;

    @ManyToOne(() => Wishlist, (wishlist) => wishlist.Product_product_id)
    Product_product_id: Shipment;

    @ManyToOne(() => Customer, (customer) => customer.customer_id)
    Customer_customer_id: Customer;

}
