import { get } from "http";
import { AuthorDecorator } from "src/shared/decorator/author.decorator";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Author } from "../author/author.entity";

@Entity('Shipment')
export class Shipment {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("varchar", { length: 200 },)
    public title: string;

    @Column({ type: 'timestamptz'})
    public publishedDate: Date;

    @Column({ type: "int", width: 200 })
    public retailPrice: number;

    @Column("varchar", { length: 200 })
    public coverFileName: string;

    @Column({ type: "int", width: 200 })
    public cost: number;

    @Column("varchar", { length: 200 })
    public userId: string;

    // @OneToOne
    // public publisher: string;

    @OneToMany(() => Author, (author) => author.bookAuthored)
    public authors: Author[]
}
