import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../order/order.entity";
import { Product } from "../product/product.entity";

@Entity('Category')
export class Category {
    @PrimaryGeneratedColumn("uuid")
    public category_id: string;

    @Column("varchar", { length: 200 },)
    public name?: string;

    @OneToMany(() => Product, (product) => product.product_id )
    products: Product[]
}
