import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity('Product')
export class Product {
    @PrimaryGeneratedColumn("uuid")
    public product_id: string;

    @Column("varchar", { length: 200 },)
    public name: string;

    @Column("varchar", { length: 200 })
    public SKU: string;

    @Column("varchar", { length: 200 })
    public description: string;

    @Column({ type: "int", width: 200 })
    public price: number;

    @Column({ type: "int", width: 200 })
    public stock: number;
}
