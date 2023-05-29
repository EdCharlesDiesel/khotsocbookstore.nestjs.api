import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../book/book.entity";

@Entity('Author')
export class Author {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column("varchar", { length: 200 },)
    public firstName: string;
    @Column("varchar", { length: 200 },)
    public lastName: string;
    @ManyToOne(() => Book, (book) => book.authors)
    bookAuthored: string;


}
