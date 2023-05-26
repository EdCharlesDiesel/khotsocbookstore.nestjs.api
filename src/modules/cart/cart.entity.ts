import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity('Cart')
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ type: "int", width: 200 , nullable: true})
    public CartTotal: number;

    @Column("varchar", { length: 200 })
    public userId: string;

    //TODO One to many
    // public Guid PublisherId { get; set; }
}
