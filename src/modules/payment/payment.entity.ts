import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";


@Entity('Payment')
export class Payment {
    @PrimaryGeneratedColumn("uuid")
    public payment_id: string;

    @Column("varchar", { length: 200 },)
    public payment_method: string;

    @Column({ type: 'timestamptz'})
    public payment_date: Date;

    @Column({ type: "int", width: 200 })
    public amount: number;




}
