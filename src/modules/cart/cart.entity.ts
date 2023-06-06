import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import { Product } from "../product/product.entity";
import { Customer } from "../customer/customer.entity";

@Entity('Cart')
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    public cart_id: string;

    @Column({ type: "int", width: 200 , nullable: true})
    public quantity: number;

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
