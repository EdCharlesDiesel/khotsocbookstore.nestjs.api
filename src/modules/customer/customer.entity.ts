import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";
@Entity('Customer')
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    public customer_id: string;

    @Column("varchar", { length: 200 },)
    public first_name: string;

    @Column("varchar", { length: 200 },)
    public last_name: string;

    @Column("varchar", { length: 200 })
    public email: string;

    @Column({ type: "int", width: 200 })
    public password: string;

    @Column("varchar", { length: 200 })
    public address: string;
    @Column({ type: "int", width: 200 })
    public phone_number: number;

}
