import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import { Order } from "../order/order.entity";


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

    @OneToMany(() => Order, (order) => order.Payment_payment_id)
    Payment_payment_id: Payment;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    modified_at: Date;
    @VersionColumn()
    revision: number;





}
