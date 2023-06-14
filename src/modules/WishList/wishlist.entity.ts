import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Customer } from "../customer/customer.entity";
import { Product } from "../product/product.entity";

@Entity('Wishlist')
export class Wishlist {
    @PrimaryGeneratedColumn("uuid")
    public wishlist_id: string;

    @ManyToOne(() => Product, (product) => product.product_id)
    Product_product_id: Product;

    @ManyToOne(() => Customer, (customer) => customer.customer_id)
    Customer_customer_id: Customer;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    modified_at: Date;
    @VersionColumn()
    revision: number;

}
