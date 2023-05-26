import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity('Book')
export class Book {
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

    //TODO One to many
    // public Guid PublisherId { get; set; }
}
