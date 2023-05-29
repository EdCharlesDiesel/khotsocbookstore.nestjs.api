import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('Author')
export class Author {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column("varchar", { length: 200 },)
    public firstName: string;
    @Column("varchar", { length: 200 },)
    public lastName: string;
}
