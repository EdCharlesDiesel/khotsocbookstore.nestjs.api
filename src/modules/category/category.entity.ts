import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Category')
export class Category {
    @PrimaryGeneratedColumn("uuid")
    public category_id: string;

    @Column("varchar", { length: 200 },)
    public name?: string;
}
