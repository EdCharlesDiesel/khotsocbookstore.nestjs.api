import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import { Product } from "../product/product.entity";

@Entity('Category')
export class Category {
    @PrimaryGeneratedColumn("uuid")
    public category_id: string;

    @Column("varchar", { length: 200 },)
    public name?: string;

    @OneToMany(() => Product, (product) => product.product_id )
    product: Product
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    modified_at: Date;
    @VersionColumn()
    revision: number;
}
