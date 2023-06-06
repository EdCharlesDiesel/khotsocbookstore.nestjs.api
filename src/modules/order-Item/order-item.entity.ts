import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import { Order } from "../order/order.entity";
import { Product } from "../product/product.entity";

@Entity('OrderItem')
export class OrderItem {

    @PrimaryGeneratedColumn("uuid")
    public order_item_id: string;

    @Column({ type: "int", width: 200 })
    public quantity: number;

    @Column({ type: "int", width: 200 })
    public price: number;

    @ManyToOne(() => Order, (order) => order.order_id)
    order: Order;

    @ManyToOne(() => Product, (product) => product.product_id)
    product: Product;

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    modified_at: Date;
    @VersionColumn()
    revision: number;

}
